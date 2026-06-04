from datetime import datetime, timezone

from schemas.analysis import (
    AnalyzeAggregate,
    AnalyzeMeta,
    AnalyzeResponse,
    AnalyzedTweet,
    SkippedBreakdown,
)
from services.apify_service import fetch_tweets
from services.cleaning_service import clean_tweet_text
from services.sentiment_service import analyze_sentiment
from services.word_cloud_service import build_word_cloud


def _tweet_url(item: dict, handle: str, tweet_id: str) -> str | None:
    url = item.get("url")
    if url:
        return str(url)
    if handle and tweet_id:
        return f"https://x.com/{handle}/status/{tweet_id}"
    return None


def _map_tweet_item(item: dict) -> dict:
    author = item.get("author") or {}
    handle = author.get("username") or "unknown"
    tweet_id = str(item.get("id", ""))
    return {
        "id": tweet_id,
        "content": item.get("text") or "",
        "author": author.get("name") or "Unknown",
        "handle": handle,
        "timestamp": item.get("createdAt") or "",
        "url": _tweet_url(item, handle, tweet_id),
        "likes": int(item.get("likeCount") or 0),
        "replies": int(item.get("replyCount") or 0),
        "retweets": int(item.get("retweetCount") or 0),
        "views": int(item.get("viewCount") or 0),
        "lang": (item.get("lang") or "").lower(),
    }


def _classify_skip(lang: str, text_clean: str) -> str | None:
    if lang and lang != "en":
        return "not_english"
    if len(text_clean) == 0:
        return "empty"
    if len(text_clean) < 3:
        return "too_short"
    return None


def run_analysis(query: str, limit: int) -> AnalyzeResponse:
    apify = fetch_tweets(query, limit)
    raw_items = apify.items
    search_terms = apify.search_terms
    skipped = SkippedBreakdown()
    tweets: list[AnalyzedTweet] = []
    compounds: list[float] = []
    clean_texts: list[str] = []

    for item in raw_items:
        mapped = _map_tweet_item(item)
        text_clean = clean_tweet_text(mapped["content"])
        skip_reason = _classify_skip(mapped["lang"], text_clean)

        if skip_reason:
            current = getattr(skipped, skip_reason)
            setattr(skipped, skip_reason, current + 1)
            continue

        compound, label = analyze_sentiment(text_clean)
        compounds.append(compound)
        clean_texts.append(text_clean)
        tweets.append(
            AnalyzedTweet(
                id=mapped["id"],
                content=mapped["content"],
                author=mapped["author"],
                handle=mapped["handle"],
                timestamp=mapped["timestamp"],
                url=mapped["url"],
                likes=mapped["likes"],
                replies=mapped["replies"],
                retweets=mapped["retweets"],
                views=mapped["views"],
                sentiment=label,
                sentiment_score=compound,
            )
        )

    positive_count = sum(1 for t in tweets if t.sentiment == "positive")
    negative_count = sum(1 for t in tweets if t.sentiment == "negative")
    neutral_count = sum(1 for t in tweets if t.sentiment == "neutral")
    avg_compound = sum(compounds) / len(compounds) if compounds else 0.0

    return AnalyzeResponse(
        meta=AnalyzeMeta(
            query=query.strip(),
            search_terms=search_terms,
            limit=limit,
            duration_ms=0,
            fetched_at=datetime.now(timezone.utc),
            analyzed_count=len(tweets),
            skipped=skipped,
            apify_status=apify.status,
            apify_status_message=apify.status_message,
            apify_dataset_count=apify.dataset_count,
        ),
        aggregate=AnalyzeAggregate(
            positive_count=positive_count,
            negative_count=negative_count,
            neutral_count=neutral_count,
            avg_compound=round(avg_compound, 4),
        ),
        word_cloud=build_word_cloud(clean_texts),
        tweets=tweets,
    )

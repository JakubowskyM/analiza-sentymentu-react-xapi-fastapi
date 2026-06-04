from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=200)
    limit: int = Field(default=1000, ge=1, le=1000)


class SkippedBreakdown(BaseModel):
    too_short: int = 0
    not_english: int = 0
    empty: int = 0


class AnalyzeMeta(BaseModel):
    query: str
    search_terms: str
    limit: int
    duration_ms: int
    fetched_at: datetime
    analyzed_count: int
    skipped: SkippedBreakdown
    apify_status: str
    apify_status_message: str | None = None
    apify_dataset_count: int = 0


class AnalyzeAggregate(BaseModel):
    positive_count: int
    negative_count: int
    neutral_count: int
    avg_compound: float


class WordCloudItem(BaseModel):
    text: str
    weight: float


class AnalyzedTweet(BaseModel):
    id: str
    content: str
    author: str
    handle: str
    timestamp: str
    url: str | None = None
    likes: int
    replies: int
    retweets: int
    views: int
    sentiment: Literal["positive", "negative", "neutral"]
    sentiment_score: float


class AnalyzeResponse(BaseModel):
    meta: AnalyzeMeta
    aggregate: AnalyzeAggregate
    word_cloud: list[WordCloudItem]
    tweets: list[AnalyzedTweet]


class ErrorResponse(BaseModel):
    error: str
    code: str

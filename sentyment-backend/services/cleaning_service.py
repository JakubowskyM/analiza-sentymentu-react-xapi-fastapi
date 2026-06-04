import re

URL_PATTERN = re.compile(
    r"https?://\S+|t\.co/\S+",
    re.IGNORECASE,
)
LEADING_MENTIONS_PATTERN = re.compile(r"^(@\w+\s*)+")
HASHTAG_PATTERN = re.compile(r"#(\w+)")


def clean_tweet_text(text: str) -> str:
    """Minimal cleaning profile for VADER on English tweets."""
    cleaned = URL_PATTERN.sub("", text)
    cleaned = LEADING_MENTIONS_PATTERN.sub("", cleaned)
    cleaned = HASHTAG_PATTERN.sub(r"\1", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned

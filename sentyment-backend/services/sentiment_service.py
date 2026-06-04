from typing import Literal

from nltk.sentiment.vader import SentimentIntensityAnalyzer

_analyzer: SentimentIntensityAnalyzer | None = None

POS_THRESHOLD = 0.05
NEG_THRESHOLD = -0.05


def _get_analyzer() -> SentimentIntensityAnalyzer:
    global _analyzer
    if _analyzer is None:
        import nltk

        nltk.download("vader_lexicon", quiet=True)
        _analyzer = SentimentIntensityAnalyzer()
    return _analyzer


def analyze_sentiment(text: str) -> tuple[float, Literal["positive", "negative", "neutral"]]:
    scores = _get_analyzer().polarity_scores(text)
    compound = scores["compound"]

    if compound >= POS_THRESHOLD:
        label: Literal["positive", "negative", "neutral"] = "positive"
    elif compound <= NEG_THRESHOLD:
        label = "negative"
    else:
        label = "neutral"

    return compound, label

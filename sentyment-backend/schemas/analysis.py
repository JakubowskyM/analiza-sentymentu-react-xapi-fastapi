from pydantic import BaseModel
from typing import Optional

class TweetSentiment(BaseModel):
    text: str
    sentiment: float
    label: str  # positive / neutral / negative
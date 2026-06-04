import re
from collections import Counter

from schemas.analysis import WordCloudItem

STOPWORDS = frozenset(
    """
    a an the and or but in on at to for of is are was were be been being
    it its this that these those i you he she we they me my your his her
    our their from with as by not no yes so if about into over after before
    up out off all any can will just than then too very also via rt
    """.split()
)


def build_word_cloud(texts: list[str], top_n: int = 40) -> list[WordCloudItem]:
    counter: Counter[str] = Counter()
    for text in texts:
        for word in re.findall(r"[a-zA-Z]{3,}", text.lower()):
            if word not in STOPWORDS:
                counter[word] += 1

    max_weight = counter.most_common(1)[0][1] if counter else 1
    items = []
    for word, count in counter.most_common(top_n):
        items.append(
            WordCloudItem(
                text=word,
                weight=round(count / max_weight, 4),
            )
        )
    return items

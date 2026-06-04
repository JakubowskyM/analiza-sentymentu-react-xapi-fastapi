import os
from dataclasses import dataclass

from apify_client import ApifyClient
from dotenv import load_dotenv

load_dotenv()

ACTOR_ID = "xquik/x-tweet-scraper"
APIFY_FILTERS = "lang:en -is:retweet -is:reply -is:quote"

# Run zakończony z danymi w dataset — używamy częściowych wyników.
USABLE_RUN_STATUSES = frozenset({"SUCCEEDED", "ABORTED", "TIMED-OUT"})


class ApifyNotConfiguredError(Exception):
    pass


class ApifyRunError(Exception):
    pass


@dataclass
class ApifyFetchResult:
    items: list[dict]
    search_terms: str
    status: str
    status_message: str | None
    dataset_count: int


def get_apify_token() -> str:
    token = os.environ.get("APIFY_TOKEN", "").strip()
    if not token:
        raise ApifyNotConfiguredError("APIFY_TOKEN is not set")
    return token


def build_search_terms(query: str) -> str:
    query = query.strip()
    term = f'"{query}"' if " " in query else query
    return f"{term} {APIFY_FILTERS}"


def fetch_tweets(query: str, limit: int) -> ApifyFetchResult:
    search_terms = build_search_terms(query)
    client = ApifyClient(get_apify_token())

    run_input = {
        "searchTerms": [search_terms],
        "maxItems": limit,
        "queryType": "Latest",
    }

    try:
        # max_items = "Maximum charged results" w Run Options (pay-per-result).
        run = client.actor(ACTOR_ID).call(run_input=run_input, max_items=limit)
    except Exception as exc:
        message = str(exc)
        if "Maximum charged results must be greater than zero" in message:
            raise ApifyRunError(
                "Apify odrzuciło start runu: limit płatnych wyników = 0. "
                "Sprawdź saldo / Usage & billing na koncie Apify albo ustaw limit >= 1. "
                f"(Wysłany limit: {limit})"
            ) from exc
        raise ApifyRunError(message) from exc

    if run is None:
        raise ApifyRunError("Apify run returned no result")

    status = str(run.status)
    status_message = run.status_message

    if status not in USABLE_RUN_STATUSES:
        raise ApifyRunError(
            f"Apify run ended with status {status}"
            + (f": {status_message}" if status_message else "")
        )

    dataset_id = run.default_dataset_id
    items = list(client.dataset(dataset_id).iterate_items())

    return ApifyFetchResult(
        items=items,
        search_terms=search_terms,
        status=status,
        status_message=status_message,
        dataset_count=len(items),
    )

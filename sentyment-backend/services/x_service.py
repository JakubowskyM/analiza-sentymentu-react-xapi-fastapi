from apify_client import ApifyClient
from dotenv import load_dotenv

import os

load_dotenv()

TOKEN = "...."

client = ApifyClient(TOKEN)

run_input = {
    "searchTerms": ["Tesla lang:en -is:retweet -is:reply -is:quote"],
    "maxItems": 10,
    "queryType": "Latest"
}

run = client.actor("xquik/x-tweet-scraper").call(run_input=run_input)

print("Run zakończony")

dataset_id = run.default_dataset_id

items = list(client.dataset(dataset_id).iterate_items())

print(f"Pobrano {len(items)} tweetów")

for tweet in items:
    print("-" * 50)
    print(tweet)
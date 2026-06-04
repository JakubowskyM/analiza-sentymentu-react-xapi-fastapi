import { PAGE_SIZE } from "../constants";
import type { AnalyzedTweet } from "../api/sentiment";
import SentimentCard from "./SentimentCard";

interface TweetListProps {
  tweets: AnalyzedTweet[];
  visibleCount: number;
  onLoadMore: () => void;
}

export default function TweetList({
  tweets,
  visibleCount,
  onLoadMore,
}: TweetListProps) {
  const visible = tweets.slice(0, visibleCount);
  const remaining = tweets.length - visibleCount;

  if (tweets.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 text-sm">
        Brak tweetów dla wybranego filtra.
      </div>
    );
  }

  return (
    <>
      {visible.map((tweet) => (
        <SentimentCard
          key={tweet.id}
          author={tweet.author}
          handle={tweet.handle}
          content={tweet.content}
          timestamp={tweet.timestamp}
          url={tweet.url}
          sentiment={tweet.sentiment}
          sentimentScore={tweet.sentiment_score}
          likes={tweet.likes}
          replies={tweet.replies}
          retweets={tweet.retweets}
          views={tweet.views}
        />
      ))}

      {remaining > 0 && (
        <div className="p-6 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Załaduj kolejne {PAGE_SIZE} ({remaining} pozostało)
          </button>
        </div>
      )}
    </>
  );
}

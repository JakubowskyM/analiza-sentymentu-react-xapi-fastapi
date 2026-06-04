import { useMemo, useState } from "react";
import type { AnalyzeResponse, SentimentFilter } from "../api/sentiment";
import { PAGE_SIZE } from "../constants";
import Section from "./Section";
import ResultsSummary from "./ResultsSummary";
import WordCloudSection from "./WordCloudSection";
import SentimentFilters from "./SentimentFilters";
import TweetList from "./TweetList";

interface AnalysisResultsProps {
  results: AnalyzeResponse;
}

export default function AnalysisResults({ results }: AnalysisResultsProps) {
  const [filter, setFilter] = useState<SentimentFilter>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const counts = useMemo(
    () => ({
      all: results.tweets.length,
      positive: results.tweets.filter((t) => t.sentiment === "positive").length,
      neutral: results.tweets.filter((t) => t.sentiment === "neutral").length,
      negative: results.tweets.filter((t) => t.sentiment === "negative").length,
    }),
    [results.tweets]
  );

  const filteredTweets = useMemo(() => {
    if (filter === "all") return results.tweets;
    return results.tweets.filter((t) => t.sentiment === filter);
  }, [results.tweets, filter]);

  const handleFilterChange = (next: SentimentFilter) => {
    setFilter(next);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <Section title="Podsumowanie">
        <ResultsSummary meta={results.meta} aggregate={results.aggregate} />
      </Section>

      <Section title="Chmura słów">
        <WordCloudSection items={results.word_cloud ?? []} />
      </Section>

      <Section title="Tweety">
        {results.tweets.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Brak tweetów do wyświetlenia po filtrach i analizie.
          </div>
        ) : (
          <>
            <SentimentFilters
              value={filter}
              counts={counts}
              onChange={handleFilterChange}
            />
            <TweetList
              tweets={filteredTweets}
              visibleCount={visibleCount}
              onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
            />
          </>
        )}
      </Section>
    </>
  );
}

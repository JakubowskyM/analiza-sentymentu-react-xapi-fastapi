import { TWEET_FETCH_LIMIT } from "../constants";
import { getFriendlyError } from "../utils/errorMessages";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export type SentimentLabel = "positive" | "negative" | "neutral";
export type SentimentFilter = "all" | SentimentLabel;

export interface SkippedBreakdown {
  too_short: number;
  not_english: number;
  empty: number;
}

export interface AnalyzeMeta {
  query: string;
  search_terms: string;
  limit: number;
  duration_ms: number;
  fetched_at: string;
  analyzed_count: number;
  skipped: SkippedBreakdown;
  apify_status: string;
  apify_status_message?: string | null;
  apify_dataset_count: number;
}

export interface AnalyzeAggregate {
  positive_count: number;
  negative_count: number;
  neutral_count: number;
  avg_compound: number;
}

export interface WordCloudItem {
  text: string;
  weight: number;
}

export interface AnalyzedTweet {
  id: string;
  content: string;
  author: string;
  handle: string;
  timestamp: string;
  url?: string | null;
  likes: number;
  replies: number;
  retweets: number;
  views: number;
  sentiment: SentimentLabel;
  sentiment_score: number;
}

export interface AnalyzeResponse {
  meta: AnalyzeMeta;
  aggregate: AnalyzeAggregate;
  word_cloud: WordCloudItem[];
  tweets: AnalyzedTweet[];
}

export class ApiRequestError extends Error {
  code: string;
  technical: string;

  constructor(message: string, code: string, technical: string) {
    super(message);
    this.name = "ApiRequestError";
    this.code = code;
    this.technical = technical;
  }
}

export async function analyzeSentiment(query: string): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE}/sentiment/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, limit: TWEET_FETCH_LIMIT }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const detail = body.detail ?? body;
    const technical =
      typeof detail === "object" && detail.error
        ? detail.error
        : `Request failed (${response.status})`;
    const code =
      typeof detail === "object" && detail.code ? detail.code : "UNKNOWN";
    throw new ApiRequestError(getFriendlyError(code, technical), code, technical);
  }

  return response.json();
}

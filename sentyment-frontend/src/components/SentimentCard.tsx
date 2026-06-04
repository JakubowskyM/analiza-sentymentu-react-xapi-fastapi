import { Heart, MessageCircle, Share, BarChart3, User } from "lucide-react";

interface SentimentCardProps {
  author: string;
  handle: string;
  content: string;
  timestamp: string;
  url?: string | null;
  sentiment: "positive" | "negative" | "neutral";
  sentimentScore: number;
  likes: number;
  replies: number;
  retweets: number;
  views: number;
}

function formatTimestamp(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("pl-PL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SentimentCard({
  author,
  handle,
  content,
  timestamp,
  url,
  sentiment,
  sentimentScore,
  likes,
  replies,
  retweets,
  views,
}: SentimentCardProps) {
  const sentimentColors = {
    positive: {
      badge: "bg-green-900/40 text-green-400 border border-green-700",
      bar: "bg-green-500",
      label: "Pozytywny",
      textColor: "text-green-400",
    },
    negative: {
      badge: "bg-red-900/40 text-red-400 border border-red-700",
      bar: "bg-red-500",
      label: "Negatywny",
      textColor: "text-red-400",
    },
    neutral: {
      badge: "bg-gray-700/40 text-gray-400 border border-gray-600",
      bar: "bg-gray-500",
      label: "Neutralny",
      textColor: "text-gray-400",
    },
  };

  const colors = sentimentColors[sentiment];
  const scorePercent = ((sentimentScore + 1) / 2) * 100;
  const scorePercentDisplay = Math.round(scorePercent);

  return (
    <article className="px-4 py-3 border-b border-gray-700 hover:bg-white/5 transition">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center shrink-0">
          <User size={24} className="text-gray-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white">{author}</span>
            <span className="text-gray-500">@{handle}</span>
            {timestamp && (
              <>
                <span className="text-gray-500">·</span>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-sm hover:text-blue-400 hover:underline"
                  >
                    {formatTimestamp(timestamp)}
                  </a>
                ) : (
                  <span className="text-gray-500 text-sm">
                    {formatTimestamp(timestamp)}
                  </span>
                )}
              </>
            )}
          </div>

          <p className="mt-2 text-base text-white leading-normal break-words">
            {content}
          </p>

          <div className="mt-3 bg-gray-950 rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-semibold">
                Sentyment
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.badge}`}
              >
                {colors.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${colors.bar} transition-all duration-300`}
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>
              </div>
              <span
                className={`text-sm font-bold min-w-fit ${colors.textColor}`}
              >
                {scorePercentDisplay}%
              </span>
            </div>
          </div>

          <div className="mt-3 flex gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <MessageCircle size={14} /> {replies}
            </span>
            <span className="flex items-center gap-1">
              <Share size={14} /> {retweets}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={14} /> {likes}
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 size={14} /> {views}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

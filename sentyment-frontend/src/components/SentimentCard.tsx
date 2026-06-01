import { Heart, MessageCircle, Share, BarChart3 } from "lucide-react";

interface SentimentCardProps {
  author: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
  sentimentScore: number;
  likes: number;
  replies: number;
  retweets: number;
  views: number;
}

export default function SentimentCard({
  author,
  handle,
  avatar,
  content,
  timestamp,
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
      label: "Pozytywny 🎉",
      textColor: "text-green-400",
    },
    negative: {
      badge: "bg-red-900/40 text-red-400 border border-red-700",
      bar: "bg-red-500",
      label: "Negatywny 😞",
      textColor: "text-red-400",
    },
    neutral: {
      badge: "bg-gray-700/40 text-gray-400 border border-gray-600",
      bar: "bg-gray-500",
      label: "Neutralny 😐",
      textColor: "text-gray-400",
    },
  };

  const colors = sentimentColors[sentiment];
  const scorePercent = ((sentimentScore + 1) / 2) * 100;
  const scorePercentDisplay = Math.round(scorePercent);

  return (
    <article className="px-4 py-3 border-b border-gray-700 hover:bg-white/5 transition cursor-pointer group">
      {/* Header */}
      <div className="flex gap-3">
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full object-cover bg-gray-800"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white hover:underline group-hover:underline">{author}</span>
            <span className="text-gray-500">@{handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">{timestamp}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-2 ml-15 pr-2">
        <p className="text-base text-white leading-normal break-words">{content}</p>
      </div>

      {/* Sentiment Analysis Box */}
      <div className="mt-3 ml-15 bg-gray-950 rounded-lg p-3 border border-gray-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400 font-semibold">Sentyment</span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.badge}`}>
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
          <span className={`text-sm font-bold min-w-fit ${colors.textColor}`}>
            {scorePercentDisplay}%
          </span>
        </div>
      </div>

      {/* Engagement metrics */}
      <div className="mt-3 ml-15 flex justify-between text-gray-500 max-w-md text-sm">
        <div className="flex items-center gap-2 group/metric cursor-pointer hover:text-blue-500 transition">
          <MessageCircle size={16} />
          <span className="group-hover/metric:bg-blue-500/10 px-1.5 py-0.5 rounded transition">
            {replies > 1000 ? (replies / 1000).toFixed(1) + "K" : replies}
          </span>
        </div>

        <div className="flex items-center gap-2 group/metric cursor-pointer hover:text-green-500 transition">
          <Share size={16} />
          <span className="group-hover/metric:bg-green-500/10 px-1.5 py-0.5 rounded transition">
            {retweets > 1000 ? (retweets / 1000).toFixed(1) + "K" : retweets}
          </span>
        </div>

        <div className="flex items-center gap-2 group/metric cursor-pointer hover:text-red-600 transition">
          <Heart size={16} />
          <span className="group-hover/metric:bg-red-600/10 px-1.5 py-0.5 rounded transition">
            {likes > 1000 ? (likes / 1000).toFixed(1) + "K" : likes}
          </span>
        </div>

        <div className="flex items-center gap-2 group/metric cursor-pointer hover:text-blue-500 transition">
          <BarChart3 size={16} />
          <span className="group-hover/metric:bg-blue-500/10 px-1.5 py-0.5 rounded transition">
            {views > 1000 ? (views / 1000).toFixed(1) + "K" : views}
          </span>
        </div>
      </div>
    </article>
  );
}

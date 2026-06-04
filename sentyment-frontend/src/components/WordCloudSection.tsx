import type { WordCloudItem } from "../api/sentiment";

interface WordCloudSectionProps {
  items: WordCloudItem[];
}

export default function WordCloudSection({ items }: WordCloudSectionProps) {
  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 text-sm">
        Brak słów do chmury (za mało przeanalizowanych tweetów).
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-wrap gap-3 justify-center items-center min-h-[140px]">
      {items.map((item) => {
        const size = 0.75 + item.weight * 1.75;
        return (
          <span
            key={item.text}
            className="text-blue-400 hover:text-blue-300 transition font-semibold leading-tight"
            style={{ fontSize: `${size}rem` }}
            title={`waga: ${item.weight.toFixed(2)}`}
          >
            {item.text}
          </span>
        );
      })}
    </div>
  );
}

import type { SentimentFilter } from "../api/sentiment";

interface SentimentFiltersProps {
  value: SentimentFilter;
  counts: { all: number; positive: number; neutral: number; negative: number };
  onChange: (filter: SentimentFilter) => void;
}

const FILTERS: { id: SentimentFilter; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "positive", label: "Pozytywne" },
  { id: "neutral", label: "Neutralne" },
  { id: "negative", label: "Negatywne" },
];

export default function SentimentFilters({
  value,
  counts,
  onChange,
}: SentimentFiltersProps) {
  const countFor = (id: SentimentFilter) => {
    if (id === "all") return counts.all;
    return counts[id];
  };

  return (
    <div className="px-4 py-3 flex flex-wrap gap-2 border-b border-gray-800">
      {FILTERS.map((f) => {
        const active = value === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              active
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {f.label} ({countFor(f.id)})
          </button>
        );
      })}
    </div>
  );
}

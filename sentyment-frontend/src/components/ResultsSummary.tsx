import type { AnalyzeAggregate, AnalyzeMeta } from "../api/sentiment";

interface ResultsSummaryProps {
  meta: AnalyzeMeta;
  aggregate: AnalyzeAggregate;
}

function formatSkippedMessage(meta: AnalyzeMeta): string | null {
  const { skipped } = meta;
  const total = skipped.too_short + skipped.not_english + skipped.empty;
  if (total === 0) return null;

  const parts: string[] = [];
  if (skipped.too_short > 0) {
    parts.push(`${skipped.too_short} za krótkie`);
  }
  if (skipped.empty > 0) {
    parts.push(`${skipped.empty} puste (np. sam URL)`);
  }
  if (skipped.not_english > 0) {
    parts.push(`${skipped.not_english} nie po angielsku`);
  }

  return `Pominięto ${total} tweetów: ${parts.join(", ")}.`;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec} s`;
  const min = Math.floor(sec / 60);
  const rem = sec % 60;
  return `${min} min ${rem} s`;
}

export default function ResultsSummary({ meta, aggregate }: ResultsSummaryProps) {
  const skippedMsg = formatSkippedMessage(meta);
  const total =
    aggregate.positive_count +
    aggregate.negative_count +
    aggregate.neutral_count;

  return (
    <div className="border-b border-gray-700 p-4 bg-gray-950/50 space-y-3">
      <p className="text-sm text-gray-400">
        Zapytanie: <span className="text-white">{meta.query}</span> ·
        Pobrano z Apify:{" "}
        <span className="text-white">{meta.apify_dataset_count}</span> ·
        Przeanalizowano:{" "}
        <span className="text-white">{meta.analyzed_count}</span>
        {total > 0 && (
          <>
            {" "}
            · Czas:{" "}
            <span className="text-white">{formatDuration(meta.duration_ms)}</span>
          </>
        )}
      </p>

      {meta.apify_status !== "SUCCEEDED" && (
        <p className="text-sm text-amber-400/90">
          Run Apify: {meta.apify_status}
          {meta.apify_status_message ? ` — ${meta.apify_status_message}` : ""}
          . Użyto częściowych wyników z datasetu.
        </p>
      )}

      {total > 0 && (
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-800">
            Pozytywne: {aggregate.positive_count}
          </span>
          <span className="px-3 py-1 rounded-full bg-red-900/30 text-red-400 border border-red-800">
            Negatywne: {aggregate.negative_count}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-600">
            Neutralne: {aggregate.neutral_count}
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800">
            Śr. compound: {aggregate.avg_compound.toFixed(3)}
          </span>
        </div>
      )}

      {skippedMsg && <p className="text-sm text-amber-400/90">{skippedMsg}</p>}
    </div>
  );
}

interface ErrorBannerProps {
  message: string;
  technical?: string;
}

export default function ErrorBanner({ message, technical }: ErrorBannerProps) {
  return (
    <div className="p-4 border-b border-red-900/50 bg-red-950/30 text-red-200 text-sm">
      <p className="font-semibold">{message}</p>
      {technical && (
        <details className="mt-2 text-red-300/80">
          <summary className="cursor-pointer text-xs">Szczegóły techniczne</summary>
          <p className="mt-1 text-xs break-words">{technical}</p>
        </details>
      )}
    </div>
  );
}

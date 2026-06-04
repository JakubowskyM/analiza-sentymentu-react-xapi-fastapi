export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-6 p-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-700" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
      <div className="text-center max-w-md">
        <p className="text-white text-lg font-semibold">
          Zbieramy i analizujemy tweety...
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Pobieramy do 300 angielskich tweetów — może to potrwać 1–3 minuty.
          Nie zamykaj karty.
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-2xl font-bold mb-4">O TweetSentiment</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          TweetSentiment to zaawansowane narzędzie do analizy sentymentu tweetów. 
          Pozwala na głęboką analizę nastrojów użytkowników Twitter/X wobec różnych 
          tematów, marek, produktów i wydarzeń.
        </p>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-2xl font-bold mb-4">Nasze możliwości</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-blue-500">✓</span>
            <span>Analiza emocji pozytywnych, negatywnych i neutralnych</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500">✓</span>
            <span>Wizualizacja trendów i zmian sentymentu w czasie</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500">✓</span>
            <span>Wykresy i statystyki szczegółowe</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500">✓</span>
            <span>Identyfikacja kluczowych słów i hasztagów</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500">✓</span>
            <span>Porównywanie sentymentu dla różnych tematów</span>
          </li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-2xl font-bold mb-4">Jak to działa?</h3>
        <ol className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-blue-500 font-bold">1.</span>
            <span>Wpisz temat do analizy w polu wyszukiwania</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 font-bold">2.</span>
            <span>System pobiera tweety związane z tematem</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 font-bold">3.</span>
            <span>Każdy tweet jest analizowany pod kątem sentymentu</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 font-bold">4.</span>
            <span>Wyniki są wyświetlane z wizualizacjami i statystykami</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

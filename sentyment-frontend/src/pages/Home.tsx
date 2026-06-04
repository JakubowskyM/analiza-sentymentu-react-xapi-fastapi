import { useState } from "react";
import { Menu, X } from "lucide-react";
import SearchBar from "../components/SearchBar";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorBanner from "../components/ErrorBanner";
import AnalysisResults from "../components/AnalysisResults";
import About from "./About";
import { analyzeSentiment, ApiRequestError, type AnalyzeResponse } from "../api/sentiment";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("analysis");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string; technical?: string } | null>(null);
  const [results, setResults] = useState<AnalyzeResponse | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await analyzeSentiment(query);
      setResults(data);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError({ message: err.message, technical: err.technical });
      } else {
        setError({
          message: err instanceof Error ? err.message : "Nieznany błąd",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (page: string) => {
    if (isLoading) return;
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex w-full min-h-screen bg-black text-white">
      {isLoading && <LoadingOverlay />}

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-700 flex items-center justify-between p-4">
        <div className="text-blue-400 text-lg font-bold">𝕏</div>
        <button
          type="button"
          onClick={() => !isLoading && setMobileMenuOpen(!mobileMenuOpen)}
          disabled={isLoading}
          className="text-white p-2 hover:bg-gray-900 rounded-full transition disabled:opacity-40"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && !isLoading && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/80"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {mobileMenuOpen && !isLoading && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-black border-b border-gray-700 flex flex-col">
          <button
            type="button"
            onClick={() => handleNavigation("analysis")}
            className={`w-full text-left px-6 py-4 font-semibold transition border-b border-gray-700 ${
              currentPage === "analysis"
                ? "text-blue-500 bg-gray-900/50"
                : "text-gray-300 hover:bg-gray-900/30"
            }`}
          >
            Analiza Sentymentów
          </button>
          <button
            type="button"
            onClick={() => handleNavigation("about")}
            className={`w-full text-left px-6 py-4 font-semibold transition ${
              currentPage === "about"
                ? "text-blue-500 bg-gray-900/50"
                : "text-gray-300 hover:bg-gray-900/30"
            }`}
          >
            O nas
          </button>
        </div>
      )}

      <nav className="w-64 border-r border-gray-700 p-4 overflow-y-auto flex-col sticky top-0 h-screen hidden md:flex">
        <div className="text-blue-400 text-2xl font-bold mb-8">𝕏</div>
        <div className="space-y-4 flex-1">
          <button
            type="button"
            onClick={() => handleNavigation("analysis")}
            disabled={isLoading}
            className={`w-full text-left px-4 py-3 text-xl font-semibold rounded-full transition disabled:opacity-40 ${
              currentPage === "analysis"
                ? "bg-blue-600 text-white"
                : "hover:bg-white/10 text-gray-300"
            }`}
          >
            Analiza Sentymentów
          </button>
          <button
            type="button"
            onClick={() => handleNavigation("about")}
            disabled={isLoading}
            className={`w-full text-left px-4 py-3 text-xl font-semibold rounded-full transition disabled:opacity-40 ${
              currentPage === "about"
                ? "bg-blue-600 text-white"
                : "hover:bg-white/10 text-gray-300"
            }`}
          >
            O nas
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl mx-auto w-full">
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-700 px-4 py-3 md:top-0 mt-16 md:mt-0">
          <h2 className="text-xl font-bold">
            {currentPage === "analysis" ? "Analiza Sentymentu" : "O nas"}
          </h2>
          <p className="text-gray-500 text-sm">
            {currentPage === "analysis"
              ? "Wyszukaj angielskie tweety i zobacz sentyment"
              : "Dowiedz się więcej o naszym narzędziu"}
          </p>
        </div>

        {currentPage === "analysis" ? (
          <>
            <div className="border-b border-gray-700 p-4">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {error && (
              <ErrorBanner message={error.message} technical={error.technical} />
            )}

            {results && <AnalysisResults results={results} />}

            {!isLoading && !results && !error && (
              <div className="flex items-center justify-center min-h-96">
                <p className="text-gray-400 text-lg text-center px-4">
                  Wpisz hasło i kliknij Szukaj — wyniki pojawią się tutaj.
                </p>
              </div>
            )}
          </>
        ) : (
          <About />
        )}
      </div>
    </div>
  );
}

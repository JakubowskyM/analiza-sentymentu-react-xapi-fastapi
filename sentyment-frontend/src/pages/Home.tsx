import { useState } from "react";
import { Menu, X } from "lucide-react";
import SearchBar from "../components/SearchBar";
import About from "./About";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("analysis");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex w-full min-h-screen bg-black text-white">
      {/* Burger Menu - Mobile Only */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-700 flex items-center justify-between p-4">
        <div className="text-blue-400 text-lg font-bold">𝕏</div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2 hover:bg-gray-900 rounded-full transition"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/80" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-black border-b border-gray-700 flex flex-col">
          <button
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

      {/* Sidebar - Left */}
      <nav className="w-64 border-r border-gray-700 p-4 overflow-y-auto flex flex-col sticky top-0 h-screen hidden md:flex">
        <div className="text-blue-400 text-2xl font-bold mb-8">𝕏</div>
        <div className="space-y-4 flex-1">
          <button
            onClick={() => setCurrentPage("analysis")}
            className={`w-full text-left px-4 py-3 text-xl font-semibold rounded-full transition ${
              currentPage === "analysis"
                ? "bg-blue-600 text-white"
                : "hover:bg-white/10 text-gray-300"
            }`}
          >
            Analiza Sentymentów
          </button>
          <button
            onClick={() => setCurrentPage("about")}
            className={`w-full text-left px-4 py-3 text-xl font-semibold rounded-full transition ${
              currentPage === "about"
                ? "bg-blue-600 text-white"
                : "hover:bg-white/10 text-gray-300"
            }`}
          >
            O nas
          </button>
        </div>
      </nav>

      {/* Main Feed */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
        {/* Header - with margin for mobile burger menu */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-700 px-4 py-3 md:top-0 mt-16 md:mt-0">
          <h2 className="text-xl font-bold">
            {currentPage === "analysis" ? "Analiza Sentymentu" : "O nas"}
          </h2>
          <p className="text-gray-500 text-sm">
            {currentPage === "analysis"
              ? "Twoje wyszukiwania i wyniki"
              : "Dowiedz się więcej o naszym narzędziu"}
          </p>
        </div>

        {/* Content based on current page */}
        {currentPage === "analysis" ? (
          <>
            {/* Search Section */}
            <div className="border-b border-gray-700 p-4">
              <SearchBar />
            </div>

            {/* Tweets Feed - Empty State */}
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <p className="text-gray-400 text-lg">Tu pojawia się wyniki analizy Twojego hasła</p>
              </div>
            </div>
          </>
        ) : (
          <About />
        )}
      </div>

    </div>
  );
}
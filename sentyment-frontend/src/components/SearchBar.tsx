import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 bg-gray-900/50 border border-gray-600 rounded-full px-4 py-3 flex items-center gap-3 hover:border-blue-500 focus-within:border-blue-500 transition group">
          <Search size={20} className="text-gray-500 group-focus-within:text-blue-500 transition" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj tweetów do analizy..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-base"
          />
        </div>

        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-full transition text-base"
        >
          {isLoading ? "..." : "Szukaj"}
        </button>
      </form>
    </div>
  );
}
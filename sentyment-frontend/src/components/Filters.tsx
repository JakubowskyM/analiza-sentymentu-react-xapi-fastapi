import {
  TrendingUp,
  Globe,
  BarChart3
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          Co możesz analizować?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-8 bg-white border rounded-2xl">
            <TrendingUp size={40} />

            <h3 className="text-xl font-semibold mt-4">
              Popularne trendy
            </h3>

            <p className="mt-2 text-gray-600">
              Śledź najczęściej omawiane tematy
              i wydarzenia w mediach społecznościowych.
            </p>
          </div>

          <div className="p-8 bg-white border rounded-2xl">
            <Globe size={40} />

            <h3 className="text-xl font-semibold mt-4">
              Analiza regionalna
            </h3>

            <p className="mt-2 text-gray-600">
              Porównuj nastroje użytkowników
              w różnych krajach i regionach.
            </p>
          </div>

          <div className="p-8 bg-white border rounded-2xl">
            <BarChart3 size={40} />

            <h3 className="text-xl font-semibold mt-4">
              Szczegółowe statystyki
            </h3>

            <p className="mt-2 text-gray-600">
              Otrzymuj wykresy, rozkład sentymentu
              i najważniejsze słowa kluczowe.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
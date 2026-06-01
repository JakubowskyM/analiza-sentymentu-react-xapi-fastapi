import {
  TrendingUp,
  Globe,
  BarChart3
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16 text-black">
          Co oferuje analiza sentymentów Tweetów?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-8 border rounded-2xl">
            <TrendingUp size={40} />
            <h3 className="text-xl font-semibold mt-4">
              Najgorętsze tematy
            </h3>
            <p className="mt-2 text-gray-600">
              Sprawdzaj, które tematy są aktualnie najczęściej omawiane
            </p>
          </div>

          <div className="p-8 border rounded-2xl">
            <Globe size={40} />
            <h3 className="text-xl font-semibold mt-4">
              Analiza geograficzna
            </h3>
            <p className="mt-2 text-gray-600">
              Porównuj nastroje w różnych regionach i krajach.
            </p>
          </div>

          <div className="p-8 border rounded-2xl">
            <BarChart3 size={40} />
            <h3 className="text-xl font-semibold mt-4">
              Szczegółowe metryki
            </h3>
            <p className="mt-2 text-gray-600">
              Wizualizuj pozytywne, neutralne i
              negatywne opinie.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
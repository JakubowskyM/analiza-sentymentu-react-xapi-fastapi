import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="border-b border-gray-700">
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-950/40">
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div>{children}</div>
    </section>
  );
}

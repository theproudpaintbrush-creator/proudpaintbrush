export type CostTableRow = { area: string; median: string; low?: string; high?: string; sample: string };

// Scannable cost table, structured for AI Overview extraction. Shared by
// ContentPage (opt-in `costTable` block) and any bespoke page (e.g. homepage)
// that wants the same look without going through the PageContent JSON model.
export default function CostTable({
  heading,
  intro,
  rows,
  note,
}: {
  heading: string;
  intro?: string;
  rows: CostTableRow[];
  note?: string;
}) {
  if (!rows.length) return null;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-2">{heading}</h2>
      {intro && <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">{intro}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white border border-gray-200 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#1a2e44] text-white">
              <th className="text-left p-3 font-semibold">Area</th>
              <th className="text-left p-3 font-semibold">Median Job Cost</th>
              <th className="text-left p-3 font-semibold">Low</th>
              <th className="text-left p-3 font-semibold">High</th>
              <th className="text-left p-3 font-semibold">Sample</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.area} className="border-t border-gray-200">
                <td className="p-3 font-medium text-[#1a2e44]">{row.area}</td>
                <td className="p-3">{row.median}</td>
                <td className="p-3">{row.low ?? "—"}</td>
                <td className="p-3">{row.high ?? "—"}</td>
                <td className="p-3">{row.sample}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="text-gray-600 text-sm mt-5 leading-relaxed">{note}</p>}
    </div>
  );
}

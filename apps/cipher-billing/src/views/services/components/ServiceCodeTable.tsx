type CodeRow = {
  code: string;
  label: string;
  notes: string;
};

type ServiceCodeTableProps = {
  rows: readonly CodeRow[];
};

export default function ServiceCodeTable({ rows }: ServiceCodeTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-[#F5F7FA] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <th className="px-5 py-4">Code</th>
            <th className="px-5 py-4">Description</th>
            <th className="px-5 py-4">Billing notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code} className="border-b border-slate-100 last:border-0">
              <td className="whitespace-nowrap px-5 py-4 font-mono text-sm font-semibold text-[#166C96]">
                {row.code}
              </td>
              <td className="px-5 py-4 font-medium text-[#101E3F]">{row.label}</td>
              <td className="px-5 py-4 text-slate-600">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';

interface Column {
  key: string;
  header: string;
  render?: (val: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

export function Table({ columns, data }: TableProps) {
  return (
    <div className="w-full overflow-x-auto bg-brand-neutral-white rounded-2xl border border-brand-neutral-grey/50 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-brand-neutral-warm border-b border-brand-neutral-grey/50">
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/60">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-neutral-grey/30">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-brand-neutral-beige/50 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 font-body text-sm text-brand-neutral-charcoal">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center font-body text-brand-neutral-charcoal/50">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

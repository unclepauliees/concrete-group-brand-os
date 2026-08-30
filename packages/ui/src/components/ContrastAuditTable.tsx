import { useEffect, useState } from "react";
import { contrastRatio, verdict } from "../contrast";

type Pair = { fg: string; bg: string; label: string };

const PAIRS: Pair[] = [
  { fg: "--gilt-500", bg: "--bone", label: "gilt-500 on bone" },
  { fg: "--gilt-700", bg: "--bone", label: "gilt-700 on bone" },
  { fg: "--green-500", bg: "--bone", label: "green-500 on bone" },
  { fg: "--stone-500", bg: "--bone", label: "stone-500 on bone" },
  { fg: "--bone", bg: "--ink", label: "bone on ink" },
  { fg: "--bone", bg: "--green-500", label: "bone on house green" },
];

/** Live-computed matrix — the numbers here are read from the DOM, not typed in by hand. */
export function ContrastAuditTable({ className = "" }: { className?: string }) {
  const [rows, setRows] = useState<{ label: string; ratio: number }[]>([]);

  useEffect(() => {
    setRows(PAIRS.map((p) => ({ label: p.label, ratio: contrastRatio(p.fg, p.bg) })));
  }, []);

  return (
    <table className={`w-full font-label text-label uppercase ${className}`}>
      <thead>
        <tr className="border-b border-line-strong text-tx3">
          <th className="text-left py-3 font-normal">Pair</th>
          <th className="text-left py-3 font-normal">Ratio</th>
          <th className="text-left py-3 font-normal">Verdict</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const v = verdict(r.ratio);
          return (
            <tr key={r.label} className="border-b border-line">
              <td className="py-3 text-tx2 normal-case font-text text-text tracking-normal">{r.label}</td>
              <td className="py-3 text-ink">{r.ratio.toFixed(2)}:1</td>
              <td className={`py-3 ${v === "fail" ? "text-gilt-700" : "text-green-700"}`}>{v}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

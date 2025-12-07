import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface BudgetRow {
  category: string;
  budget: number;
  actual: number;
}

export function BudgetMonitoringWidget({ data }: { data: BudgetRow[] }) {
  const formatRupiah = (num: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

  return (
    <Card className="col-span-4 shadow-sm border-l-4 border-l-blue-600">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>📊 Realisasi Anggaran (Budget vs Actual)</span>
          <Badge variant="outline">Updated: Jumat Sore</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-secondary/20">
              <tr>
                <th className="px-6 py-3">Pos Anggaran</th>
                <th className="px-6 py-3 text-right">Budget (RAB)</th>
                <th className="px-6 py-3 text-right">Actual (Realisasi)</th>
                <th className="px-6 py-3 text-right">Variance</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => {
                const variance = row.budget - row.actual;
                const variancePercent = (variance / row.budget) * 100;
                
                // Logic Peringatan Dini (>10% Over Budget)
                const isCritical = variance < 0 && Math.abs(variancePercent) > 10;
                const isOver = variance < 0;

                return (
                  <tr key={idx} className={`border-b dark:border-border ${isCritical ? "bg-red-50 dark:bg-red-500/10" : "bg-white dark:bg-card"}`}>
                    <td className="px-6 py-4 font-medium">{row.category}</td>
                    <td className="px-6 py-4 text-right text-gray-500 dark:text-gray-400">{formatRupiah(row.budget)}</td>
                    <td className="px-6 py-4 text-right font-bold">{formatRupiah(row.actual)}</td>
                    <td className={`px-6 py-4 text-right font-semibold ${isOver ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {variance < 0 ? "(" : "+"}{formatRupiah(Math.abs(variance))}{variance < 0 ? ")" : ""}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isCritical ? (
                        <div className="flex items-center justify-center gap-1 text-red-700 dark:text-red-400 font-bold animate-pulse">
                          <AlertTriangle className="w-4 h-4" /> ALERT
                        </div>
                      ) : isOver ? (
                        <span className="text-orange-500">Over</span>
                      ) : (
                        <span className="text-green-600 dark:text-green-500 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-4 h-4"/> Aman
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
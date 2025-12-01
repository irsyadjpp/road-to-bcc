import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Simulasi Data (Nanti diganti fetch Firebase)
const visitors = [
  { id: 1, name: "Budi Santoso", wa: "08123456789", code: "BCC-A1B2", time: "10:30" },
  { id: 2, name: "Siti Aminah", wa: "08129999888", code: "BCC-X9Y1", time: "10:35" },
  { id: 3, name: "Rizky Febian", wa: "08567777666", code: "BCC-P0L1", time: "10:42" },
  { id: 4, name: "Dewi Persik", wa: "08134444555", code: "BCC-M5N6", time: "11:05" },
];

export default function VisitorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-headline">Data Pengunjung</h2>
        <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableCaption>Daftar 100 pengunjung terakhir.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Waktu</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Kode Voucher</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitors.map((visitor) => (
              <TableRow key={visitor.id}>
                <TableCell>{visitor.time}</TableCell>
                <TableCell className="font-medium">{visitor.name}</TableCell>
                <TableCell>{visitor.wa}</TableCell>
                <TableCell className="font-mono">{visitor.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

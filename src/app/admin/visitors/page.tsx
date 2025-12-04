'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, UserCheck, Filter } from "lucide-react";

// Mock Data (Simulasi dari Firebase 'attendees')
const mockVisitors = [
  { id: 1, name: "Budi Santoso", wa: "08123456789", time: "10:00", visits: 3, voucher: "BCC-A1B2" },
  { id: 2, name: "Siti Aminah", wa: "08129999888", time: "10:15", visits: 5, voucher: "BCC-X9Y1" },
  { id: 3, name: "Rizky Febian", wa: "08567777666", time: "10:30", visits: 1, voucher: "BCC-P0L1" },
];

export default function VisitorsDataPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Logic
  const filteredData = mockVisitors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.wa.includes(searchTerm)
  );

  const handleExport = () => {
    alert("Mengunduh database pengunjung dalam format .CSV...");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold font-headline">Database Pengunjung</h2>
            <p className="text-muted-foreground">Data traffic penonton untuk laporan sponsorship (Leads).</p>
        </div>
        <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Check-in</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">1,245 Orang</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Rata-rata Kunjungan Booth</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">3.5 Booth/Org</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Database Valid (WA)</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">98%</div></CardContent>
          </Card>
      </div>

      <Card>
        <div className="p-4 border-b flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Cari nama atau No. WA..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
        </div>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Waktu Masuk</TableHead>
                        <TableHead>Nama Pengunjung</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Scan Booth</TableHead>
                        <TableHead>Kode Voucher</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((visitor) => (
                        <TableRow key={visitor.id}>
                            <TableCell>{visitor.time}</TableCell>
                            <TableCell className="font-medium flex items-center gap-2">
                                <UserCheck className="w-4 h-4 text-green-500" />
                                {visitor.name}
                            </TableCell>
                            <TableCell className="font-mono text-muted-foreground">{visitor.wa}</TableCell>
                            <TableCell>{visitor.visits} Sponsor</TableCell>
                            <TableCell><span className="font-mono bg-secondary px-2 py-1 rounded">{visitor.voucher}</span></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}

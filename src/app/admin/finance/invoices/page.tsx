'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Send, MoreVertical, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockInvoices = [
  { id: "INV-001", sponsor: "Bank BJB", package: "Title Sponsor", amount: 150000000, status: "PAID", dueDate: "2025-12-01", termin: "1/2" },
  { id: "INV-002", sponsor: "Flypower", package: "Gold", amount: 25000000, status: "UNPAID", dueDate: "2026-01-15", termin: "Full" },
  { id: "INV-003", sponsor: "Pocari Sweat", package: "In-Kind", amount: 0, status: "DRAFT", dueDate: "-", termin: "-" },
];

export default function InvoicePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline">Tagihan Sponsor</h2>
            <p className="text-muted-foreground">Kelola invoice dan status pembayaran partnership.</p>
        </div>
        <Button className="bg-primary">
            <Plus className="w-4 h-4 mr-2" /> Buat Invoice Baru
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No. Invoice</TableHead>
                        <TableHead>Sponsor / Mitra</TableHead>
                        <TableHead>Paket</TableHead>
                        <TableHead>Jatuh Tempo</TableHead>
                        <TableHead>Nominal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockInvoices.map((inv) => (
                        <TableRow key={inv.id}>
                            <TableCell className="font-mono">{inv.id}</TableCell>
                            <TableCell className="font-bold">{inv.sponsor}</TableCell>
                            <TableCell>{inv.package}</TableCell>
                            <TableCell>{inv.dueDate}</TableCell>
                            <TableCell>Rp {inv.amount.toLocaleString('id-ID')}</TableCell>
                            <TableCell>
                                {inv.status === 'PAID' && <Badge className="bg-green-600">Lunas</Badge>}
                                {inv.status === 'UNPAID' && <Badge variant="destructive" className="bg-red-500">Belum Bayar</Badge>}
                                {inv.status === 'DRAFT' && <Badge variant="outline">Draft</Badge>}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem><Send className="w-4 h-4 mr-2" /> Kirim ke Sponsor</DropdownMenuItem>
                                        <DropdownMenuItem className="text-green-600"><CheckCircle className="w-4 h-4 mr-2" /> Tandai Lunas</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}

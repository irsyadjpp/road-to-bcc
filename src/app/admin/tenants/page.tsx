'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Store, CheckCircle2, XCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const initialTenants = [
  { id: 1, name: "Kopi Kenangan", category: "F&B", owner: "Budi", contact: "081...", status: "PAID", slot: "A-01" },
  { id: 2, name: "Yonex Official", category: "Apparel", owner: "Susi", contact: "082...", status: "PAID", slot: "B-05" },
  { id: 3, name: "Siomay Bandung", category: "F&B", owner: "Asep", contact: "083...", status: "UNPAID", slot: "A-02" },
];

export default function TenantManagementPage() {
  const [tenants, setTenants] = useState(initialTenants);

  const toggleStatus = (id: number) => {
      setTenants(tenants.map(t => t.id === id ? { ...t, status: t.status === 'PAID' ? 'UNPAID' : 'PAID' } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-3xl font-bold font-headline">Manajemen Tenant</h2>
            <p className="text-muted-foreground">Kelola data 20 Tenant Bazar & Pembayaran Sewa.</p>
         </div>
         <Button className="bg-primary"><Plus className="w-4 h-4 mr-2" /> Tambah Tenant</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card>
             <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-3 bg-blue-100 text-blue-700 rounded-full"><Store className="w-6 h-6" /></div>
                 <div><div className="text-2xl font-bold">{tenants.length} / 20</div><div className="text-xs text-muted-foreground">Slot Terisi</div></div>
             </CardContent>
         </Card>
         <Card>
             <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-3 bg-green-100 text-green-700 rounded-full"><CheckCircle2 className="w-6 h-6" /></div>
                 <div><div className="text-2xl font-bold">{tenants.filter(t => t.status === 'PAID').length}</div><div className="text-xs text-muted-foreground">Lunas Sewa</div></div>
             </CardContent>
         </Card>
         <Card>
             <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-3 bg-red-100 text-red-700 rounded-full"><XCircle className="w-6 h-6" /></div>
                 <div><div className="text-2xl font-bold">{tenants.filter(t => t.status === 'UNPAID').length}</div><div className="text-xs text-muted-foreground">Belum Bayar</div></div>
             </CardContent>
         </Card>
      </div>

      <Card>
          <CardContent className="p-0">
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Slot</TableHead>
                          <TableHead>Nama Tenant</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>PIC / Kontak</TableHead>
                          <TableHead>Status Sewa</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {tenants.map((t) => (
                          <TableRow key={t.id}>
                              <TableCell className="font-mono font-bold">{t.slot}</TableCell>
                              <TableCell className="font-medium">{t.name}</TableCell>
                              <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
                              <TableCell>
                                  <div className="text-sm">{t.owner}</div>
                                  <div className="text-xs text-muted-foreground">{t.contact}</div>
                              </TableCell>
                              <TableCell>
                                  {t.status === 'PAID' ? 
                                      <Badge className="bg-green-600">Lunas</Badge> : 
                                      <Badge variant="destructive">Belum Bayar</Badge>
                                  }
                              </TableCell>
                              <TableCell className="text-right">
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => toggleStatus(t.id)}>Ubah Status Bayar</DropdownMenuItem>
                                          <DropdownMenuItem>Edit Data</DropdownMenuItem>
                                          <DropdownMenuItem className="text-red-600">Hapus</DropdownMenuItem>
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

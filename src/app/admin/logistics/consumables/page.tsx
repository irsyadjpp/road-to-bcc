'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Minus, AlertTriangle } from "lucide-react";

const INITIAL_STOCKS = [
  { id: 1, name: "Air Mineral (Dus)", stock: 45, max: 100, min: 20 },
  { id: 2, name: "Nasi Kotak (Porsi)", stock: 12, max: 150, min: 100 }, // Critical
  { id: 3, name: "Lakban Lapangan (Roll)", stock: 8, max: 20, min: 5 },
  { id: 4, name: "Spidol Board (Pcs)", stock: 15, max: 30, min: 5 },
];

export default function ConsumablesPage() {
  const [stocks, setStocks] = useState(INITIAL_STOCKS);

  const updateStock = (id: number, delta: number) => {
    setStocks(prev => prev.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
    ));
  };

  return (
    <div className="space-y-6">
       <h2 className="text-3xl font-bold font-headline">Kontrol Logistik Harian</h2>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stocks.map((item) => {
             const percentage = (item.stock / item.max) * 100;
             const isCritical = item.stock <= item.min;

             return (
                <Card key={item.id} className={isCritical ? "border-red-500 bg-red-50" : ""}>
                   <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground uppercase">{item.name}</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <div className="flex justify-between items-end mb-2">
                         <div className="text-3xl font-black">{item.stock}</div>
                         {isCritical && <AlertTriangle className="text-red-600 w-6 h-6 animate-pulse"/>}
                      </div>
                      <Progress value={percentage} className={`h-2 mb-4 ${isCritical ? "bg-red-200" : ""}`} />
                      
                      <div className="flex justify-between gap-2">
                         <Button variant="outline" size="sm" className="flex-1" onClick={() => updateStock(item.id, -1)}><Minus className="w-4 h-4"/></Button>
                         <Button variant="outline" size="sm" className="flex-1" onClick={() => updateStock(item.id, 1)}><Plus className="w-4 h-4"/></Button>
                      </div>
                   </CardContent>
                </Card>
             );
          })}
       </div>
    </div>
  );
}
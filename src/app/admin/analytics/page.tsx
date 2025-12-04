'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, QrCode, TrendingUp } from "lucide-react";

// Simulasi Data (Nanti dari Firebase)
const sponsorStats = [
  { name: "Bank BJB", scans: 850, unique: 600, engagement: "High" },
  { name: "Ayo Indonesia", scans: 920, unique: 750, engagement: "Very High" },
  { name: "Flypower", scans: 400, unique: 350, engagement: "Medium" },
  { name: "Pocari Sweat", scans: 1100, unique: 800, engagement: "Very High" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
       <div className="mb-6">
          <h2 className="text-3xl font-bold font-headline">Laporan Kinerja Sponsor</h2>
          <p className="text-muted-foreground">Analitik traffic booth dan eksposur brand.</p>
       </div>

       {/* HIGHLIGHTS */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
             <CardHeader className="pb-2"><CardTitle className="text-xs font-bold uppercase text-muted-foreground">Total Brand Impressions</CardTitle></CardHeader>
             <CardContent><div className="text-2xl font-black flex items-center gap-2"><TrendingUp className="text-green-500"/> 15.4K</div></CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2"><CardTitle className="text-xs font-bold uppercase text-muted-foreground">Total QR Scans</CardTitle></CardHeader>
             <CardContent><div className="text-2xl font-black flex items-center gap-2"><QrCode className="text-blue-500"/> 3,270</div></CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2"><CardTitle className="text-xs font-bold uppercase text-muted-foreground">Partisipasi Games</CardTitle></CardHeader>
             <CardContent><div className="text-2xl font-black">85%</div></CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2"><CardTitle className="text-xs font-bold uppercase text-muted-foreground">Sponsor Terpopuler</CardTitle></CardHeader>
             <CardContent><div className="text-lg font-bold text-primary">Pocari Sweat</div></CardContent>
          </Card>
       </div>

       {/* CHART & TABLE */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Traffic Booth Sponsor</CardTitle></CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sponsorStats} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)'
                            }}
                            cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                        />
                        <Bar dataKey="scans" name="Total Scans" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              </CardContent>
          </Card>

          <Card>
              <CardHeader><CardTitle>Top Engagement</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                  {sponsorStats.sort((a,b) => b.scans - a.scans).map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                          <div className="flex items-center gap-3">
                              <div className="font-bold text-lg w-6 text-muted-foreground">#{i+1}</div>
                              <div>
                                  <div className="font-bold text-sm">{s.name}</div>
                                  <div className="text-xs text-muted-foreground">{s.unique} Pengunjung Unik</div>
                              </div>
                          </div>
                          <div className="font-mono font-bold">{s.scans}</div>
                      </div>
                  ))}
              </CardContent>
          </Card>
       </div>
    </div>
  );
}

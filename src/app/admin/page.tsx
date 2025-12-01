import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, QrCode, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  // Simulasi Data
  const stats = [
    { title: "Total Pengunjung", value: "2,450", icon: Users, desc: "+120 sejak jam terakhir" },
    { title: "Total Vote Masuk", value: "1,890", icon: TrendingUp, desc: "78% participation rate" },
    { title: "Total Scan Booth", value: "5,300", icon: QrCode, desc: "Avg 2.5 scans/user" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold font-headline">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[300px] flex items-center justify-center border-dashed">
            <p className="text-muted-foreground">Grafik Kunjungan (Placeholder)</p>
        </Card>
        <Card className="h-[300px] flex items-center justify-center border-dashed">
            <p className="text-muted-foreground">Pie Chart Voting (Placeholder)</p>
        </Card>
      </div>
    </div>
  );
}

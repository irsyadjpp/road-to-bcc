'use client';

import { useState } from "react";
import { 
  CheckCircle2, Circle, Clock, Plus, 
  CalendarDays, Zap, Trophy, Flame, 
  ArrowRight, Filter, MoreHorizontal, Bell 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const MY_TASKS = [
  { id: 1, title: "Koordinasi Vendor Sound", deadline: "10:00 AM", priority: "HIGH", status: "PENDING", tag: "Logistics" },
  { id: 2, title: "Cetak ID Card Susulan", deadline: "12:30 PM", priority: "MEDIUM", status: "DONE", tag: "Secretariat" },
  { id: 3, title: "Briefing Volunteer Gate 1", deadline: "14:00 PM", priority: "HIGH", status: "PENDING", tag: "HR" },
  { id: 4, title: "Rekap Absensi Pagi", deadline: "16:00 PM", priority: "LOW", status: "PENDING", tag: "Admin" },
];

const SQUAD_ONLINE = [
  { name: "Kevin", img: "https://github.com/shadcn.png" },
  { name: "Marcus", img: "" },
  { name: "Fajar", img: "" },
  { name: "Rian", img: "" },
];

export default function WorkspacePage() {
  const [tasks, setTasks] = useState(MY_TASKS);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Toggle Task Status
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'DONE' ? 'PENDING' : 'DONE' } : t
    ));
  };

  // Helper Colors
  const getPriorityColor = (p: string) => {
    switch(p) {
        case 'HIGH': return 'text-red-500 bg-red-500/10 border-red-500/20';
        case 'MEDIUM': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
        default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      
      {/* --- HEADER: PERSONAL GREETING --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-primary text-primary bg-primary/10 backdrop-blur-md">
                    <Zap className="w-3 h-3 mr-2 fill-primary" /> WORKSPACE
                </Badge>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tuesday, 14 June</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Grind?</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Selamat pagi, <span className="text-white font-bold">Irsyad</span>. Kamu memiliki <span className="text-primary font-bold">3 tugas prioritas</span> hari ini.
            </p>
        </div>

        {/* SQUAD WIDGET */}
        <div className="hidden md:flex items-center gap-4 bg-zinc-900/80 p-2 pr-6 rounded-full border border-zinc-800 backdrop-blur-md">
            <div className="flex -space-x-3 pl-2">
                {SQUAD_ONLINE.map((u, i) => (
                    <Avatar key={i} className="w-10 h-10 border-2 border-zinc-900">
                        <AvatarImage src={u.img} />
                        <AvatarFallback className="bg-zinc-800 text-xs font-bold text-zinc-400">{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
            <div className="text-xs">
                <p className="font-bold text-white">Team Online</p>
                <p className="text-green-500 font-bold flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Active Now</p>
            </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT COLUMN: TASK MANAGEMENT (2/3) */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* 1. HERO STATS (BENTO) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-[32px] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-[40px] rounded-full group-hover:bg-primary/30 transition-all"></div>
                    <CardContent className="p-6">
                        <div className="mb-4 bg-zinc-800/50 w-10 h-10 rounded-full flex items-center justify-center text-white">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Completed</p>
                        <h3 className="text-3xl font-black text-white mt-1">12 <span className="text-sm font-medium text-zinc-500">Tasks</span></h3>
                    </CardContent>
                </Card>
                
                <Card className="bg-zinc-900 border-zinc-800 rounded-[32px]">
                    <CardContent className="p-6">
                        <div className="mb-4 bg-orange-500/10 w-10 h-10 rounded-full flex items-center justify-center text-orange-500">
                            <Flame className="w-5 h-5 fill-orange-500" />
                        </div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Streak</p>
                        <h3 className="text-3xl font-black text-white mt-1">5 <span className="text-sm font-medium text-zinc-500">Days</span></h3>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] col-span-2 md:col-span-1">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Efficiency</p>
                                <h3 className="text-3xl font-black text-white mt-1">85%</h3>
                            </div>
                            <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded-lg text-xs font-bold">+2.4%</div>
                        </div>
                        <Progress value={85} className="h-2 mt-4 bg-zinc-800" indicatorClassName="bg-green-500" />
                    </CardContent>
                </Card>
            </div>

            {/* 2. TASK LIST */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm">
                <Tabs defaultValue="my-tasks" className="w-full">
                    <div className="flex items-center justify-between px-6 py-4">
                        <TabsList className="bg-zinc-950 p-1 rounded-full h-12 border border-zinc-800">
                            <TabsTrigger value="my-tasks" className="rounded-full h-10 px-6 font-bold text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white">MY MISSION</TabsTrigger>
                            <TabsTrigger value="team" className="rounded-full h-10 px-6 font-bold text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white">SQUAD GOALS</TabsTrigger>
                        </TabsList>
                        
                        <Button 
                            size="icon" 
                            className="rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                            onClick={() => setIsAddTaskOpen(true)}
                        >
                            <Plus className="w-5 h-5 text-primary-foreground" />
                        </Button>
                    </div>

                    <TabsContent value="my-tasks" className="mt-0">
                        <ScrollArea className="h-[400px] px-2">
                            <div className="space-y-3 pb-4">
                                {tasks.map((task) => (
                                    <div 
                                        key={task.id} 
                                        onClick={() => toggleTask(task.id)}
                                        className={cn(
                                            "group flex items-center gap-4 p-4 rounded-[24px] border transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]",
                                            task.status === 'DONE' 
                                                ? "bg-zinc-900/30 border-zinc-800/50 opacity-60" 
                                                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-lg"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                                            task.status === 'DONE' ? "bg-primary border-primary text-white" : "border-zinc-700 text-transparent group-hover:border-primary"
                                        )}>
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h4 className={cn("font-bold text-base transition-all", task.status === 'DONE' ? "text-zinc-500 line-through" : "text-white")}>
                                                {task.title}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <Badge variant="outline" className={cn("rounded-md border text-[10px] px-2 h-5 font-bold uppercase", getPriorityColor(task.priority))}>
                                                    {task.priority}
                                                </Badge>
                                                <span className="text-xs text-zinc-500 flex items-center gap-1 font-mono">
                                                    <Clock className="w-3 h-3" /> {task.deadline}
                                                </span>
                                            </div>
                                        </div>

                                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white rounded-full">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>
         </div>

         {/* RIGHT COLUMN: NOTICES & TOOLS (1/3) */}
         <div className="space-y-6">
            
            {/* NOTICE BOARD */}
            <Card className="bg-yellow-500/10 border-yellow-500/20 rounded-[32px] relative overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-500/20 rounded-xl text-yellow-500">
                            <Bell className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-yellow-500 uppercase tracking-widest text-sm">Briefing Alert</h3>
                    </div>
                    <p className="text-yellow-100/80 text-sm font-medium leading-relaxed">
                        "Rapat koordinasi lapangan akan diadakan pukul 16:00 di Ruang Match Control. Wajib hadir bagi seluruh ketua divisi."
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-yellow-500/60 font-mono">
                        <span>● Posted by Project Director</span>
                    </div>
                </CardContent>
            </Card>

            {/* QUICK TOOLS */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-[32px]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:border-primary/50 group">
                        <CalendarDays className="w-6 h-6 text-zinc-400 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold text-white">Jadwal Saya</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:border-primary/50 group">
                        <Filter className="w-6 h-6 text-zinc-400 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold text-white">Laporan Harian</span>
                    </Button>
                </CardContent>
            </Card>

            {/* CALENDAR MINI */}
            <div className="bg-zinc-900 rounded-[32px] border border-zinc-800 p-6 flex items-center justify-between">
                <div>
                    <div className="text-zinc-500 text-xs font-bold uppercase">Next Event</div>
                    <div className="text-white font-black text-xl">Closing Ceremony</div>
                </div>
                <div className="bg-zinc-800 px-4 py-2 rounded-xl text-center">
                    <div className="text-xs text-zinc-500 font-bold">JULY</div>
                    <div className="text-xl font-black text-white">20</div>
                </div>
            </div>

         </div>

      </div>

      {/* --- ADD TASK MODAL (MD3) --- */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white rounded-[32px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 bg-zinc-950/50">
                <DialogTitle className="text-xl font-black font-headline uppercase">New Mission</DialogTitle>
            </div>
            
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Task Title</label>
                    <Input placeholder="Apa yang harus diselesaikan?" className="bg-black border-zinc-800 h-12 rounded-xl font-bold text-white focus:border-primary" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Priority</label>
                        <Select>
                            <SelectTrigger className="bg-black border-zinc-800 h-12 rounded-xl"><SelectValue placeholder="Pilih" /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="HIGH">High Priority</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="LOW">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Deadline</label>
                        <Input type="time" className="bg-black border-zinc-800 h-12 rounded-xl" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Notes</label>
                    <Textarea placeholder="Detail tambahan..." className="bg-black border-zinc-800 rounded-xl resize-none min-h-[80px]" />
                </div>

                <Button className="w-full h-14 rounded-full font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground mt-2 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    ADD TO MY LIST
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

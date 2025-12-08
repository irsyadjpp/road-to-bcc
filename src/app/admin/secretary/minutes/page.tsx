
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Save, FileText, CheckSquare } from "lucide-react";
import { createMeeting, getMeetings, type Meeting } from "./actions";
import { useToast } from "@/hooks/use-toast";

export default function MinutesPage() {
  const { toast } = useToast();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [actions, setActions] = useState<{task: string, pic: string}[]>([]);
  const [tempTask, setTempTask] = useState({ task: "", pic: "" });

  useEffect(() => {
    getMeetings().then(setMeetings);
  }, []);

  const addActionItem = () => {
    if (tempTask.task && tempTask.pic) {
        setActions([...actions, tempTask]);
        setTempTask({ task: "", pic: "" });
    }
  };

  const handleSubmit = async (formData: FormData) => {
    formData.append('actionItems', JSON.stringify(actions));
    await createMeeting(formData);
    toast({ title: "Rapat Tercatat", description: `${actions.length} tugas baru dibuat di Workspace.` });
    setActions([]);
    getMeetings().then(setMeetings);
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
             <h2 className="text-3xl font-bold font-headline">Minutes of Meeting (MoM)</h2>
             <p className="text-muted-foreground">Arsip rapat & distribusi tugas otomatis.</p>
          </div>
          <Dialog>
             <DialogTrigger asChild>
                <Button className="bg-primary"><Plus className="mr-2 w-4 h-4"/> Buat Notulensi Baru</Button>
             </DialogTrigger>
             <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>Form Notulensi Rapat</DialogTitle></DialogHeader>
                <form action={handleSubmit} className="space-y-4 py-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-sm font-bold">Judul Rapat</label>
                         <Input name="title" placeholder="Rapat Pleno 1" required />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold">Tanggal</label>
                         <Input name="date" type="date" required />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold">Peserta Hadir (Pisahkan koma)</label>
                      <Input name="attendees" placeholder="Irsyad, Kevin, Budi..." required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold">Pembahasan (Notes)</label>
                      <Textarea name="notes" placeholder="Ringkasan diskusi..." rows={5} required />
                   </div>

                   {/* Action Items Generator */}
                   <div className="bg-muted/30 p-4 rounded-lg border border-dashed">
                      <h4 className="text-sm font-bold mb-2 flex items-center gap-2"><CheckSquare className="w-4 h-4"/> Action Items (Tindak Lanjut)</h4>
                      <div className="flex gap-2 mb-2">
                         <Input placeholder="Tugas (misal: Booking GOR)" value={tempTask.task} onChange={e => setTempTask({...tempTask, task: e.target.value})} className="flex-grow" />
                         <Input placeholder="PIC" value={tempTask.pic} onChange={e => setTempTask({...tempTask, pic: e.target.value})} className="w-24" />
                         <Button type="button" size="icon" onClick={addActionItem}><Plus className="w-4 h-4"/></Button>
                      </div>
                      <ul className="space-y-1">
                         {actions.map((act, i) => (
                            <li key={i} className="text-xs bg-white p-2 rounded border flex justify-between">
                               <span>{act.task}</span> <span className="font-bold text-primary">{act.pic}</span>
                            </li>
                         ))}
                      </ul>
                   </div>

                   <Button type="submit" className="w-full">Simpan & Distribusikan Tugas</Button>
                </form>
             </DialogContent>
          </Dialog>
       </div>

       <div className="grid gap-4">
          {meetings.map((m) => (
             <Card key={m.id}>
                <CardHeader>
                   <CardTitle className="flex justify-between">
                      <span>{m.title}</span>
                      <span className="text-sm font-normal text-muted-foreground">{m.date}</span>
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-sm text-muted-foreground mb-4 whitespace-pre-wrap">{m.notes}</p>
                   <div className="bg-muted p-3 rounded text-sm">
                      <strong>Action Items:</strong>
                      <ul className="list-disc ml-5 mt-1">
                         {m.actionItems.map((act, i) => (
                            <li key={i}>{act.task} (PIC: {act.pic})</li>
                         ))}
                      </ul>
                   </div>
                </CardContent>
             </Card>
          ))}
       </div>
    </div>
  );
}

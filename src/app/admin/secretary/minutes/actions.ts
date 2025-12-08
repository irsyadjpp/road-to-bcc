
'use server';

import { revalidatePath } from "next/cache";

export type Meeting = {
  id: string;
  date: string;
  title: string;
  attendees: string[];
  notes: string;
  actionItems: { task: string; pic: string }[];
};

let MEETINGS_DB: Meeting[] = [];

export async function getMeetings() {
  return MEETINGS_DB;
}

export async function createMeeting(data: FormData) {
  // Parsing Action Items dari form (simulasi handling array input)
  const actionItemsRaw = data.get('actionItems') as string; // JSON string
  const actionItems = actionItemsRaw ? JSON.parse(actionItemsRaw) : [];

  const newMeeting: Meeting = {
    id: `MOM-${Date.now()}`,
    date: data.get('date') as string,
    title: data.get('title') as string,
    attendees: (data.get('attendees') as string).split(','),
    notes: data.get('notes') as string,
    actionItems,
  };

  MEETINGS_DB.unshift(newMeeting);
  
  // TODO: Di sini bisa panggil fungsi 'createTask' dari modul Workspace
  // agar Action Items otomatis jadi Task di Kanban Board.
  
  revalidatePath('/admin/secretary/minutes');
  return { success: true, message: "Notulensi tersimpan & Tugas didistribusikan." };
}

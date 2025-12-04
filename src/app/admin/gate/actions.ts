
'use server';

// MOCK DATA TIKET / ID CARD VALID
const VALID_TICKETS = [
  { code: "TICKET-001", name: "Budi Santoso", role: "PENONTON", status: "ACTIVE" },
  { code: "TICKET-002", name: "Siti Aminah", role: "PENONTON", status: "USED" }, // Sudah masuk
  { code: "ATLET-123", name: "Kevin Sanjaya", role: "ATLET", status: "ACTIVE", team: "PB Djarum" },
  { code: "COMM-001", name: "Panitia Inti", role: "PANITIA", status: "ACTIVE", access: "ALL_AREA" },
];

// MOCK LOG MASUK
let ACCESS_LOGS = [
  { id: 1, time: "08:00", name: "Siti Aminah", role: "PENONTON", gate: "Utama" },
  { id: 2, time: "08:15", name: "Agung", role: "PANITIA", gate: "VIP" },
];

export async function verifyTicket(code: string) {
  // Simulasi Delay Scan
  await new Promise(r => setTimeout(r, 800));

  const ticket = VALID_TICKETS.find(t => t.code === code);

  if (!ticket) {
    return { success: false, message: "TIKET TIDAK DITEMUKAN / INVALID" };
  }

  if (ticket.status === 'USED') {
    return { success: false, message: "TIKET SUDAH DIPAKAI (DUPLICATE ENTRY)" };
  }

  // Update status (Simulasi)
  ticket.status = 'USED';
  
  // Catat Log
  ACCESS_LOGS.unshift({
      id: Date.now(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      name: ticket.name,
      role: ticket.role,
      gate: "Utama"
  });

  return { 
    success: true, 
    data: ticket, 
    message: "AKSES DITERIMA - SILAKAN MASUK" 
  };
}

export async function getAccessLogs() {
    return ACCESS_LOGS;
}

export async function reportSecurityIncident(data: any) {
    await new Promise(r => setTimeout(r, 500));
    return { success: true, message: "Laporan keamanan tercatat." };
}

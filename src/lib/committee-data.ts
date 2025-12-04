
export type CommitteeMember = {
  position: string;
  name: string;
  id?: string; // Bisa dihubungkan ke User ID login nanti
};

export type CommitteeDivision = {
  id: string;
  title: string;
  members: CommitteeMember[];
};

export const INITIAL_COMMITTEE_STRUCTURE: CommitteeDivision[] = [
  {
    id: "SC",
    title: "PANITIA INTI (STEERING COMMITTEE)",
    members: [
      { position: "Project Director", name: "Irsyad Jamal Pratama Putra" },
      { position: "Sekretaris 1", name: "Rizki Karami" },
      { position: "Sekretaris 2", name: "Annisa Syafira" },
      { position: "Bendahara", name: "Selvi Yulia" },
    ]
  },
  {
    id: "MATCH",
    title: "BIDANG PERTANDINGAN (MATCH CONTROL)",
    members: [
      { position: "Koordinator", name: "Agung" },
      { position: "Match Liaison Officer (MLO)", name: "Sarah Fatmawati" },
      { position: "Tim Verifikasi (TPF)", name: "Anindiffa, Aulia, Faiz" },
    ]
  },
  {
    id: "BUSINESS",
    title: "BIDANG KOMERSIAL (BUSINESS)",
    members: [
      { position: "Koordinator", name: "Teri Taufiq Mulyadi" },
      { position: "Sponsorship Liaison", name: "Ali Wardana" },
      { position: "Tenant Relations", name: "Risca Amalia" },
    ]
  },
  {
    id: "MEDIA",
    title: "BIDANG ACARA & KREATIF (SHOW & MEDIA)",
    members: [
      { position: "Koordinator", name: "Rizki Karami" },
      { position: "Media & Sosmed", name: "Susi" },
      { position: "Content Creator", name: "Sarah Maulidina" },
      { position: "Dokumentasi", name: "Rizky Mauludin" },
    ]
  },
  {
    id: "OPS",
    title: "BIDANG OPERASIONAL UMUM",
    members: [
      { position: "Koordinator", name: "Kevin Deriansyah Budiman" },
      { position: "Keamanan & Gate", name: "Muhammad Nur Sidiq" },
      { position: "Medis", name: "Ananda Putri" },
      { position: "Logistik & Registrasi", name: "Norma Ayu / Alfin" },
    ]
  }
];

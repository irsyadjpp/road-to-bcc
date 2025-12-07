// src/lib/tpf-data.ts

// I. PANDUAN VISUAL RUBRIK
export const RUBRIC_GUIDELINES = [
  {
    title: '1. GRIP & BIOMEKANIK',
    scores: [
      { score: 1-2, desc: 'Memegang raket seperti "Grip Panci". Pukulan "bletak" (kena frame).' },
      { score: 3-4, desc: 'Grip Salaman (V-Grip). Bunyi pukulan bersih. Ayunan raket lancar.' },
      { score: 5, desc: 'Pukulan bertenaga tapi terlihat santai (effortless). Transisi grip sangat cepat.' }
    ]
  },
  {
    title: '2. FOOTWORK',
    scores: [
      { score: 1-2, desc: 'Diam menunggu bola atau lari biasa. Sering hampir jatuh.' },
      { score: 3-4, desc: 'Langkah chasse (geser). Bisa mengejar bola standar.' },
      { score: 5, desc: 'Langkah ringan (jinjit). Selalu siap di tengah. Cover lapangan luas.' }
    ]
  },
  {
    title: '3. BACKHAND',
    scores: [
        { score: 1-2, desc: 'Panik/Lari memutar badan. Bola tanggung/net.' },
        { score: 3-4, desc: 'Bisa Drop atau Lob ke tengah lapangan. Aman.' },
        { score: 5, desc: 'Bisa Clear (Lob) sampai garis belakang secara konsisten.' }
    ]
  },
    {
    title: '4. ATTACK (SMASH)',
    scores: [
        { score: 1-2, desc: 'Melambung keluar atau nyangkut net.' },
        { score: 3-4, desc: 'Menukik dan kencang.' },
        { score: 5, desc: 'Tajam, Keras, dan Akurat ke pinggir garis. Variasi Check Smash.' }
    ]
  },
  {
    title: '5. DEFENSE (BERTAHAN)',
    scores: [
        { score: 1-2, desc: 'Takut bola (membuang muka/badan). Reaksi lambat, raket cuma ditaruh asal kena.' },
        { score: 3-4, desc: '"Tembok". Tenang saat dismash. Bisa mengembalikan bola tinggi ke belakang (Lift).' },
        { score: 5, desc: 'Counter-Attack. Mengubah bertahan jadi menyerang dengan Drive datar/silang.' }
    ]
  },
  {
    title: '6. GAME IQ (ROTASI & POSISI)',
    scores: [
        { score: 1-2, desc: 'Sering tabrakan raket atau saling diam. Posisi statis.' },
        { score: 3-4, desc: 'Paham formasi dasar (Serang=Depan-Belakang, Tahan=Kiri-Kanan).' },
        { score: 5, desc: 'Antisipasi tinggi. Membaca pukulan lawan dan memotong bola (Intercept).' }
    ]
  },
  {
    title: '7. PHYSIQUE (FISIK & INTENSITAS)',
    scores: [
        { score: 1-2, desc: 'Terlihat "ngos-ngosan" setelah reli pendek.' },
        { score: 3-4, desc: 'Stabil. Mampu menjaga tempo sedang dari awal sampai akhir.' },
        { score: 5, desc: 'Eksplosif. Masih mampu sprint/jumping smash dengan kecepatan penuh di akhir.' }
    ]
  }
];

// II. PETUNJUK TEKNIS PENILAIAN
export const ASSESSMENT_METHODS = [
    {
        title: "I. METODE PENILAIAN VIA VIDEO (PRA-TURNAMEN)",
        points: [
            { subtitle: '1. TEKNIK "PAUSE & ZOOM" (Cek Biomekanik)', desc: "Lakukan Pause saat pemain mengangkat raket. Lihat genggaman tangan. Grip panci = Beginner. Grip miring/siku naik = Intermediate/Advance." },
            { subtitle: '2. CEK KUALITAS LAWAN (Validasi Konteks)', desc: "Jika lawan hanya memberi bola enak (Feeding), kurangi nilai skill. Wajib video uncut minimal 2 menit." },
            { subtitle: '3. AUDIO CHECK (Bunyi Pukulan)', desc: 'Besarkan volume. "Bletak/Prak" = Akurasi Buruk. "Bug/Dug" = Power Menengah. "Tring/Wush" = Advance (Sweet Spot).' },
            { subtitle: '4. FOOTWORK "TANPA BOLA"', desc: "Perhatikan subjek saat partnernya memukul. Diam menonton = Level Bawah. Ikut geser jaga ruang = Level Atas." }
        ]
    },
    {
        title: "II. METODE PENILAIAN LANGSUNG DI LAPANGAN (SAAT PERTANDINGAN)",
        points: [
            { subtitle: '1. PANTAU SAAT WARM-UP', desc: 'Pemain sering lupa "sandiwara" saat pemanasan. Lihat saat mereka lob/clear. Seringkali teknik asli keluar di sini.' },
            { subtitle: '2. TEKNIK "POIN KRITIS" (Mental Check)', desc: 'Lihat saat skor 19-19. Beginner akan panik. Sandbagger mendadak jago. Jika skill naik drastis, tandai sebagai Advance.' },
            { subtitle: '3. POSISI BERDIRI (STANCE) SAAT DEFENSE', desc: 'Kaki rapat & raket di bawah = Beginner. Kaki kuda-kuda & raket di perut = Intermediate. Kuda-kuda & badan condong agresif = Advance.' },
            { subtitle: '4. REAKSI "BOLA KAGET" (Refleks Alamiah)', desc: 'Refleks tidak bisa bohong. Jika tangan menyentak cepat ke arah bola sulit, itu tanda Muscle Memory level tinggi.' }
        ]
    }
];

// III. TABEL PEMBANDING
export const COMPARISON_TABLE = [
    { indicator: "POWER", video_assessment: "Dilihat dari laju bola (cepat/lambat) di video.", field_assessment: "Dilihat dari suara ledakan senar & seberapa jauh lawan terdorong mundur." },
    { indicator: "STAMINA", video_assessment: "Sulit dinilai (karena potongan klip).", field_assessment: "Sangat jelas. Lihat napas & apakah tangan memegang lutut saat jeda." },
    { indicator: "MENTAL", video_assessment: "Tidak terlihat.", field_assessment: "Terlihat jelas saat poin kritis atau saat tertinggal jauh." },
    { indicator: "GAME IQ", video_assessment: "Lihat posisi rotasi.", field_assessment: "Lihat komunikasi dengan partner & cara mematikan lawan." },
    { indicator: "BACKHAND", video_assessment: "Lihat teknik ayunan (siku).", field_assessment: "Lihat keberanian. Apakah dia lari menghindari backhand atau menunggu backhand?" }
];


// IV. RED FLAGS
export const RED_FLAGS = [
    '"Miss" yang Tidak Wajar: Sengaja membuang bola out jauh sekali atau servis nyangkut berkali-kali secara teatrikal.',
    'Footwork Malas tapi Sampai: Kakinya terlihat jalan santai, tapi anehnya selalu tepat posisi bola jatuh (Pembacaan bola terlalu bagus).',
    'Mata Elang: Pemain yang dengan yakin melepas bola (Watch the line) dan terbukti benar out tipis.',
    'Gear Pro: (Indikator pendukung) Menggunakan sepatu/raket grade turnamen mahal dan cara membalut grip yang rapi khas atlet.'
];

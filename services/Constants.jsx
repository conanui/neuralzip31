import { BriefcaseBusiness, Calendar, Code2Icon, Layout, LayoutDashboard, List, Puzzle, Settings, WalletCards } from "lucide-react";

  export const SideBarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard', 
    },
    {
        name: 'Scheduled Interview',
        icon: Calendar,
        path: '/scheduled-interview' 
    },
    {
        name: 'All Interview',
        icon: List,
        path: '/all-interview', 
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing', 
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings', 
    },
]

export const InterviewType = [
    {
        title: 'Technical',
        icon:Code2Icon
    },
    {
        title: 'Behavioral',
        icon:Code2Icon
    },
    {
        title: 'Experience',
        icon:BriefcaseBusiness
    },
    
        
    {
        title: 'Problem Solving',
        icon:Puzzle
    },
    
]

/*export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description:{{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}
📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
🧩 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
   question:'',
      type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
      },{
      ...
      }]
      🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role. Saya mau kamu menjawabnya dengan bahasa Indonesia`*/

      export const QUESTION_PROMPT = `
Anda adalah seorang pewawancara teknis ahli.

Berdasarkan informasi berikut ini, buatlah daftar pertanyaan wawancara yang terstruktur, relevan, dan berkualitas tinggi:

📌 Informasi:
- Posisi: {{jobTitle}}
- Deskripsi Pekerjaan: {{jobDescription}}
- Durasi Wawancara: {{duration}} menit
- Jenis Wawancara: {{type}}

🎯 Tugas Anda:
1. Analisis deskripsi pekerjaan untuk mengidentifikasi tanggung jawab utama, keterampilan yang dibutuhkan, dan pengalaman yang diharapkan.
2. Buat daftar pertanyaan wawancara yang sesuai dengan jenis wawancara ({{type}}).
3. Sesuaikan jumlah dan kedalaman pertanyaan dengan durasi wawancara.
4. Pertanyaan harus realistis, relevan, dan mencerminkan wawancara {{type}} yang terjadi di dunia nyata.

🧩 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
   question:'',
      type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
      },{
      ...
      }]

🗣 Bahasa pertanyaan: Bahasa Indonesia

Tujuan akhir Anda adalah menciptakan rencana wawancara yang efektif, terstruktur, dan sesuai waktu untuk posisi {{jobTitle}}.
`.trim();


/*export const FEEDBACK_PROMPT=`
{{conversation}}

Berdasarkan percakapan wawancara antara asisten dan kandidat,

Berikan saya umpan balik terhadap wawancara kandidat. Berikan penilaian dari skala 1 sampai 10 untuk:  
- Kemampuan Teknis  
- Komunikasi  
- Pemecahan Masalah  
- Pengalaman

perlu ditekankan bahwa anda harus menilai secara  objektif jika bagus bilang bagus dan jika buruk bilang buruk. peserta yang tidak menjawab soal walau satupun silahkan anda berikan nol.

Juga berikan ringkasan hasil wawancara dalam 3 kalimat,  
serta satu kalimat yang menyatakan apakah kandidat direkomendasikan untuk direkrut atau tidak, beserta alasannya.

Berikan jawaban dalam format JSON seperti berikut:

{
    umpanBalik: {
        penilaian: {
            kemampuanTeknis:7 ,
            komunikasi:7 ,
            pemecahanMasalah:6 ,
            pengalaman: 8
        },
        ringkasan: <dalam 3 kalimat>,
        rekomendasi: '',
        pesanRekomendasi: ''
    }
}`
*/

export const FEEDBACK_PROMPT = `
Analisis Wawancara:

{{conversation}}

Berdasarkan percakapan wawancara antara pewawancara dan kandidat di atas, berikan evaluasi objektif dan menyeluruh dengan mengikuti instruksi berikut:

1. PENILAIAN OBJEKTIF (skala 1-10):
   - Kemampuan Teknis: Evaluasi pemahaman kandidat tentang konsep teknis, kedalaman pengetahuan, dan kemampuan menjelaskan solusi teknis.
   - Komunikasi: Nilai kejelasan, struktur, dan efektivitas penyampaian informasi oleh kandidat.
   - Pemecahan Masalah: Nilai pendekatan kandidat terhadap masalah, metode analisis, dan kualitas solusi yang diusulkan.
   - Pengalaman: Evaluasi relevansi dan kedalaman pengalaman kandidat terhadap posisi yang dilamar.

2. KRITERIA PENILAIAN:
   - 0: Tidak ada jawaban/respons yang relevan
   - 1-3: Di bawah ekspektasi, jawaban sangat lemah atau tidak memadai
   - 4-6: Memenuhi ekspektasi dasar, jawaban cukup tapi tidak menonjol
   - 7-8: Di atas ekspektasi, jawaban berkualitas tinggi
   - 9-10: Luar biasa, jawaban sangat mendalam dan menunjukkan keahlian tingkat tinggi

3. ANALISIS WAWANCARA:
   - Berikan ringkasan hasil wawancara dalam 3 kalimat yang mencakup kekuatan dan kelemahan utama kandidat.
   - Berikan rekomendasi "DIREKOMENDASIKAN" atau "TIDAK DIREKOMENDASIKAN" berdasarkan penilaian objektif.
   - Jelaskan alasan rekomendasi Anda dalam satu kalimat yang jelas dan padat.

SANGAT PENTING: Jika kandidat tidak menjawab pertanyaan atau memberikan jawaban yang sangat minim/tidak relevan, beri nilai 0-2 untuk kategori tersebut. Kandidat harus mendapat nilai rendah jika tidak menunjukkan pemahaman atau kemampuan yang diharapkan.

Berikan jawaban dalam format JSON berikut:

{
    "umpanBalik": {
        "penilaian": {
            "kemampuanTeknis": [nilai 0-10],
            "komunikasi": [nilai 0-10],
            "pemecahanMasalah": [nilai 0-10],
            "pengalaman":  [nilai 0-10],
            "keseluruhan": [nilai 0-10]
        },
        "ringkasan": "[Ringkasan dalam 3 kalimat]",
        "rekomendasi": "[DIREKOMENDASIKAN/TIDAK DIREKOMENDASIKAN]",
        "pesanRekomendasi": "[Alasan rekomendasi dalam 1 kalimat]"
    }
}
`


      


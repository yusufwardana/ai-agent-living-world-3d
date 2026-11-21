# Master Prompt — AI Agent Living World 3D

> Sumber asli: [Google Docs](https://docs.google.com/document/d/1EFuYf9Dqbf26Rc4NhbWV3LcPDjQX6_Q-2IAdj961zD8/mobilebasic).
> Dokumen ini adalah spesifikasi tujuan, bukan klaim fitur sudah diimplementasikan.

Bertindak sebagai Principal Software Engineer, Senior 3D Game Developer, AI Systems Architect, UI/UX Designer, Technical Artist, dan QA Engineer.

Bangun aplikasi web 3D premium bernama "AI Agent Living World", sebuah dunia virtual interaktif yang menyerupai gabungan The Sims, SimCity, dan kantor AI Agent modern. Pengguna menjadi pemilik sebuah kampus AI yang dapat dilihat, dikelola, diperbesar, diputar 360 derajat, serta dikustomisasi.

Aplikasi harus menjadi SOFTWARE NYATA, bukan sekadar gambar, landing page, video, maket, animasi statis, atau dashboard palsu.

AI Agent harus dapat terhubung ke model AI, menerima tugas, melakukan pekerjaan nyata dengan tools yang diizinkan, berkolaborasi, dan menghasilkan artefak. Semua pekerjaan direpresentasikan secara visual dalam dunia 3D oleh karakter yang bergerak, duduk, mengetik, menghadiri meeting, atau menyerahkan hasil pekerjaan.

Aktivitas seperti makan, tidur, berenang, bermain bola, dan bersosialisasi adalah SIMULASI VISUAL/KEHIDUPAN, bukan bukti bahwa model AI sedang melakukan hal tersebut.


## 1. IDENTITAS VISUAL DAN ARAH DESAIN
Gaya: Stylized 3D Premium / Modern Life Simulation.
Referensi kualitas: The Sims, SimCity, Two Point Campus, Cities Skylines, dan game simulasi manajemen modern.

Jangan membuat dashboard SaaS generik atau gedung kubus kosong.

Karakteristik:
- Lingkungan 3D penuh, ramai, berwarna, dan hidup.
- Arsitektur kantor futuristik tetapi nyaman.
- Gedung bertingkat dengan kaca transparan, interior lengkap dan detail.
- Pepohonan, taman, jalan, kolam, rumput, kendaraan, furnitur, dan dekorasi.
- Warna putih hangat, krem, kayu natural, hijau taman, aksen biru lembut dan oranye.
- Cahaya matahari realistis, bayangan lembut, ambient lighting, dan lampu interior.
- Sudut bangunan membulat, material kaca, metal, batu, dan kayu.
- Animasi halus dengan transisi profesional.
- Visual konsisten, jangan mencampurkan low-poly kasar dengan photorealism berlebihan.
- Tidak terlalu berat untuk laptop kelas menengah.
- Kamera default isometric 3/4 memperlihatkan seluruh kompleks.

Bangun material, pencahayaan, furnitur, karakter, dan lingkungan sebagai aset 3D asli (procedural geometry atau GLB/GLTF), bukan gambar dua dimensi yang terlihat seperti 3D.


## 2. TEKNOLOGI DAN ARSITEKTUR
Frontend:
- React + Vite + TypeScript
- Three.js dan React Three Fiber
- @react-three/drei
- Tailwind CSS
- Zustand untuk state antarmuka dan dunia 3D
- Framer Motion atau Motion untuk animasi panel
- Lucide React untuk ikon
- Three.js AnimationMixer untuk animasi avatar
- Sistem collision, pathfinding/navmesh, dan steering yang sesuai dengan kebutuhan

Backend:
- Supabase Auth
- PostgreSQL untuk database
- Supabase Realtime untuk update status
- Supabase Storage untuk file hasil pekerjaan
- Supabase RLS untuk keamanan data
- Backend Node.js/TypeScript untuk orkestrasi pekerjaan AI yang berjalan lama
- Background job queue yang persisten dan retry-safe
- WebSocket atau event stream untuk pembaruan real-time
- Adapter LLM modular untuk OpenAI, Gemini, Anthropic, dan provider kompatibel API lain
- Tool execution berbasis izin, timeout, dan audit log

Jangan menjalankan pekerjaan LLM atau secret API langsung dari browser.
Jangan menggunakan localStorage sebagai database utama.
Jangan menggunakan data palsu untuk menyatakan pekerjaan AI telah berhasil.

Sediakan demo mode yang jelas terpisah dari live mode.


## 3. MASTER WORLD: KAWASAN VIRTUAL 3D
Buat sebuah pulau kecil atau kawasan kampus perusahaan AI dengan jalan yang menghubungkan beberapa gedung.

Dunia dapat diperluas ke depan, bukan hanya satu ruangan.

A. GEDUNG KANTOR PUSAT
Gedung utama 4-6 lantai dengan:
- Lobby dan reception
- Open workspace
- Ruang CEO / director
- Ruang project manager
- Ruang tim programmer
- Ruang UI/UX dan desain kreatif
- Ruang content creator
- Ruang research dan data analyst
- Ruang marketing
- Ruang HR dan administrasi
- Ruang meeting kecil dan besar
- Command center
- Server room
- Focus pods
- Lift, tangga, koridor dan toilet dekoratif
- Balkon, rooftop, dan lounge

Setiap lantai memiliki tata letak nyata, dinding, pintu, jendela, kursi, meja, komputer, rak, tanaman, lampu, dan dekorasi.

B. GEDUNG RESEARCH & INNOVATION
- Laboratorium AI
- Ruang penelitian
- Perpustakaan digital
- Training center
- Testing laboratory
- Ruang eksperimen
- Ruang server dan monitoring

C. AREA REKREASI DAN OLAHRAGA
- Kolam renang lengkap dengan animasi air
- Kolam anak/dekoratif opsional
- Lapangan sepak bola mini dengan pemain dan gawang
- Lapangan basket
- Gym lengkap dengan peralatan
- Game center
- Biliar dan tenis meja
- Ruang karaoke atau mini cinema
- Taman jogging
- Taman bunga, kolam ikan, area duduk

D. AREA SOSIAL
- Restoran/kantin
- Coffee shop
- Food court outdoor
- Rooftop café
- Area barbeque
- Lounge santai
- Amphitheater untuk acara
- Meeting garden
- Plaza dengan air mancur

E. AREA HUNIAN
- Gedung apartemen AI Agent
- Kamar pribadi setiap agent
- Ruang tidur, meja, sofa, lemari, dekorasi
- Area santai bersama
- Lobby apartemen
- Lift dan koridor
- Pengaturan rumah/ruangan oleh pengguna

F. LINGKUNGAN LUAR
- Jalan raya kecil dan trotoar
- Pohon dan taman
- Lampu jalan
- Parkir kendaraan
- Sepeda dan mobil dekoratif
- Danau buatan
- Jembatan
- Pagar dan gerbang
- Sistem cuaca dan waktu
- Ambient sound opsional dengan kontrol mute

Semua area harus terhubung secara spasial dan dapat dinavigasi oleh kamera maupun karakter.


## 4. SISTEM KAMERA 3D
Sediakan:

1. Isometric view: tampilan seluruh kawasan.

2. Free orbit: kamera putar 360 derajat.

3. Top-down view: seperti game manajemen kota.

4. Building mode: menampilkan gedung dan lantai.

5. Follow agent: kamera mengikuti karakter.

6. Interior mode: masuk ke ruangan.

7. Cinematic mode: kamera otomatis mengikuti aktivitas menarik.

Kontrol:
- Mouse drag = orbit.
- Mouse wheel = zoom.
- Klik bangunan = fokus bangunan.
- Double-click ruang = fokus interior.
- Klik agent = buka panel detail.
- Tombol kembali ke world view.
- Tombol sembunyikan atap/dinding.
- Pilih lantai tanpa mencampur objek semua lantai.
- Zoom camera dengan collision dan batas navigasi.
- Dukungan touch gesture untuk mobile.

Saat memilih suatu lantai, atap atau dinding di depan kamera harus disembunyikan atau dibuat transparan dengan transisi halus.


## 5. KARAKTER AI AGENT 3D
Setiap agent memiliki avatar 3D unik.

Atribut:
- ID dan nama
- Role / jabatan
- Tim / departemen
- Deskripsi kepribadian
- Provider dan model AI
- System prompt
- Tools dan permissions
- Memory / knowledge source
- Posisi 3D dan lokasi rumah/kantor
- Meja kerja dan ruangan
- Skin/avatar customization
- Outfit
- Animasi
- Status aktivitas
- Riwayat pekerjaan
- Total biaya pemakaian API

Jenis animasi:
- Idle
- Walking
- Running
- Sitting
- Typing
- Reading
- Talking
- Presenting
- Thinking
- Waiting
- Drinking coffee
- Eating
- Sleeping
- Swimming
- Exercising
- Playing football
- Playing games
- Celebrating success
- Showing error/warning

Gunakan animation state machine dengan transisi alami.
Pastikan karakter tidak menembus dinding, kursi, meja, air, atau karakter lain.

Sediakan avatar builder sederhana dengan pilihan wajah, rambut, warna pakaian, dan aksesori.

Avatar merupakan representasi visual AI Agent dan animasi tidak boleh dianggap sebagai proses kerja AI yang sebenarnya.


## 6. AI AGENT ENGINE: PEKERJA NYATA
Bangun Agent Management System yang menghubungkan avatar dengan AI backend.

Pengguna bisa membuat agent melalui form:
- Nama agent
- Jabatan
- Model/provider
- API connection
- System instructions
- Keahlian
- Tools yang dapat digunakan
- Batas biaya dan token
- Akses dokumen
- Jenis tugas yang diperbolehkan
- Status aktif atau nonaktif

Contoh agent:
- CEO Agent
- Manager Agent
- Programmer Agent
- UI/UX Designer Agent
- Graphic Design Agent
- Copywriter Agent
- Research Agent
- Data Analyst Agent
- SEO Agent
- Marketing Agent
- Finance Analyst Agent
- Quality Assurance Agent
- Administrative Agent

Agent harus bisa:
- Menerima tugas
- Memecah tugas menjadi subtugas
- Melakukan reasoning dan tool calling melalui model yang dipilih
- Mengakses knowledge source yang diizinkan
- Menghasilkan dokumen atau kode
- Melakukan handoff ke agent lain
- Mengirimkan laporan
- Mengirim hasil pekerjaan kepada pengguna
- Meminta approval saat tindakan berisiko atau eksternal
- Menyimpan history dan artifact

Jangan berpura-pura menjalankan pekerjaan yang belum terintegrasi.
Jika tool belum tersedia, tampilkan status "Integration Required" dengan penjelasan yang jelas.


## 7. TASK MANAGEMENT DAN ORKESTRASI
Bangun task orchestration engine:
- Task creation
- Prioritas
- Assignment
- Dependencies
- Task queue
- Subtasks
- Deadline
- Progress tracking
- Retry
- Cancel
- Pause/resume
- Human approval
- Artifact handoff
- Activity log
- Error handling
- Cost tracking
- Completed task history

Agent Manager dapat membagi tugas kepada agent yang memiliki kemampuan relevan.

Contoh:
Pengguna: "Buatkan website company profile untuk perusahaan susu."

Manager Agent:

1. Menganalisis kebutuhan.

2. Membagikan riset ke Research Agent.

3. Memberikan desain ke UI/UX Agent.

4. Memberikan implementasi ke Programmer Agent.

5. Meminta QA Agent menguji hasil.

6. Menyusun hasil akhir dan menyerahkannya kepada pengguna.

Semua aktivitas harus memancarkan event real-time yang mengubah status dan perilaku avatar 3D.


## 8. HUBUNGAN STATUS AI DAN ANIMASI 3D
Buat mekanisme event-driven mapping:

Task assigned -> agent menuju meja kerja.
Task started -> agent duduk dan menggunakan komputer.
LLM thinking -> animasi berpikir.
Tool execution -> animasi interaksi komputer.
Waiting for input -> agent menunggu dengan indikator.
Team collaboration -> agent menuju ruang meeting.
Task completed -> animasi senang dan notifikasi selesai.
Task failed -> indikator masalah dan panel log.
Agent offline -> avatar kembali ke rumah atau beristirahat.
No tasks -> agent menjalankan aktivitas leisure terjadwal.

Sistem tidak boleh membuat agent seolah menyelesaikan tugas apabila backend sebenarnya gagal.

Event dan status backend menjadi sumber kebenaran. Avatar hanya representasi visual.


## 9. MEETING ROOM DAN KOLABORASI
Buat sistem meeting AI Agent.

Pengguna dapat:
- Membuat rapat
- Menentukan topik
- Mengundang agent
- Menentukan tujuan
- Mengirim dokumen
- Melihat percakapan asli hasil model
- Menerima notulen
- Membuat action items

Dalam dunia 3D:
- Agent berjalan menuju meeting room.
- Duduk pada kursi.
- Avatar pembicara menampilkan animasi bicara.
- Layar meeting menampilkan ringkasan dan status.
- Setelah selesai, agent kembali ke aktivitasnya.

Meeting harus berjalan melalui orkestrasi nyata jika live mode aktif.


## 10. AI AGENT LIFE SIMULATION
Buat sistem simulasi keseharian terpisah dari AI engine.

AI Agent memiliki jadwal visual:
- Datang ke kantor
- Memulai pekerjaan
- Meeting
- Istirahat makan
- Coffee break
- Kembali bekerja
- Olahraga atau kegiatan sosial
- Pulang ke apartemen
- Tidur

Sediakan mode:
- Realistic Schedule
- Fast Simulation
- Always Working
- Custom Schedule

Pengguna dapat menyesuaikan jadwal.

Buat simulation clock tersendiri; jam virtual tidak wajib sama dengan waktu nyata.

Leisure dan kebutuhan avatar hanya memengaruhi simulasi tampilan, bukan kualitas kemampuan model AI atau biaya API, kecuali pengguna secara eksplisit menambahkan aturan orkestrasi demikian.


## 11. SISTEM OLAHRAGA DAN HIBURAN
Kolam renang:
- Permukaan air bergerak
- Animasi masuk/keluar air
- Gerakan berenang
- Kursi santai
- Lingkungan kolam detail

Lapangan sepak bola:
- Dua tim karakter
- Animasi berlari dan menendang
- Bola bergerak berdasarkan simulasi sederhana
- Sistem skor
- Pertandingan otomatis
- Penonton opsional

Gym:
- Animasi treadmill
- Angkat beban
- Yoga
- Beristirahat

Coffee shop/restoran:
- Duduk
- Mengambil makanan
- Mengobrol
- Menyerahkan pesanan
- Makan/minum

Sistem ini bersifat simulasi visual agar lingkungan terasa hidup. Jangan mengirim panggilan API LLM untuk setiap animasi.


## 12. WORLD BUILDER DAN BUILD MODE
Pengguna menjadi pemilik dunia.

Bisa:
- Menambah bangunan
- Memilih jenis bangunan
- Membuat dan menghapus ruangan
- Menentukan nama ruangan
- Menambah lantai
- Memindahkan furnitur
- Memutar objek
- Mengganti material
- Menentukan meja kerja agent
- Mengubah posisi dekorasi
- Mengatur taman
- Menambah kolam
- Membuat area rekreasi
- Mengubah jalan dan lingkungan

Sediakan:
- Grid snapping
- Placement preview
- Collision checks
- Undo/redo
- Save layout
- Load layout
- Blueprint templates
- Validasi navigasi karakter setelah layout diubah

Persist layout dan posisi ke database, bukan hanya browser state.


## 13. ANTARMUKA PENGGUNA
Gunakan desktop-first dengan desain premium, clean, minimal, dan glassmorphism ringan.

Tata letak:

KIRI: Sidebar utama
- World
- Agents
- Tasks
- Teams
- Meetings
- Buildings
- Build Mode
- Analytics
- Activity
- Settings

TENGAH:
- Kanvas dunia 3D sebagai fokus terbesar.
- Dunia tetap bisa dilihat ketika panel ditampilkan.

KANAN:
- Context panel.
- Saat memilih agent, tampilkan agent profile dan kontrol.
- Saat memilih bangunan, tampilkan detail bangunan.
- Saat memilih tugas, tampilkan status pekerjaan.
- Panel dapat ditutup dan diubah ukurannya.

ATAS:
- Logo aplikasi
- Waktu dunia
- Status live/demo
- Jumlah agent aktif
- Task running
- Error count
- Biaya API hari ini
- Kontrol waktu dan kamera

BAWAH:
- Floating action toolbar
- Play/pause simulation
- Speed 1x/2x/4x
- Camera mode
- Hide roof
- Follow agent
- Notification/activity ticker

Tampilan mobile harus berbeda dari desktop:
- Sidebar menjadi navigation drawer/bottom navigation.
- Kanvas 3D tetap dominan.
- Panel detail menjadi bottom sheet.
- Touch controls yang nyaman.
- Rendering quality otomatis disesuaikan dengan performa perangkat.

Jangan gunakan UI yang terlihat seperti dashboard template bawaan.


## 14. INTERAKSI AGENT
Ketika pengguna mengklik avatar, tampilkan panel:
- Nama dan avatar
- Pekerjaan
- Model AI
- Status pekerjaan
- Task saat ini
- Aktivitas visual
- Statistik tugas selesai
- Penggunaan API
- Riwayat
- Log tool execution

Tombol:
- Chat with Agent
- Assign Task
- View Work
- Follow Agent
- Open Workspace
- Pause / Resume
- Edit Agent

Chat dengan agent harus terhubung pada model yang dikonfigurasi apabila live mode aktif.


## 15. SISTEM ANALYTICS
Dashboard statistik:
- Jumlah agent
- Agent aktif/nonaktif
- Tugas selesai
- Tugas gagal
- Pekerjaan berlangsung
- Antrean tugas
- Durasi pekerjaan
- Model usage
- Token usage
- API cost
- Kinerja per agent
- Kinerja per departemen
- Approval pending

Tampilkan data nyata dari database.
Gunakan chart modern dan pembaruan real-time.


## 16. DATABASE DAN KEAMANAN
Buat skema yang dinormalisasi untuk:
- users
- organizations
- worlds
- buildings
- floors
- rooms
- placed_objects
- agent_profiles
- agent_configs
- agent_positions
- agent_schedules
- teams
- tasks
- subtasks
- task_dependencies
- task_events
- agent_runs
- tool_calls
- meetings
- meeting_messages
- approvals
- artifacts
- knowledge_sources
- provider_connections
- usage_records
- activity_logs
- world_settings

Implementasikan:
- Authentication
- RLS dan isolasi data per pengguna/organisasi
- Validasi input
- Backend-only secrets
- Enkripsi credentials
- Permission-based tool execution
- Sandbox untuk eksekusi kode
- Rate limiting
- API budget limits
- Logging
- Audit trail
- Error recovery
- Retry yang aman dan tidak menggandakan aksi
- Approval sebelum tindakan sensitif, publikasi, penghapusan atau pengiriman eksternal


## 17. OPTIMASI PERFORMA 3D
Target dukungan:
- 3 agent
- 10 agent
- 40 agent
- 80 agent
- 100 agent
- Arsitektur yang dapat diperluas untuk jumlah lebih besar

Gunakan:
- InstancedMesh untuk objek yang berulang
- LOD untuk karakter dan bangunan
- Frustum culling
- Object pooling
- Batched rendering
- Shared geometry/material
- Efficient animation updates
- Adaptive pixel ratio
- Optimized shadows
- Asset compression
- Lazy loading per area
- On-demand data loading
- Pembatasan jumlah update AI status dan simulasi

Karakter jauh boleh menggunakan animasi lebih ringan dan pembaruan pergerakan lebih jarang.

Jangan membuka semua interior gedung sekaligus jika membebani GPU.

Sediakan quality setting Low / Medium / High / Auto.


## 18. AUDIO, NOTIFIKASI, DAN IMMERSION
Tambahkan:
- Ambience kantor
- Suara langkah kaki
- Suara aktivitas kota
- Suara air dan taman
- Notification sound
- Meeting notification
- Task complete notification
- Weather sound

Semua audio opsional dengan mute global.
Hindari audio autoplay yang mengganggu pengguna.


## 19. ALUR PENGGUNA PERTAMA
Pengguna baru:

1. Membuat akun.

2. Memilih nama dunia/perusahaan.

3. Memilih template kawasan.

4. Masuk ke dunia virtual 3D.

5. Mendapatkan kampus awal siap pakai.

6. Membuat agent pertama.

7. Menghubungkan provider AI.

8. Menentukan tugas.

9. Melihat karakter berjalan ke meja dan bekerja.

10. Melihat status pekerjaan nyata.

11. Membuka hasil pekerjaan.

12. Menambah agent atau bangunan.

Sediakan onboarding yang ringkas, jelas, dan dapat dilewati.


## 20. TAHAP IMPLEMENTASI WAJIB
FASE 1: CORE 3D WORLD
Bangun world scene, kamera, bangunan dasar, interior satu lantai yang detail, beberapa avatar, navigasi karakter, waktu dunia, pencahayaan, serta UI dasar.

FASE 2: WORLD EXPANSION
Tambahkan lantai dan ruangan lengkap, area sosial, rekreasi, kolam, lapangan bola, dan lingkungan luar. Lengkapi animasi dan interaksi.

FASE 3: AGENT ENGINE
Bangun database, autentikasi, konfigurasi provider, live agent execution, task management, event stream, artifacts, dan log.

FASE 4: REAL-TIME VISUAL CONNECTION
Hubungkan status kerja AI dengan gerakan serta aktivitas karakter. Bangun meeting dan kolaborasi antaragent.

FASE 5: LIFE SIMULATION
Sediakan siklus aktivitas karakter, jadwal, animasi leisure, olahraga, dan interaksi sosial.

FASE 6: WORLD EDITOR
Bangun editor gedung, ruangan, furnitur, penyimpanan tata letak, dan validasi navigasi.

FASE 7: PERFORMANCE, SECURITY, QA
Uji login, database, agent execution, tool permission, API failure, penggunaan biaya, rendering, mobile, dan jumlah agent bertingkat.

Jangan mengorbankan fungsi dasar demi menambahkan terlalu banyak fitur dekoratif lebih awal.


## 21. PERSYARATAN PENGUJIAN
Lakukan pengujian nyata:
- Build project dan typecheck
- Pengujian navigasi kamera
- Pengujian pergantian lantai
- Pengujian collision dan pathfinding
- Pengujian animasi
- Pengujian penyimpanan world
- Pengujian API model dengan credentials yang tersedia
- Pengujian event pekerjaan
- Pengujian task gagal / timeout
- Pengujian retry dan cancel
- Pengujian meeting agent
- Pengujian database dan RLS
- Pengujian desktop dan mobile
- Pengujian performa 3, 10, 40, 80, 100 agent
- Pengujian FPS, memori, dan loading
- Pengujian hasil artefak benar-benar dibuat

Laporkan PASS, FAIL atau NOT TESTED secara jujur untuk setiap fitur.
Jangan menyebut fitur selesai apabila hanya berupa tampilan atau mock.
Jangan mengarang hasil benchmark dan pengujian.


## 22. ATURAN KUALITAS IMPLEMENTASI
- Tulis kode yang benar-benar berjalan.
- Gunakan struktur folder profesional dan modular.
- Pisahkan game world engine, simulation engine, UI, agent orchestrator, dan persistence layer.
- Jangan membuat seluruh kode dalam satu file besar.
- Gunakan reusable components.
- Gunakan TypeScript typing yang rapi.
- Hindari placeholder yang mengaku sebagai fungsi jadi.
- Buat error boundary dan loading states.
- Pastikan tidak ada tombol dekoratif tanpa fungsi yang jelas.
- Gunakan state yang tersinkron antara backend dan 3D scene.
- Buat dokumentasi konfigurasi, .env.example, migrasi database, seed demo, dan petunjuk menjalankan aplikasi.
- Untuk fitur yang belum selesai, dokumentasikan sebagai backlog dan tampilkan status secara transparan.


## 23. OUTPUT YANG HARUS DIHASILKAN
Hasil akhir:

1. Source code lengkap.

2. Aplikasi web 3D yang dapat dijalankan.

3. Dunia virtual awal dengan bangunan dan ruangan detail.

4. Avatar dengan animasi dan navigasi.

5. Sistem pengelolaan AI Agent.

6. Integrasi model AI dan task execution.

7. Database dan migrasi.

8. Agent monitoring dan activity logs.

9. UI desktop dan mobile.

10. Dokumentasi setup.

11. Test report yang jujur.

12. Daftar fitur yang sudah berfungsi dan yang belum.


## MULAI PEKERJAAN
Pertama, jelaskan arsitektur teknis, scene graph, struktur folder, struktur database, daftar aset 3D, dan roadmap fase pengerjaan secara singkat.

Setelah itu langsung implementasikan FASE 1 dengan kode nyata.

Prioritaskan sebuah dunia 3D premium yang dapat dijelajahi, satu gedung kantor lengkap dengan beberapa ruangan detail, 10 avatar animasi, kamera interaktif, panel agent, dan sistem state yang siap dihubungkan ke backend.

Jangan berhenti hanya pada penjelasan atau desain visual. Lanjutkan ke implementasi, build, uji, dan perbaikan sesuai kemampuan lingkungan development.

Tujuan akhir: menciptakan sebuah dunia AI Agent virtual 3D yang hidup, menarik dilihat, dapat dikelola seperti game simulasi, tetapi memiliki sistem agent AI sungguhan yang dapat menyelesaikan tugas dan menghasilkan pekerjaan nyata.

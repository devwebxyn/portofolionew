import { Chapter, NextChapter } from "@/components/bare/Exhibit";
import { Essay, Index, Note, sources } from "@/components/exhibition/Editorial";
import type { BoardName } from "@/components/exhibition/Machines";
import { BusScene } from "@/components/exhibition/BusScene";
import { FirmwareFlow } from "@/components/exhibition/FirmwareFlow";
import { Sequence, type Step } from "@/components/exhibition/Sequence";
import { Render } from "@/components/exhibition/Render";
import { pageMetadata } from "@/lib/site";

export const metadata=pageMetadata("/embedded","Embedded systems dan firmware","Eksplorasi ESP32, ESP32-S3, Raspberry Pi, Pico, Orange Pi, komunikasi periferal, dan alur firmware.");

const boards:[BoardName,string,string,string][]=[
  ["esp","ESP32","Modul dengan antena, header GPIO, catu, regulator, serta jembatan USB–UART pada contoh development board.","Saya tertarik bagaimana firmware bertukar data dengan sensor lewat bus, lalu dapat meneruskan hasil melalui Wi-Fi atau Bluetooth. Header pada gambar bersifat konseptual."],
  ["s3","ESP32-S3","Contoh board keluarga ESP32-S3 dengan dua konektor terpisah untuk USB native dan USB–UART, modul RF, LED, dan header periferal.","Fungsi USB dan jalur debugging bergantung board, chip, dan konfigurasinya. Perhatikan label konektor sebelum memilih jalur pemrograman."],
  ["pi","Raspberry Pi","SBC untuk Linux. Port, SoC, RAM, GPIO, dan media penyimpanan diperlihatkan sebagai peran arsitektural.","Firmware awal menemukan media boot dan meneruskan pekerjaan ke kernel. Antarmuka, detail boot, dan posisi komponen bervariasi antarmodel."],
  ["pico","Raspberry Pi Pico","Papan seri Pico generasi pertama dengan RP2040, flash eksternal, USB, dan pin GPIO di sisi papan.","PIO pada RP2040 menjalankan state machine untuk mengatur pola I/O. BOOTSEL menggunakan boot ROM dan mendukung pemuatan UF2 melalui USB."],
  ["orange","Orange Pi","Ilustrasi SBC keluarga Orange Pi yang memperlihatkan SoC, RAM, contoh media eMMC, dan penghubung daya serta jaringan.","Komponen gambar menunjukkan peran, tanpa menentukan model atau spesifikasi tertentu. Dukungan boot dan distribusi Linux bergantung pada papan yang dipilih."],
];
const protocols:Step[]=[
  {label:"UART",text:"Jalur TX dan RX berjalan tanpa clock bersama. Kedua perangkat perlu sepakat pada baud rate dan format frame.",art:<BusScene index={0}/>},
  {label:"SPI",text:"Clock dan chip-select membantu menentukan transaksi, dengan jalur data ke dan dari periferal. Pemilihan tepi clock dan kondisi diam mengikuti mode.",art:<BusScene index={1}/>},
  {label:"I²C",text:"SDA membawa data, SCL memberi timing. Bus memakai pull-up dan alamat perangkat; penerima dapat memberi ACK pada slot tertentu.",art:<BusScene index={2}/>},
  {label:"GPIO",text:"Pin digital menerima atau mengeluarkan level logika. Arah pin dan keadaan input mengambang perlu diperhatikan.",art:<BusScene index={3}/>},
  {label:"PWM",text:"Frekuensi dan duty cycle memberi pola nyala dan mati. Beban dan rangkaian pendukung menentukan bagaimana pulsa diterjemahkan menjadi efek nyata.",art:<BusScene index={4}/>},
  {label:"Interrupt",text:"Peristiwa perangkat dapat meminta perhatian CPU. Handler sebaiknya melakukan pekerjaan yang sesuai tenggat dan menyerahkan pekerjaan lanjutan bila perlu.",art:<BusScene index={5}/>},
  {label:"Timer",text:"Pencacah berbasis clock menyediakan peristiwa periodik, perbandingan waktu, atau penangkapan waktu saat tepi sinyal tiba.",art:<BusScene index={6}/>},
  {label:"ADC",text:"ADC mengambil sampel tegangan dan mengubahnya ke bilangan sesuai resolusi dan tegangan referensi. Garis digital adalah ilustrasi keluaran terkuantisasi.",art:<BusScene index={7}/>},
  {label:"Sinyal digital",text:"Level tegangan merepresentasikan simbol, dengan ambang, waktu naik, dan waktu turun yang bergantung rangkaian.",art:<BusScene index={8}/>},
];
const firmware:[string,string,string,string,string?][]=[
  ["Kode sumber","Perilaku program dinyatakan dalam fungsi dan akses periferal. Contoh jalur umum berikut menggunakan C/C++.","SUMBER","TOOLCHAIN","while (1) { poll(); }"],
  ["Preprocessing","Untuk C/C++, preprocessor menangani include, macro, dan kompilasi bersyarat. Rust memiliki pipeline ekspansi serta kompilasi sendiri.","HEADER","UNIT C"],
  ["Kompilasi","Compiler menerjemahkan representasi program ke operasi yang cocok untuk target. Optimisasi dapat mengubah rangkaian instruksi.","UNIT C","INSTRUKSI","TARGET DAN ABI"],
  ["Assembly","Assembler mengodekan instruksi mesin dan menghasilkan object file berisi section, simbol, serta relokasi.","ASSEMBLY","OBJEK"],
  ["Linking","Linker menggabungkan object dan pustaka. Linker script pada banyak target membantu menempatkan kode dan data ke wilayah memori yang ditentukan.","OBJEK","LINKER"],
  ["ELF","ELF dapat menyimpan segment, entry point, simbol, dan informasi debug. Alat pemrogram atau debugger dapat memakai bagian yang dibutuhkan.","LINKER","ELF"],
  ["HEX / BIN / UF2","Toolchain dapat menghasilkan HEX dengan alamat, BIN mentah, atau format kemasan seperti UF2. Bentuk file mengikuti alat dan target.","ELF","CITRA"],
  ["Flashing","Programmer mengirim citra melalui jalur yang didukung, misalnya USB atau UART lewat bootloader, atau SWD dan JTAG untuk target tertentu.","HOST","FLASH","USB / UART / SWD / JTAG"],
  ["Reset dan bootloader","Saat reset, perangkat mulai lewat mekanisme yang spesifik target, misalnya boot ROM atau reset vector. Startup menyiapkan stack dan data RAM sesuai kebutuhan sebelum kode utama.","RESET","STARTUP"],
  ["Firmware berjalan","Aplikasi menginisialisasi periferal, menjalankan loop atau tugas RTOS, dan menangani interrupt. Program dapat berjalan dari flash atau lokasi lain sesuai arsitektur.","STARTUP","GPIO / IRQ"],
];

export default function Embedded(){
 return <>
  <section className="world-hero embedded-hero"><div className="frame page-top"><Chapter id="EMBEDDED" label="Papan pengembangan dan firmware"/>
    <div className="world-split"><header className="world-title entrance"><h1>Kode yang <em>menyentuh pin.</em></h1><p className="lead">Sebuah program dapat hidup di perangkat kecil yang mengukur, mengatur waktu, dan mengirim sinyal. Di sini saya mengikuti jalurnya, dari file sumber hingga GPIO.</p></header><Render name="s3" alt="Ilustrasi ESP32-S3 dengan modul radio dan dua konektor USB" priority/></div>
    <Index items={[["papan","Papan pengembangan"],["bus","Sinyal dan periferal"],["firmware","Jalur firmware"]]}/>
  </div></section>
  <Essay id="papan" number="01" title="Komputer dalam sebuah papan">
    <h2>Memilih batas <em>sebuah sistem.</em></h2><div><p>Mikrokontroler menyatukan inti CPU, memori, dan periferal yang dapat dikendalikan dekat perangkat fisik. Kendali sederhana bisa berjalan dengan loop, sementara tugas dengan banyak tenggat dapat mengandalkan RTOS. Komputer papan tunggal biasanya punya SoC, RAM, media penyimpanan, dan antarmuka lebih lengkap untuk menjalankan sistem operasi seperti Linux.</p><p>Saya tertarik pada kedua pendekatan. Di mikrokontroler, perubahan satu register dapat terlihat sebagai perubahan level pin. Di SBC, perangkat yang serupa mungkin diakses melalui driver, lalu dibaca oleh proses userspace. Tegangan dan timing tetap nyata, tetapi tempat menanganinya berbeda.</p><p>Lima papan di bawah mewakili keluarga perangkat yang saya minati. Render generatif menunjukkan bentuk dan susunan komponen secara konseptual. Untuk merancang sambungan sungguhan, pinout serta revisi papan perlu diperiksa pada dokumentasi perangkat.</p></div>
  </Essay>
  <section className="frame"><Sequence label="Papan pengembangan" steps={boards.map(([board,label,text,detail])=>({label,text,detail,art:<Render name={board} alt={`Ilustrasi konseptual papan ${label}`}/> }))}/><p className="reference">Dokumentasi perangkat <a href={sources.esp}>ESP32 DevKitC</a>, <a href={sources.espS3}>ESP32-S3 DevKitC</a>, dan <a href={sources.pico}>Raspberry Pi Pico</a>.</p></section>
  <section className="section frame" id="bus"><Chapter id="02" label="Waktu, data, dan arah sinyal"/><div className="section-heading"><h2>Membaca <em>percakapan di jalur.</em></h2><p className="lead">Satu sinyal dapat memberi level, menandai waktu, atau membawa bagian dari sebuah pesan. Pilih antarmuka dan bandingkan tanggung jawabnya.</p></div><Sequence label="Komunikasi periferal" steps={protocols}/><p className="reference">Gelombang memperlihatkan konsep timing. Contoh timing disederhanakan. Rujukan <a href="https://www.nxp.com/docs/en/user-guide/UM10204.pdf">spesifikasi bus I²C NXP</a>.</p></section>
  <section className="section firmware-band" id="firmware"><div className="frame"><Chapter id="03" label="Dari sumber ke eksekusi"/><div className="section-heading"><h2>Bagaimana kode <em>sampai ke flash.</em></h2><p className="lead">Langkah C/C++ ini membantu saya memisahkan keputusan compiler, tata letak memori, dan proses memasukkan citra ke perangkat.</p></div>
    <Sequence label="Rantai toolchain" steps={firmware.map(([label,text,from,to,code],i)=>({label,text,art:<FirmwareFlow stage={i}/>, detail:`${from} → ${to}${code ? ` · ${code}` : ""}` }))}/>
    <Note label="Kapan flashing berbeda dari fabrikasi?"><p>Fabrikasi membentuk rangkaian fisik chip, sementara flashing menulis data ke memori nonvolatile pada target yang mendukungnya. Firmware, program boot, isi flash, RAM, ISA, dan reset sangat bergantung pada keluarga perangkat. Citra dapat diprogram setelah pemasangan pada PCB jika rancangan sistem mendukungnya.</p></Note>
    <Note label="Apa yang terjadi setelah startup?"><p>Startup sering menyalin data berinisialisasi ke RAM dan mengosongkan area BSS sebelum menjalankan kode C. Setelah inisialisasi periferal, handler interrupt dapat merespons peristiwa perangkat. Bentuk tepatnya bergantung pada target dan runtime.</p></Note>
  </div></section>
  <NextChapter href="/systems" title="Saat perangkat dan kernel bertemu.">Masuk ke sistem komputer</NextChapter>
 </>;
}

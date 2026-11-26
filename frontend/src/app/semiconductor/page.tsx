import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Render } from "@/components/exhibition/Render";
import { Essay, Index, Note, sources } from "@/components/exhibition/Editorial";
import { CrystalArt, TransistorCutaway } from "@/components/exhibition/Machines";
import { CrossSection, Floorplan, GateNet, SignalDiagram, TestStation } from "@/components/exhibition/Diagrams";
import { Sequence, type Step } from "@/components/exhibition/Sequence";
import { pageMetadata } from "@/lib/site";

export const metadata=pageMetadata("/semiconductor","Silikon dan fabrikasi chip","Dari arsitektur, Verilog, dan physical design hingga wafer, fabrikasi, packaging, dan pengujian chip.");

const manufacturing:Step[]=[
  {label:"Arsitektur dan spesifikasi",text:"Pekerjaan dimulai dari tugas yang ingin dijalankan chip, batas daya, kebutuhan memori, dan antarmuka. Untuk prosesor, spesifikasi instruksi membentuk kontrak yang dapat dipakai perangkat lunak.",art:<Floorplan/>},
  {label:"Desain RTL",text:"Register-transfer level menggambarkan perpindahan data antarregister dan logika kombinasional di antaranya. Verilog adalah HDL yang dapat menyatakan struktur serta perilaku itu.",art:<div className="process-panel"><h4>Satu register pada tepi clock</h4><code>always @(posedge clk) q &lt;= d;</code><div className="process-chain"><span>D membawa nilai</span><span>Clock naik</span><span>Q menyimpan D</span></div></div>},
  {label:"Verifikasi fungsi",text:"Testbench memberi stimulus dan membandingkan respons rancangan dengan hasil yang diharapkan. Corner case seperti reset dan perubahan sinyal dekat batas waktu perlu dipertimbangkan.",art:<SignalDiagram labels={["CLK","D","Q"]}/>,detail:"Simulasi fungsional, pemeriksaan formal, dan analisis timing menjawab pertanyaan yang berbeda."},
  {label:"Sintesis logika",text:"Sintesis menerjemahkan subset RTL yang dapat disintesis menjadi jaringan gerbang atau sel dari pustaka teknologi. Hasilnya diperiksa terhadap fungsi dan batasan desain.",art:<GateNet/>},
  {label:"Desain fisik",text:"Floorplan membagi area untuk blok. Placement menempatkan sel, distribusi clock mengirim sinyal waktu, dan routing menghubungkan jaringan. Analisis timing memeriksa apakah data sampai tepat waktu.",art:<Floorplan routed/>,detail:"Fisik yang berubah dapat memengaruhi delay, area, daya, dan integritas sinyal. Tahap ini biasanya berulang."},
  {label:"Tape-out",text:"Setelah paket verifikasi dan pemeriksaan fisik diselesaikan untuk target proses, data layout diserahkan ke manufaktur. Data itu menjadi salah satu masukan persiapan pola untuk fabrikasi.",art:<TestStation mode="mask"/>},
  {label:"Wafer silikon",text:"Wafer yang disiapkan sebagai permukaan proses menampung pola banyak die. Pantulan pada ilustrasi memperlihatkan susunan berulang, tanpa menunjukkan dimensi proses tertentu.",art:<Render name="wafer" alt="Wafer silikon dengan pola die berulang"/>},
  {label:"Fabrikasi semikonduktor",text:"Pabrik membentuk perangkat dan interkoneksi melalui urutan pelapisan, pembentukan pola, serta pengolahan material berulang. Resep dan urutan bergantung pada layer dan teknologi.",detail:"Jelajahi penampang di bawah untuk melihat contoh fungsi proses, dari deposisi dan litografi hingga interkoneksi logam.",art:<CrossSection stage="exposure"/>},
  {label:"Pengujian wafer dan dicing",text:"Probe menghubungi pad untuk mengukur die di atas wafer. Pemetaan hasil membantu memilih die, lalu wafer dipisah dalam proses dicing.",art:<div className="twin-process"><TestStation mode="probe"/><TestStation mode="dicing"/></div>},
  {label:"Pengemasan",text:"Die dipasang pada kemasan dan dihubungkan ke terminal luar lewat metode seperti bonding atau flip-chip. Pada sebagian paket, jalur panas diteruskan melalui material termal ke penutup.",art:<PackageExploded/>},
  {label:"Pengujian akhir",text:"Setelah pengemasan, produk dapat menjalani uji fungsi, pengukuran karakteristik listrik, dan skrining mutu sesuai kebutuhan penggunaan.",art:<TestStation mode="final"/>},
  {label:"Integrasi",text:"Terminal kemasan menjadi antarmuka ke PCB. Pasokan daya, jalur sinyal, firmware, dan pendinginan menentukan bagaimana chip dipakai sebagai bagian dari perangkat.",art:<Render name="pcb-populated" alt="PCB dengan chip yang telah terpasang"/>},
];

function PackageExploded() {
  return <div className="package-plate"><Render name="chip" alt="Lapisan paket chip, die, substrat, dan kontak"/></div>;
}

const process:Step[]=[
  {label:"Persiapan wafer",text:"Silikon dibentuk menjadi wafer, dipoles, dan dibersihkan agar permukaannya cocok untuk pemrosesan.",art:<CrossSection stage="bare"/>},
  {label:"Deposisi film tipis",text:"Film dengan sifat yang diinginkan ditambahkan. Film dapat berfungsi sebagai konduktor, isolator, atau bagian dari proses pembentukan pola.",art:<CrossSection stage="film"/>},
  {label:"Pelapisan photoresist",text:"Lapisan peka cahaya melapisi permukaan sebelum proses pemaparan.",art:<CrossSection stage="resist"/>},
  {label:"Fotolitografi",text:"Pola diproyeksikan ke resist. Pengembangan resist menghasilkan area terbuka dan tertutup untuk tahap berikutnya.",art:<CrossSection stage="exposure"/>},
  {label:"Etching",text:"Material terpilih diangkat melalui proses kimia atau plasma, mengubah permukaan film menjadi pola.",art:<CrossSection stage="etch"/>},
  {label:"Implantasi ion",text:"Ion dapat dimasukkan ke wilayah yang ditentukan untuk mengubah sifat listrik semikonduktor. Langkah ini bukan bagian dari setiap lapisan.",art:<CrossSection stage="implant"/>},
  {label:"Pembersihan",text:"Residu dan partikel dikurangi di berbagai titik proses. Kimia dan prosedur disesuaikan dengan lapisan yang sedang dikerjakan.",art:<CrossSection stage="clean"/>},
  {label:"Planarisasi (CMP)",text:"Ketika diperlukan, pemolesan kimia dan mekanis meratakan permukaan sebelum struktur berikutnya dibangun.",art:<CrossSection stage="cmp"/>},
  {label:"Interkoneksi logam",text:"Jalur dan via logam menyalurkan data, clock, serta daya. Sejumlah siklus berulang membentuk jaringan interkoneksi, terpisah dari pembentukan transistor.",art:<CrossSection stage="metal"/>},
];

export default function Semiconductor(){
  return <>
    <section className="world-hero silicon-hero">
      <div className="frame page-top"><Chapter id="SILIKON" label="Semikonduktor dan desain chip"/>
        <header className="world-title entrance"><h1>Dari silikon ke <em>sebuah instruksi.</em></h1><p className="lead">Ketika membaca satu instruksi, saya baru melihat permukaannya. Di bawahnya ada keputusan arsitektur, pola kecil yang ditanam pada wafer, serta rangkaian yang bekerja bersama.</p></header>
        <Scene art={<Render name="wafer" alt="Wafer silikon dengan pola die berulang"/>} label="Wafer dengan pola die" className="world-object silicon-object"/>
        <Index items={[["material","Material"],["alur-chip","12 tahap chip"],["fabrikasi","Fabrikasi"],["industri","Ekosistem industri"]]}/>
      </div>
    </section>
    <Essay id="material" number="01" title="Material dan logika">
      <h2>Bagaimana materi <em>menyimpan aturan.</em></h2>
      <div><p>Silikon menarik bagi saya karena cara muatan bergerak di dalam material dapat diatur. Struktur kristal, dopan, sambungan, dan medan listrik menjadi bagian dari cerita yang sama. Sebuah transistor memungkinkan kondisi pada terminal kontrol memengaruhi jalur arus. Susunan transistor dapat membangun gerbang, lalu register, unit aritmetika, dan blok lain yang bergerak bersama clock.</p><p>Ketika saya mempelajari Verilog, cara berpikirnya berubah. Yang saya tulis mendeskripsikan hubungan yang dapat berlangsung serentak di perangkat keras. Waktu tetap harus dikelola. Register menahan keadaan, sementara logika di antara register harus memberi hasil pada batas waktu yang sesuai.</p><Note label="Apa yang digambarkan oleh penampang transistor?"><p>Visual menyorot gate, isolator, source, drain, dan kanal secara konseptual. Bentuk, posisi, serta bahan dalam proses modern bisa sangat berbeda.</p></Note></div>
    </Essay>
    <div className="frame twin-scenes"><Scene art={<CrystalArt/>} label="Kisi dan pembawa muatan"/><Scene art={<TransistorCutaway/>} label="Gate dan kanal"/></div>
    <section className="frame section" id="alur-chip"><Chapter id="02" label="Dari spesifikasi ke papan"/><Sequence label="Perjalanan chip" steps={manufacturing}/></section>
    <section className="section fab-band" id="fabrikasi"><div className="frame"><Chapter id="03" label="Di dalam fabrikasi"/><div className="section-heading"><h2>Membangun lapisan, <em>berulang kali.</em></h2><p className="lead">Urutan ini menunjukkan fungsi beberapa proses. Satu die dapat melewati banyak siklus; diagram tidak menentukan resep pabrik atau urutan universal.</p></div><Sequence label="Penampang proses" steps={process}/><p className="reference">Rujukan proses publik <a href={sources.fabrication}>ASML, cara mikrochip dibuat</a>.</p></div></section>
    <Essay id="industri" number="04" title="Pembagian kerja" tone="paper">
      <h2>Dari rancangan <em>ke industri.</em></h2>
      <div><p>Arsitektur mendefinisikan cara kerja yang ingin diwujudkan. Perusahaan fabless dapat merancang dan menjual chip dengan manufaktur yang dikerjakan mitra. Penyedia IP menawarkan blok desain yang dapat digunakan kembali, seperti pengendali antarmuka. Alat EDA membantu tim merancang, memeriksa, menyintesis, dan menyiapkan layout.</p><p>Foundry seperti TSMC berfokus pada proses manufaktur untuk produk pelanggan. Penyedia pengemasan dan pengujian dapat menangani tahap setelah pemrosesan wafer, dengan variasi pembagian peran dalam praktik. Pembuat produk kemudian menggabungkan chip dengan PCB, perangkat lunak, catu, dan mekanik untuk memenuhi kebutuhan pengguna.</p><p>Penyolderan membantu saya melihat tahap paling dekat dengan perangkat: orientasi, sambungan, dan panas. Pekerjaan di tingkat silikon berjalan pada skala dan proses berbeda. Keduanya mengajari saya untuk mengikuti jalur sinyal, memperhatikan material, dan mempertanyakan asal sebuah kegagalan.</p><a href={sources.foundry}>Rujukan industri TSMC tentang model foundry</a></div>
    </Essay>
    <NextChapter href="/embedded" title="Chip menjadi bagian dari sistem.">Lanjut ke firmware</NextChapter>
  </>;
}

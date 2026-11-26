import type { ReactNode } from "react";

const exhibits = [
  {
    input: "Gangguan jaringan sementara",
    output: "Tujuan yang bisa diamati",
    summary: "Diagram bercabang dari permintaan proyek ke respons 503, lalu ke pilihan mencoba ulang.",
    art: <div className="flow-map">
      <div className="flow-node">Buka arsip</div>
      <div className="flow-node">Minta data</div>
      <div className="flow-branch"><div className="flow-node good">200 · Tampilkan</div><div className="flow-node bad">503 · Tawarkan ulang</div></div>
    </div>,
  },
  {
    input: "Tujuan dan batasan",
    output: "Kriteria penerimaan",
    summary: "Lapisan konteks, aturan, dan kriteria penerimaan bertumpuk menjadi instruksi.",
    art: <div className="flow-stack">
      <div><b>KONTEKS</b> Arsip mengambil proyek dari API</div>
      <div><b>BATASAN</b> Jangan isi kegagalan dengan proyek rekaan</div>
      <div><b>KRITERIA</b> Tombol meminta data lagi setelah 503</div>
    </div>,
  },
  {
    input: "Kriteria dan kode awal",
    output: "Usulan perubahan",
    summary: "Lembaran diff membandingkan kode awal dan kode usulan untuk mencoba ulang permintaan.",
    art: <div className="flow-diff">
      <div><b>SEBELUM</b><code>if (error)</code><code className="bad">− return pesan;</code></div>
      <div><b>USULAN</b><code>if (error)</code><code className="good">+ return retryButton(reload);</code></div>
    </div>,
  },
  {
    input: "Usulan dan skenario uji",
    output: "Hasil pengamatan",
    summary: "Skenario pertama pulih setelah respons 503. Skenario kedua menemukan cacat berupa dua permintaan yang berjalan bersamaan.",
    art: <div className="flow-runs">
      <div><b>PEMULIHAN</b><div className="run-track"><span>503</span><span>Coba lagi</span><span>200</span></div><span className="good">LULUS · daftar tampil</span></div>
      <div><b>KLIK GANDA</b><div className="run-track"><span>503</span><span>Dua klik</span><span>GET + GET</span></div><span className="bad">GAGAL · dua permintaan</span></div>
    </div>,
  },
  {
    input: "Hasil yang lulus dan gagal",
    output: "Keputusan dengan alasan",
    summary: "Bukti keberhasilan menuju jalur diterima, sedangkan permintaan ganda menuju jalur perbaikan.",
    art: <div className="flow-review">
      <div className="review-evidence">BUKTI UJI</div>
      <div className="review-keep good"><b>PERTAHANKAN</b><span>Pemulihan setelah 503</span></div>
      <div className="review-fix bad"><b>PERBAIKI</b><span>Permintaan ganda</span></div>
    </div>,
  },
  {
    input: "Temuan permintaan ganda",
    output: "Instruksi revisi dan uji ulang",
    summary: "Temuan menjadi aturan menonaktifkan tombol saat permintaan berjalan, lalu kembali ke skenario klik ganda.",
    art: <div className="flow-loop">
      <svg viewBox="0 0 410 190" aria-hidden="true"><path d="M85 55H314q65 0 65 44t-65 44H85q-55 0-55-44t55-44Z"/><path className="loop-signal" pathLength="1" d="M85 55H314q65 0 65 44t-65 44H85q-55 0-55-44t55-44Z"/></svg>
      <div><b>TEMUAN</b><span>Permintaan ganda</span></div>
      <div><b>REVISI</b><span>Kunci tombol saat memuat</span></div>
      <div><b>UJI ULANG</b><span>Dua klik → satu permintaan</span></div>
    </div>,
  },
];

export function WorkflowVolume({children, variant, summary}: {
  children: ReactNode;
  variant: string;
  summary: string;
}) {
  return <div className="volume-stage" data-variant={variant} role="img" aria-label={summary}>
    <div className="volume-world" aria-hidden="true">{children}</div>
  </div>;
}

export function Workflow({ active }: { active: number }) {
  const scene = exhibits[active];
  return <figure className="workflow-viz">
    <WorkflowVolume variant={["map", "stack", "diff", "runs", "review", "loop"][active]} summary={scene.summary}>{scene.art}</WorkflowVolume>
    <figcaption><span><b>Masuk</b> {scene.input}</span><span><b>Keluar</b> {scene.output}</span></figcaption>
  </figure>;
}

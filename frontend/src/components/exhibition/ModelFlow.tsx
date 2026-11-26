import { WorkflowVolume } from "./Workflow";

const scenes = [
  {
    kind: "samples", summary: "Foto ubin diberi label utuh atau cacat.",
    art: <div className="model-samples">{["Ubin A · utuh", "Ubin B · cacat", "Ubin C · utuh"].map((label, index) =>
      <div key={label}><div className="sample-tiles" data-sample={index}/><span>{label}</span></div>
    )}</div>,
  },
  {
    kind: "pixels", summary: "Contoh normalisasi membagi intensitas piksel dengan 255 sebelum pembentukan tensor.",
    art: <div className="firmware-image"><div><b>PIKSEL U8</b><code>0 · 128 · 255</code></div><div><b>NILAI TENSOR</b><code>0 · 0,50 · 1</code></div></div>,
  },
  {
    kind: "features", summary: "Contoh model klasifikasi. Filter merespons pola tepi, fitur diringkas, lalu model menghasilkan skor untuk kelas cacat.",
    art: <div className="model-features"><div><b>CITRA</b><div className="sample-tiles" data-sample="1"/></div><div><b>FITUR TEPI</b><div className="model-edge"/></div><div><b>SKOR CACAT</b><code>0,78</code></div></div>,
  },
  {
    kind: "gradient", summary: "Training membandingkan skor dengan label. Loss digunakan untuk menghitung gradien dan memperbarui bobot.",
    art: <div className="model-gradient"><div className="model-well"><svg viewBox="0 0 400 95"><path d="M12 9Q200 155 388 9"/><circle cx="166" cy="78" r="7"/></svg></div><b>Prediksi + label → loss → gradien</b><code>w berikutnya = w − η∇L</code></div>,
  },
  {
    kind: "scores", summary: "Evaluasi memakai data uji terpisah. Pada contoh ini model melewatkan cacat pada sampel B.",
    art: <div className="flow-runs"><div><b>Ubin A · label utuh</b><span className="good">Prediksi utuh · benar</span></div><div><b>Ubin B · label cacat</b><span className="bad">Prediksi utuh · terlewat</span></div></div>,
  },
  {
    kind: "inference", summary: "Saat inferensi, citra baru diproses dengan bobot tetap. Skor contoh 0,78 melampaui ambang ilustratif 0,50.",
    art: <div className="model-inference"><b>Citra baru → model dengan bobot tetap</b><div className="model-meter"><i/><span/></div><b>0,78 ≥ 0,50 → kelas cacat</b></div>,
  },
];

export function ModelFlow({ stage }: { stage: number }) {
  const scene = scenes[stage];
  return <WorkflowVolume variant={scene.kind} summary={scene.summary}>
    {scene.art}
    <p className="volume-caption">{scene.summary}</p>
  </WorkflowVolume>;
}

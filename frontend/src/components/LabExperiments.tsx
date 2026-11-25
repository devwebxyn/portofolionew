"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BoardDiagram, ChipDiagram } from "./Visuals";

const boardSteps = [
  { title: "Solder SMD", text: "Memasang komponen pada pad di permukaan PCB. Saya memperhatikan posisi dan orientasi komponen, lalu memeriksa kualitas sambungan solder." },
  { title: "Solder THT", text: "Memasang kaki komponen melalui lubang pada PCB dan menyoldernya dari sisi lain. Posisi komponen dan hasil sambungan saya periksa kembali setelah pemasangan." },
  { title: "Desain dan perakitan", text: "Menempatkan komponen, menata jalur pada PCB, dan merakit papan. Saya memperhatikan bagaimana tata letak memengaruhi kemudahan pemasangan dan pemeriksaan." },
  { title: "Diagnosis rangkaian", text: "Menelusuri sumber gangguan mulai dari gejala yang terlihat. Saya memeriksa sambungan, penempatan komponen, dan bagian rangkaian yang berkaitan dengan gejala tersebut." },
];

const chipSteps = [
  { title: "Aplikasi", text: "Saya ingin memahami bagaimana program meminta akses ke berkas, jaringan, atau memori ketika dijalankan." },
  { title: "Sistem operasi", text: "Saya mempelajari peran Linux dan sistem operasi dalam mengelola proses serta mempertemukan program dengan sumber daya komputer." },
  { title: "Memori", text: "Saya menelusuri bagaimana program melihat ruang alamat dan bagaimana sistem menangani akses ke memori." },
  { title: "Perangkat keras", text: "Saya mengeksplorasi arsitektur komputer, mikrokontroler, dan bagaimana firmware menjadi penghubung antara instruksi dan komponen." },
];

const workflow = [
  { title: "Merumuskan ide", text: "Saya mulai dari hal yang ingin saya buat atau pahami. Saya menentukan tujuan dan memilih bagian terkecil yang bisa dicoba." },
  { title: "Memberi arah ke AI", text: "Saya menjelaskan konteks, batasan, dan seperti apa hasil yang saya harapkan. Untuk proyek yang sudah berjalan, saya meminta agen memahami kode dan alurnya lebih dulu." },
  { title: "Membuat perangkat lunak", text: "Agen membantu mengubah arahan menjadi kode. Saya meninjau perubahan, meminta penjelasan saat ada bagian yang belum saya pahami, dan menyesuaikan arah saat diperlukan." },
  { title: "Menjalankan di sistem", text: "Saya menjalankan hasilnya dan memeriksa perilaku yang bisa diamati. Pesan galat dan hasil pengujian membantu saya menentukan bagian yang perlu diperbaiki." },
  { title: "Meninjau hasil", text: "Saya membandingkan hasil dengan tujuan awal. Untuk proyek yang melibatkan perangkat keras, saya juga memeriksa bagaimana perangkat lunak berinteraksi dengan komponen yang dipakai." },
];

export function LabDiagram({ kind }: { kind: "board" | "chip" }) {
  const [active, setActive] = useState(0);
  const isBoard = kind === "board";
  const steps = isBoard ? boardSteps : chipSteps;
  return <div className="lab-diagram">
    <figure className="diagram-stage">
      {isBoard ? <BoardDiagram active={active} /> : <ChipDiagram active={active} />}
      <figcaption>{isBoard ? "Ilustrasi konseptual PCB" : "Ilustrasi konseptual lapisan komputasi"}</figcaption>
    </figure>
    <div className="diagram-controls">
      <div role="group" aria-label={isBoard ? "Pilih area kerja" : "Pilih lapisan"} className="diagram-options">
        {steps.map(({ title }, i) => <button key={title} type="button" aria-pressed={i === active} aria-controls="diagram-description" onClick={() => setActive(i)}><span>{i + 1}.</span>{title}<ArrowRight size={16} aria-hidden /></button>)}
      </div>
      <p className="diagram-description" id="diagram-description" aria-live="polite">{steps[active].text}</p>
    </div>
  </div>;
}

export function MemoryDemo() {
  const [active, setActive] = useState(0);
  const address = (i: number) => `0x${(i * 16).toString(16).padStart(2, "0").toUpperCase()}`;
  return <div className="memory-demo">
    <p className="eyebrow">Model konseptual memori</p>
    <div className="memory-slots" role="group" aria-label="Pilih blok memori">
      {Array.from({ length: 8 }, (_, i) => <button key={i} type="button" aria-pressed={active === i} aria-label={`Blok ${address(i)}`}
        onClick={() => setActive(i)}>{address(i)}</button>)}
    </div>
    <p aria-live="polite">Blok pilihan mencakup alamat <code>{address(active)}</code> sampai <code>{`0x${(active * 16 + 15).toString(16).padStart(2, "0").toUpperCase()}`}</code>.</p>
  </div>;
}

export function Workflow() {
  const [active, setActive] = useState(0);
  const steps = ["Ide", "AI", "Perangkat lunak", "Sistem", "Hasil"];
  return <div className="workflow">
    <ol className="workflow-steps" aria-label="Tahap kerja">
      {steps.map((step, i) => <li key={step}><button type="button" aria-pressed={i === active} aria-controls="workflow-description" onClick={() => setActive(i)}><span aria-hidden="true">0{i + 1}</span> {step}</button></li>)}
    </ol>
    <div className="workflow-progress" aria-hidden="true"><div style={{ width: `${(active + 1) * 20}%` }} /></div>
    <div className="workflow-content" id="workflow-description" aria-live="polite">
      <p className="workflow-index" aria-hidden="true">0{active + 1}</p>
      <div key={active} className="entrance"><h3>{workflow[active].title}</h3><p>{workflow[active].text}</p></div>
    </div>
  </div>;
}

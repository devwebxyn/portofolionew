import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Chapter } from "@/components/bare/Exhibit";

const hyper = "https://github.com/samuelindra123/xynoos-hypercore";
const cyber = "https://github.com/samuelindra123/xynoos-cyber-model";

function HyperCoreDiagram() {
  return <figure className="research-diagram hyper-diagram">
    <div className="hyper-sources"><span>CPU</span><span>Memori</span><span>I/O</span></div>
    <div className="hyper-probe"><b>PressureIQ</b><span>Observasi Linux</span></div>
    <div className="hyper-split"><span>Snapshot telemetri</span><span>Simulasi kebijakan</span></div>
    <figcaption>Sinyal sistem dikumpulkan untuk membandingkan keputusan dan biaya pengelolaan sumber daya.</figcaption>
  </figure>;
}

function CyberModelDiagram() {
  return <figure className="research-diagram cyber-diagram">
    <div className="tensor-input"><span>Token</span><i/><i/><i/><i/></div>
    <div className="tensor-block"><b>Transformer</b><span>Attention → SwiGLU</span></div>
    <div className="tensor-return"><span>Forward → logits</span><span>Backward ← gradien</span></div>
    <figcaption>Alur komputasi referensi dari token ke logits, dengan autograd untuk menghitung gradien.</figcaption>
  </figure>;
}

export function ResearchFocus() {
  return <section className="research-focus" aria-labelledby="research-focus">
    <Chapter id="RISET" label="Fokus rekayasa" />
    <div className="section-heading">
      <h2 id="research-focus">Linux dan model AI <em>dari lapisan dasar.</em></h2>
      <p className="lead">Dua repositori riset yang memperlihatkan cara saya menyusun sistem, menelusuri keputusan dan menguji asumsi.</p>
    </div>
    <article className="research-case research-linux" data-scene>
      <HyperCoreDiagram />
      <div className="research-copy">
        <p className="eyebrow">Sistem Linux · Rust</p>
        <h3>Xynoos HyperCore</h3>
        <p>Saya meneliti hubungan antara telemetri Linux, tekanan sumber daya, dan kebijakan pengelolaan memori. PressureIQ membaca sinyal sistem. Eksperimen terpisah memodelkan pilihan kebijakan dan mencatat konsekuensinya.</p>
        <p className="research-status">Pratinjau eksperimental. Peningkatan performa desktop secara menyeluruh belum terbukti lewat pengujian yang dapat direproduksi.</p>
        <div className="research-links">
          <a href={hyper}>Repo HyperCore <ArrowUpRight size={15} aria-hidden /></a>
          <a href={hyper + "/blob/main/docs/ARCHITECTURE.md"}>Dokumentasi arsitektur <ArrowUpRight size={15} aria-hidden /></a>
        </div>
      </div>
    </article>
    <article className="research-case research-model" data-scene>
      <CyberModelDiagram />
      <div className="research-copy">
        <p className="eyebrow">Rekayasa model · Rust</p>
        <h3>Xynoos Cyber Model</h3>
        <p>Saya membangun fondasi numerik untuk riset model bahasa dengan pendekatan CPU-first. Repo ini mencakup tokenizer, tensor, autograd, dan Transformer referensi dengan arsitektur decoder-only.</p>
        <p className="research-status">Riset tahap awal. Proyek ini belum merilis bobot model terlatih atau membuktikan kemampuan model pada tugas domain.</p>
        <div className="research-links">
          <a href={cyber}>Repo Cyber Model <ArrowUpRight size={15} aria-hidden /></a>
          <a href={cyber + "/blob/main/docs/ARCHITECTURE.md"}>Dokumentasi arsitektur <ArrowUpRight size={15} aria-hidden /></a>
        </div>
      </div>
    </article>
  </section>;
}

export function ResearchPreview() {
  return <aside className="research-preview">
    <div><p className="eyebrow">Repositori riset</p><h3>HyperCore dan Xynoos Cyber Model</h3><p>Telemetri Linux, eksperimen kebijakan memori, dan rekayasa model bahasa di CPU.</p></div>
    <Link href="/projects#research-focus" className="text-link">Lihat desain riset <ArrowUpRight size={16} aria-hidden /></Link>
  </aside>;
}

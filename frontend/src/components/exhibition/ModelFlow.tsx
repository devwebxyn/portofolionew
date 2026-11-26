const examples = ["Ubin A", "Ubin B", "Ubin C"];

export function ModelFlow({ stage }: { stage: number }) {
  if (stage === 0) {
    return <div className="process-panel">
      <h4>Sampel citra</h4>
      <div className="sample-strip">{examples.map((label, index) =>
        <div key={label}><div className="sample-tiles" data-sample={index}/><span>{label} · {index === 1 ? "cacat" : "utuh"}</span></div>
      )}</div>
      <p>Contoh tugas inspeksi permukaan dari citra.</p>
    </div>;
  }
  if (stage === 1) {
    return <div className="process-panel">
      <h4>Pisahkan sampel, lalu ubah piksel menjadi tensor</h4>
      <div className="process-chain"><span>Intensitas piksel</span><span>0, 128, 255</span><span>0 · 0,50 · 1</span></div>
      <p>Contoh normalisasi dengan membagi nilai piksel dengan 255.</p>
    </div>;
  }
  if (stage === 3) {
    return <div className="process-panel">
      <h4>Satu pembaruan parameter</h4>
      <div className="process-chain"><span>Prediksi + label</span><span>Hitung loss</span><span>Hitung gradien</span><span>Perbarui bobot</span></div>
      <code>w ← w − η∇L</code>
      <p>Contoh pembaruan lewat gradient descent.</p>
    </div>;
  }
  if (stage === 4) {
    return <div className="process-panel">
      <h4>Cocokkan prediksi dengan label uji</h4>
      <table><thead><tr><th>Sampel</th><th>Label</th><th>Prediksi</th></tr></thead><tbody>
        <tr><td>A</td><td>Utuh</td><td>Utuh</td></tr>
        <tr><td>B</td><td>Cacat</td><td>Utuh</td></tr>
      </tbody></table>
      <p>Pada contoh ini, model melewatkan cacat pada sampel B.</p>
    </div>;
  }
  return <div className="process-panel">
    <h4>Gunakan model pada citra baru</h4>
    <div className="process-chain"><span>Citra baru</span><span>Model dengan bobot tetap</span><span>Prediksi kelas</span></div>
    <p>Bobot digunakan kembali untuk setiap masukan.</p>
  </div>;
}

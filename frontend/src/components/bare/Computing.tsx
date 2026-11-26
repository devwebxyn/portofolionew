import type { CSSProperties } from "react";

const index = (n: number) => ({ "--i": n } as CSSProperties);

export const layers = [
  { label: "Aplikasi", value: "APP", title: "Dari kebutuhan ke operasi", text: "Aplikasi menyusun operasi yang bisa dipahami pengguna. Pustaka atau runtime dapat menerjemahkannya menjadi pekerjaan yang lebih dekat dengan sistem operasi." },
  { label: "Runtime", value: "RT", title: "Lingkungan yang menjalankan kode", text: "Sebagian program bergantung pada runtime untuk menjalankan kode dan mengelola sumber daya seperti alokasi memori." },
  { label: "Userspace", value: "USR", title: "Proses dan thread", text: "Proses memiliki ruang alamat virtual. Thread dalam satu proses dapat berbagi ruang alamat, sambil tetap mempunyai stack dan konteks eksekusi masing-masing." },
  { label: "Kernel", value: "SYS", title: "Pintu masuk melalui system call", text: "Program meminta layanan seperti membuka berkas melalui system call. Kernel menangani permintaan dan mengatur akses ke sumber daya." },
  { label: "Perangkat keras", value: "HW", title: "Dari driver ke perangkat", text: "Driver berkomunikasi dengan perangkat lewat antarmuka yang sesuai, misalnya register I/O dan interrupt. Pada sistem embedded, perangkat dan firmware sering dibangun untuk tugas tertentu." },
];

export function Stack({ active = -1 }: { active?: number }) {
  return <div className="stack-art" aria-hidden="true">
    <div className="stack-beam" />
    {[...layers].reverse().map(({label, value}, i) => <div key={value} className={`stack-plane ${4-i === active ? "plane-active" : ""}`} style={index(i)}>
      <span>{value}</span><span>{label}</span><i />
    </div>)}
  </div>;
}

export function Memory({ mode = "virtual" }: { mode?: "virtual" | "rust" | "c" }) {
  if (mode === "c") return <div className="bytes-art" aria-hidden="true">
    <div className="pointer-origin"><span>ptr</span><b>0x1040</b></div>
    <svg viewBox="0 0 320 70"><path className="pointer-line" d="M32 12h62l46 48h140m-11-9 11 9-11 9" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
    <div className="byte-row">{["2A","00","7F","C1"].map((v,i)=><div key={v} style={index(i)}><small>0x104{i}</small><b>{v}</b></div>)}</div>
  </div>;
  return <div className={`memory-art memory-${mode}`} aria-hidden="true">
    <div className="memory-labels"><span>{mode === "rust" ? "PEMILIK A" : "HALAMAN VIRTUAL"}</span><span>{mode === "rust" ? "PEMILIK B" : "FRAME FISIK"}</span></div>
    <div className="memory-field">
      {[0,1].map((column) => <div className="memory-column" key={column}>{["00","01","02","03"].map((addr,i) => <div key={addr} className="memory-block" style={index(column*2+i)}><span>{mode === "rust" ? (i === 1 ? (column ? "data" : "move →") : "—") : `0x${column ? String(8 + i) : addr}`}</span></div>)}</div>)}
      <svg viewBox="0 0 360 180" preserveAspectRatio="none"><path className="memory-link" d="M95 62h50l62 60h55" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="5 6"/></svg>
    </div>
  </div>;
}

export function Registers({ result = false }: { result?: boolean }) {
  return <div className={`register-art ${result ? "register-result" : ""}`} aria-hidden="true">
    <div className="instruction-line"><span>ADD</span> AX, 0x01</div>
    <div className="register-bus" />
    <div className="register-bank">{[["AX", result ? "002B" : "002A"],["BX","00F0"],["CX","0010"]].map(([reg,val],i)=><div key={reg} style={index(i)}><small>{reg}</small><b>{val}</b></div>)}</div>
  </div>;
}

export function Pipeline({ active = -1 }: { active?: number }) {
  return <div className="pipeline-art" aria-hidden="true">
    <div className="pipeline-track"><i /></div>
    {["Fetch","Decode","Execute","Write-back"].map((item,i)=><div className={i === active ? "pipeline-active" : ""} key={item} style={index(i)}><b>0{i+1}</b><span>{item}</span></div>)}
  </div>;
}

export function Logic({ high = true }: { high?: boolean }) {
  return <svg className="logic-art" viewBox="0 0 400 240" aria-hidden="true">
    <g fill="none" stroke="#6d7674"><path d="M22 65h112M22 105h112M218 85h151M30 203h340"/><path d="M30 152v57m42-57v57m42-57v57m42-57v57m42-57v57m42-57v57m42-57v57m42-57v57" opacity=".38"/></g>
    <path d="M134 42h43a43 43 0 0 1 0 86h-43z" fill="#2e3734" stroke="#a9c4b6" strokeWidth="2" />
    <g className="logic-signal" fill="none" stroke="#a8d8bd" strokeWidth="2.4"><path d="M22 65h112"/><path d={high ? "M22 105h112M218 85h151" : "M218 85h36"} /><path d="M30 195h42v-35h42v35h42v-35h42v35h42v-35h42v35h42v-35h43"/></g>
    <g fill="#e2e9e1" fontSize="14" fontFamily="monospace"><text x="24" y="54">A = 1</text><text x="24" y="130">B = {high ? 1 : 0}</text><text x="155" y="91">AND</text><text x="305" y="74">Y = {high ? 1 : 0}</text><text x="30" y="225">CLK</text></g>
  </svg>;
}

export function Abstraction() {
  return <div className="object-art" aria-hidden="true">
    <div className="object-back"><span>Data anggota</span></div><div className="object-mid"><span>Objek</span></div><div className="object-front"><span>Antarmuka</span><span>Buffer::read()</span></div>
  </div>;
}

export function Workflow({ active }: { active: number }) {
  return <div className="workflow-art" aria-hidden="true">
    <svg viewBox="0 0 400 260" preserveAspectRatio="none"><path d="M66 65H334v130H66V65" fill="none" stroke="#a8836e" strokeWidth="1.4" strokeDasharray="5 7"/><path className="workflow-signal" d="M66 65H334v130H66V65" fill="none" stroke="#deab84" strokeWidth="2" pathLength="1"/></svg>
    {["Ide","Instruksi","Implementasi AI","Pengujian","Evaluasi","Iterasi"].map((step,i)=><div className={i === active ? "workflow-active" : ""} key={step} style={index(i)}><small>0{i+1}</small><span>{step}</span></div>)}
  </div>;
}

export function Connection() {
  return <svg className="connection-art" viewBox="0 0 510 280" aria-hidden="true">
    <defs><pattern id="connection-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" stroke="#a7a19a" strokeOpacity=".14"/></pattern></defs>
    <rect width="510" height="280" fill="url(#connection-grid)" />
    <g stroke="#806858" fill="none"><path d="M14 80h110l48 60h164l47-60h113M14 204h89l69-64m164 0 69 64h91M52 110h57l34 42h228l35-42h48M52 174h75l38-46h179l39 46h71"/><circle cx="255" cy="140" r="64"/><circle cx="255" cy="140" r="89" strokeDasharray="2 8"/></g>
    <path className="connection-pulse" d="M14 80h110l48 60h164l47-60h113M14 204h89l69-64m164 0 69 64h91" fill="none" stroke="#f2bd96" strokeWidth="2" pathLength="1"/>
    <rect x="238" y="123" width="34" height="34" fill="#c48c68" transform="rotate(45 255 140)" /><circle cx="255" cy="140" r="3" fill="#191919"/>
  </svg>;
}

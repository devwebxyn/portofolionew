import { IndustryScene } from "./IndustryScene";

const frames = [
  {
    title:"Fetch", input:"PC menunjuk 0x1000", output:"Byte instruksi masuk ke decoder",
    art:<div className="instruction-fetch"><div><b>PC</b><code>0x1000</code></div><i/><div><b>MEMORI INSTRUKSI</b><code>04 01</code><code>90</code></div></div>,
  },
  {
    title:"Decode",input:"04 01 dalam mode x86 yang sesuai",output:"ADD AL, 0x01",
    art:<div className="instruction-decode"><div><code>04</code><b>Opcode ADD AL, imm8</b></div><div><code>01</code><b>Operand langsung</b></div></div>,
  },
  {
    title:"Execute",input:"AL = 0x2A dan operand 0x01",output:"ALU menghitung 0x2B",
    art:<div className="instruction-alu"><div><span>AL · 0x2A</span><span>imm8 · 0x01</span></div><b>＋</b><code>0x2B</code></div>,
  },
  {
    title:"Write-back",input:"Hasil penjumlahan 0x2B",output:"Register AL berisi 0x2B",
    art:<div className="instruction-write"><code>ALU · 0x2B</code><div><span>AL</span><s>0x2A</s><strong>0x2B</strong></div></div>,
  },
];

export function InstructionScene({ index }: {index:number}) {
  const {title,input,output,art}=frames[index];
  return <IndustryScene station={`${title} · model konseptual instruksi x86`} input={input} output={output}>{art}</IndustryScene>;
}

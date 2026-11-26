import { IndustryScene } from "./IndustryScene";

export function CudaScene({ level }: { level:number }) {
  return <IndustryScene station="Contoh peluncuran CUDA satu dimensi" input={["blockIdx.x = 1, threadIdx.x = 2","Empat thread per block","Dua block, masing-masing empat thread"][level]} output={["i = 1 × 4 + 2 = 6","Indeks lokal 0–3 di block 1","Delapan indeks global 0–7"][level]} variant="cuda-station">
    {level===0 ? <div className="cuda-index"><code>i = blockIdx.x × blockDim.x + threadIdx.x</code><div>{[0,1,2,3,4,5,6,7].map(i=><span key={i} data-hit={i===6}>{i}</span>)}</div><p>Thread ini mengakses elemen ke-6, dengan indeks mulai dari nol.</p></div> :
      <div className="cuda-grid-demo" data-grid={level===2}>{(level===1?[1]:[0,1]).map(block=><div key={block}><b>BLOCK {block}</b><div>{[0,1,2,3].map(thread=><span key={thread}>T{thread}<small>i={block*4+thread}</small></span>)}</div></div>)}</div>}
  </IndustryScene>;
}

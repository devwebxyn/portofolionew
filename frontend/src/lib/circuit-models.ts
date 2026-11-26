export const gates = ["AND","OR","NOT","NAND","NOR","XOR","XNOR"] as const;
export type Gate = typeof gates[number];
export const ohm = (volts:number,ohms:number) => ({amps:volts/ohms, watts:volts**2/ohms});
export const rc = (volts:number,time:number,ohms:number,farads:number,discharge:boolean) => {
  const decay=Math.exp(-time/(ohms*farads));
  return volts*(discharge ? decay : 1-decay);
};
export const solenoid = (amps:number,turns:number,length:number) => 4*Math.PI*1e-7*(turns/length)*amps;
export const transformer = (rms:number,primary:number,secondary:number,centerTap:boolean) => rms*(secondary/primary)/(centerTap ? 2 : 1);
export const rectified = (phase:number,amplitude:number,bridge:boolean) => bridge ? amplitude*Math.abs(Math.sin(phase)) : Math.max(0,amplitude*Math.sin(phase));
export const channelOn = (vg:number,vs:number,pChannel:boolean,threshold=2) => pChannel ? vg-vs < -threshold : vg-vs > threshold;

export function logic(gate:Gate,a:boolean,b:boolean) {
  switch(gate) {
    case "AND":return a&&b;
    case "OR":return a||b;
    case "NOT":return !a;
    case "NAND":return !(a&&b);
    case "NOR":return !(a||b);
    case "XOR":return a!==b;
    case "XNOR":return a===b;
  }
}

export type Protection = "normal" | "short" | "detect" | "isolate";
export function protection(state:Protection) {
  const isolated=state==="isolate";
  return { isolated, detection:state==="detect"||isolated, shorted:state!=="normal", gate:isolated ? 5 : 0 };
}

export function fuseState(kind:"fuse"|"efuse",fault:boolean,tripped:boolean) {
  if (tripped) return {conducting:false,text:kind==="fuse" ? "Elemen putus" : "Keluaran diisolasi"};
  if (fault) return {conducting:true,text:kind==="fuse" ? "Arus gangguan memanaskan elemen" : "Pembatasan arus elektronik"};
  return {conducting:true,text:"Daya tersalur"};
}

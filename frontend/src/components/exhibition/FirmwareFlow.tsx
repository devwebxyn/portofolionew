const stages = [
  {kind:'SOURCE.C', lines:['#include <device.h>','int main(void) {','  gpio_init();','  while (1) poll();','}'], output:'Teks program dan header'},
  {kind:'PREPROCESSOR', lines:['#include → deklarasi','MACRO → ekspansi','#if → pilih konfigurasi'], output:'Unit sumber yang diperluas'},
  {kind:'COMPILER', lines:['C / C++','↓ analisis & optimisasi','Instruksi target'], output:'Kode untuk arsitektur target'},
  {kind:'ASSEMBLER', lines:['MOV  R0, #1','STR  R0, [R1]','↓ pengodean','0100 0110 …'], output:'Object file dan simbol'},
  {kind:'LINKER', lines:['main.o  +  driver.o','       + runtime','       ↓','  FLASH  │  RAM'], output:'Section ditempatkan ke memori'},
  {kind:'ELF', lines:['HEADER   entry point','TEXT     instruksi','DATA     nilai awal','SYMBOLS  debug'], output:'Executable beserta metadata'},
  {kind:'IMAGE', lines:['ELF → BIN','    → HEX','    → UF2','Format bergantung target'], output:'Citra untuk alat pemrogram'},
  {kind:'TRANSFER', lines:['KOMPUTER','   ↓ USB / UART / SWD','PROGRAMMER / BOOTLOADER','   ↓','FLASH MIKROKONTROLER'], output:'Citra ditulis melalui interface'},
  {kind:'RESET', lines:['RESET','  ↓ boot ROM / vector','STARTUP','  ↓ stack, data, BSS','MAIN'], output:'Urutan tergantung perangkat'},
  {kind:'RUNTIME', lines:['INISIALISASI GPIO','       ↓','  LOOP / RTOS  ← IRQ','       ↓','  PERIFERAL'], output:'Firmware berinteraksi dengan perangkat'},
];
export function FirmwareFlow({stage}:{stage:number}) {
 const item=stages[stage];
 return <div className="firmware-flow" aria-label={`Visualisasi konseptual ${item.kind}`}><div className="firmware-flow-top"><span>ALUR FIRMWARE</span><span>{String(stage+1).padStart(2,'0')} / 10</span></div><div className="firmware-flow-content"><span className="firmware-flow-kind">{item.kind}</span>{item.lines.map((line,i)=><div className="firmware-flow-line" style={{animationDelay:`${i*100}ms`}} key={`${line}-${i}`}>{line}</div>)}</div><div className="firmware-flow-output">↳ {item.output}</div></div>;
}

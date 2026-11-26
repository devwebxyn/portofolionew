import { Render } from "./Render";
import { WorkflowVolume } from "./Workflow";

const firmwareScenes = [
  {
    kind: "source", caption: "Kode menyatakan perilaku LED.",
    art: <div className="firmware-sheet"><b>blink.c</b><code>{'#include "gpio.h"\n#define LED 5\n\nvoid led_on(void) {\n  gpio_write(LED, 1);\n}'}</code></div>,
  },
  {
    kind: "expand", caption: "Header menyediakan deklarasi dan makro LED berubah menjadi 5.",
    art: <div className="firmware-merge"><div><b>gpio.h</b><code>void gpio_write(int pin, int value);</code></div><div><b>UNIT SUMBER</b><code>gpio_write(5, 1);</code></div></div>,
  },
  {
    kind: "compile", caption: "Compiler mengubah panggilan menjadi operasi target. Contoh listing memakai gaya ARM.",
    art: <div className="firmware-belt"><div><b>C</b><code>gpio_write(5, 1)</code></div><div><b>OPERASI TARGET</b><code>{"movs r0, #5\nmovs r1, #1\nbl gpio_write"}</code></div></div>,
  },
  {
    kind: "object", caption: "Assembler menghasilkan section kode dan entri relokasi untuk panggilan yang belum memiliki alamat.",
    art: <div className="firmware-object"><b>blink.o</b><div><span>.text</span><code>05 20 01 21 …</code></div><div><span>relokasi</span><code>gpio_write</code></div></div>,
  },
  {
    kind: "link", caption: "Linker mencari gpio_write di driver.o dan memberi alamat pada kode. Peta memori bergantung pada target.",
    art: <div className="firmware-memory"><div><b>blink.o → driver.o</b><span>Panggilan → definisi</span></div><div><b>FLASH</b><code>.text · kode</code><b>RAM</b><code>.data · .bss</code></div></div>,
  },
  {
    kind: "elf", caption: "ELF memuat program dan metadata yang dapat digunakan alat pengembangan.",
    art: <div className="firmware-elf"><div>HEADER · alamat masuk</div><div>SEGMENT · data untuk dimuat</div><div>SIMBOL · nama untuk alat debug</div></div>,
  },
  {
    kind: "image", caption: "Alat ekspor memilih data untuk format yang dapat dibaca programmer.",
    art: <div className="firmware-image"><div><b>ELF</b>Program + metadata</div><div><b>BIN / HEX / UF2</b>Data terpilih untuk target</div></div>,
  },
  {
    kind: "flash", caption: "Citra melintas lewat antarmuka pemrograman dan ditulis ke flash pada perangkat.",
    art: <div className="firmware-device"><div className="device-host"><b>HOST</b><code>firmware.bin</code></div><div className="wire-pulse"><i/></div><div><Render name="pico" alt="Papan mikrokontroler konseptual"/><b>FLASH</b></div></div>,
  },
  {
    kind: "reset", caption: "Setelah reset, mekanisme boot awal menyerahkan kendali ke startup dan kemudian aplikasi.",
    art: <div className="firmware-stairs"><div>Reset → boot awal</div><div>Startup → siapkan RAM</div><div>main() → mulai aplikasi</div></div>,
  },
  {
    kind: "runtime", caption: "Kode mengatur GPIO. Level keluaran yang dihasilkan dapat menyalakan LED pada rangkaian yang sesuai.",
    art: <div className="firmware-device device-live"><div><Render name="pico" alt="Papan mikrokontroler"/><b>GPIO → HIGH</b></div><div className="wire-pulse"><i/></div><div><Render name="led" alt="LED"/><b>LED menyala</b></div></div>,
  },
];

export function FirmwareFlow({ stage }: { stage: number }) {
  const scene = firmwareScenes[stage];
  return <WorkflowVolume variant={scene.kind} summary={scene.caption}>
    {scene.art}
    <p className="volume-caption">{scene.caption}</p>
  </WorkflowVolume>;
}

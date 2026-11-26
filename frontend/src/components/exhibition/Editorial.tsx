import type { ReactNode } from "react";
import { Chapter } from "@/components/bare/Exhibit";

export function Index({ items }: { items: [string,string][] }) {
  return <nav className="chapter-index" aria-label="Bab halaman">{items.map(([id,title])=><a href={`#${id}`} key={id}>{title}</a>)}</nav>;
}

export function Essay({ id, number, title, children, tone }: { id: string; number: string; title: string; children: ReactNode; tone?: "paper" }) {
  return <section className={`section essay ${tone ?? ""}`} id={id}>
    <div className="frame">
      <Chapter id={number} label={title} />
      <div className="essay-columns">{children}</div>
    </div>
  </section>;
}

export function Note({ label, children }: { label: string; children: ReactNode }) {
  return <details className="hotspot technical-note"><summary>{label}</summary><div>{children}</div></details>;
}

export const sources = {
  fabrication: "https://www.asml.com/en/technology/all-about-microchips/how-microchips-are-made",
  foundry: "https://www.tsmc.com/english/dedicatedFoundry",
  cuda: "https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/programming-model.html",
  pico: "https://www.raspberrypi.com/documentation/microcontrollers/pico-series.html",
  esp: "https://docs.espressif.com/projects/esp-idf/en/v5.3.1/esp32/hw-reference/esp32/get-started-devkitc.html",
  espS3: "https://docs.espressif.com/projects/esp-board-manager/en/latest/references/boards/esp32_s3_devkitc_1.html",
  linux: "https://www.kernel.org/doc/html/latest/admin-guide/initrd.html",
  pcb: "https://docs.kicad.org/master/en/pcbnew/pcbnew.html",
};

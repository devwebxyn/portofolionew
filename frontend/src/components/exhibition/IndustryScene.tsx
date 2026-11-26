import type { ReactNode } from "react";

export function IndustryScene({ station, input, output, children, variant = "" }: {
  station: string;
  input: string;
  output: string;
  children: ReactNode;
  variant?: string;
}) {
  return <figure className={`industry-scene ${variant}`}>
    <div className="industry-station">{station}</div>
    <div className="industry-visual">{children}</div>
    <figcaption>
      <div><b>Masukan</b><span>{input}</span></div>
      <div><b>Hasil</b><span>{output}</span></div>
    </figcaption>
  </figure>;
}

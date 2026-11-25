"use client";

import Image from "next/image";
import { useState } from "react";

export function ProjectImage({ src, title, detail = false }: { src?: string; title: string; detail?: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const optimized = src && /^https:\/\/(?:[a-z0-9-]+\.)?cloud\.appwrite\.io\/v1\/storage\/buckets\//i.test(src);
  return (
    <div className={`project-image ${detail ? "project-image-detail" : ""}`}>
      {src && attempt < (optimized ? 2 : 1) ?
        <Image key={attempt} src={src} alt={`Gambar proyek ${title}`} fill unoptimized={!optimized || attempt > 0}
          loading={detail ? "eager" : "lazy"}
          sizes={detail ? "(max-width: 700px) 92vw, 1100px" : "(max-width: 700px) 92vw, (max-width: 1300px) 55vw, 680px"}
          onError={() => setAttempt(attempt + 1)} />
        : <div className="project-image-fallback" aria-hidden="true">
          <svg viewBox="0 0 240 150" fill="none"><path d="M32 117h37l26-23h66l40-39h22M17 91h75l27-27h55l29-28h20M60 135h81l29-28h43" stroke="currentColor" strokeOpacity=".36"/><path d="m79 65 53-32 50 31-51 32z" fill="#34413a" stroke="currentColor"/><path d="m92 64 40-23 37 23-38 24z" fill="#758774" fillOpacity=".36" stroke="currentColor"/><path d="m113 64 19-12 19 12-20 12z" fill="currentColor"/><circle cx="32" cy="117" r="3" fill="currentColor"/><circle cx="17" cy="91" r="3" fill="currentColor"/><circle cx="223" cy="55" r="3" fill="currentColor"/></svg>
        </div>}
    </div>
  );
}

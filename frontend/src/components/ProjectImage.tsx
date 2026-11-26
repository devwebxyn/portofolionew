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
        : <div className="project-image-fallback"><span>Gambar tidak tersedia</span></div>}
    </div>
  );
}

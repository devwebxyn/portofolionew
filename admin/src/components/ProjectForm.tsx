"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Project } from "@/lib/types";

interface Props {
  mode: "new" | "edit";
  initial?: Project;
}

export function ProjectForm({ mode, initial }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(initial?.imageUrl ?? null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const image = form.image as HTMLInputElement;
    if (image.files?.[0]) fd.set("image", image.files[0]);
    if (mode === "edit" && initial) fd.set("id", initial.$id);

    const endpoint = mode === "edit" ? "/api/projects/update" : "/api/projects";
    const res = await fetch(endpoint, { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) {
      setError(data?.error || "Gagal menyimpan project.");
      setBusy(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  const inputCls =
    "w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-hi placeholder:text-body/40 focus:border-accent focus:outline-none";
  const labelCls = "mb-1.5 block text-sm text-body";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className={labelCls}>
          Title
        </label>
        <input id="title" name="title" required defaultValue={initial?.title} className={inputCls} />
      </div>

      <div>
        <label htmlFor="description" className={labelCls}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={initial?.description}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelCls}>
            Category
          </label>
          <input id="category" name="category" defaultValue={initial?.category} className={inputCls} />
        </div>
        <div>
          <label htmlFor="language" className={labelCls}>
            Language
          </label>
          <input id="language" name="language" defaultValue={initial?.language} className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="tags" className={labelCls}>
          Tags <span className="text-body/50">(pisahkan dengan koma)</span>
        </label>
        <input
          id="tags"
          name="tags"
          defaultValue={(initial?.tags ?? []).join(", ")}
          className={inputCls}
          placeholder="React, IoT, Next.js"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="liveUrl" className={labelCls}>
            Live URL
          </label>
          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            defaultValue={initial?.liveUrl}
            className={inputCls}
            placeholder="https://…"
          />
        </div>
        <div>
          <label htmlFor="githubUrl" className={labelCls}>
            GitHub URL
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            defaultValue={initial?.githubUrl}
            className={inputCls}
            placeholder="https://github.com/…"
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Image</label>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md border border-line bg-elev">
            {preview ? (
              <Image src={preview} alt="Preview" fill sizes="112px" className="object-cover" unoptimized />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-body">No image</div>
            )}
          </div>
          <input
            ref={fileRef}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPreview(URL.createObjectURL(f));
            }}
            className="text-sm text-body file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-line file:bg-elev file:px-3 file:py-1.5 file:text-sm file:text-hi"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Menyimpan…" : mode === "edit" ? "Simpan Perubahan" : "Simpan Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-md border border-line px-5 py-2.5 text-sm text-body transition-colors hover:text-hi"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

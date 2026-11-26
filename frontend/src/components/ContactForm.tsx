"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { contactInput, limits, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

const fields = [
  { name: "subject", label: "Topik", placeholder: "Apa yang ingin kamu bahas?" },
  { name: "senderEmail", label: "Alamat email", placeholder: "nama@contoh.id" },
  { name: "message", label: "Pesan", placeholder: "Tulis pesanmu di sini" },
] as const;

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [result, setResult] = useState<{ text: string; error: boolean }>();
  const [pending, setPending] = useState(false);
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = contactInput(Object.fromEntries(data) as Partial<ContactInput>);
    const nextErrors = validateContact(input);
    setErrors(nextErrors);
    setResult(undefined);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement)?.focus();
      return;
    }

    sending.current = true;
    setPending(true);
    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input),
        signal: AbortSignal.timeout(10_000),
      });
      const body = await response.json();
      if (!response.ok || body?.ok !== true) {
        setResult({ text: body?.error ?? "Pesan belum bisa dikirim. Coba lagi nanti.", error: true });
        return;
      }
      form.reset();
      setResult({ text: "Pesan terkirim. Terima kasih sudah menghubungi saya.", error: false });
    } catch {
      setResult({ text: "Pengiriman belum bisa dikonfirmasi. Kamu juga bisa menghubungi saya lewat email.", error: true });
    } finally {
      sending.current = false;
      setPending(false);
    }
  }

  return <form className="contact-form" method="post" action="/api/contact-messages" onSubmit={submit} noValidate>
    <fieldset disabled={pending}>
      <legend className="sr-only">Kirim pesan</legend>
      {fields.map(({ name, label, placeholder }) => {
        const invalid = Boolean(errors[name]);
        const props = { id: name, name, placeholder, required: true, maxLength: limits[name], "aria-invalid": invalid || undefined, "aria-describedby": invalid ? `${name}-error` : undefined };
        return <div className="form-field" key={name}>
          <label htmlFor={name}>{label}</label>
          {name === "message" ? <textarea {...props} rows={6} /> :
            <input {...props} type={name === "senderEmail" ? "email" : "text"} autoComplete={name === "senderEmail" ? "email" : undefined} />}
          {invalid && <p className="field-error" id={`${name}-error`} role="alert">{errors[name]}</p>}
        </div>;
      })}
      <button className="action action-solid" type="submit">{pending ? "Mengirim pesan…" : "Kirim pesan"} <ArrowUpRight size={17} aria-hidden /></button>
    </fieldset>
    <div role="status" className={`form-result ${result?.error ? "field-error" : ""}`}>{result?.text}</div>
  </form>;
}

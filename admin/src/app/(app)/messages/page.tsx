import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authToken, proxy } from "@/lib/proxy";

type Message = {
  $id: string;
  subject: string;
  senderEmail: string;
  body: string;
  status?: string;
  replyContent?: string;
};

async function markRead(form: FormData) {
  "use server";

  if (!(await authToken())) redirect("/login");
  const id = form.get("id");
  if (typeof id !== "string" || !/^[a-z0-9][a-z0-9._-]{0,35}$/i.test(id)) return;
  const result = await proxy("/api/admin/messages/read", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (result.status === 401) redirect("/login");
  if (!result.body?.ok) redirect("/messages?error=baca");
  revalidatePath("/messages");
}

export default async function Messages({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [result, { error }] = await Promise.all([proxy("/api/admin/messages"), searchParams]);
  if (result.status === 401 || !(await authToken())) redirect("/login");
  const messages = Array.isArray(result.body?.items) ? result.body.items as Message[] : [];
  const unavailable = result.status !== 200 || result.body?.ok !== true;

  return <section className="space-y-5">
    <h1 className="font-display text-3xl font-bold tracking-tight">Pesan masuk</h1>
    {error === "baca" && <p role="alert">Status pesan belum bisa diperbarui.</p>}
    {unavailable ? <p role="alert">Pesan belum bisa dimuat. Muat ulang halaman untuk mencoba lagi.</p> :
      messages.length === 0 ? <p>Belum ada pesan.</p> :
      <ul className="space-y-3">{messages.map((message) => {
        const sender = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.senderEmail) ? encodeURIComponent(message.senderEmail).replace("%40", "@") : null;
        const label = message.status === "replied" ? "Dibalas" : message.status === "read" ? "Dibaca" : "Belum dibaca";
        return <li key={message.$id} className="glass rounded-xl p-4">
          <details>
            <summary className="cursor-pointer break-words font-semibold">{message.subject} <span className="ml-2 text-sm font-normal text-body">{label}</span></summary>
            <p className="mt-4 break-words text-sm text-body">{message.senderEmail}</p>
            <p className="mt-2 whitespace-pre-wrap break-words">{message.body}</p>
            {message.replyContent && <p className="mt-4 whitespace-pre-wrap break-words text-body">Catatan balasan: {message.replyContent}</p>}
            <div className="mt-4 flex flex-wrap gap-3">
              {sender && <a className="rounded border border-line px-3 py-2 text-accent" href={`mailto:${sender}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}>Balas lewat email</a>}
              {label === "Belum dibaca" && <form action={markRead}>
                <input type="hidden" name="id" value={message.$id} />
                <button className="cursor-pointer rounded border border-line px-3 py-2">Tandai sudah dibaca</button>
              </form>}
            </div>
          </details>
        </li>;
      })}</ul>}
  </section>;
}

import { redirect } from "next/navigation";
import { proxy } from "@/lib/proxy";
import type { Message } from "@/lib/types";
import { MessagesView } from "@/components/MessagesView";

export const dynamic = "force-dynamic";

export const metadata = { title: "Pesan" };

export default async function MessagesPage() {
  const { status, body } = await proxy("/api/admin/messages");
  if (status === 401) redirect("/login");
  const messages: Message[] = (body?.items as Message[] | undefined) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Pesan</h1>
        <p className="mt-1 text-sm text-body">Pesan masuk dari form kontak portfolio.</p>
      </div>
      <MessagesView messages={messages} />
    </div>
  );
}

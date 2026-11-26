import { Action } from "@/components/Editorial";
import { Chapter } from "@/components/bare/Exhibit";

export default function NotFound() {
  return <section className="frame page-top missing-page">
    <Chapter id="404" label="Alamat tidak ditemukan" />
    <h1>Halaman ini <em>tidak ditemukan.</em></h1>
    <p className="lead">Alamat mungkin sudah berubah atau halaman telah dihapus.</p>
    <Action href="/">Kembali ke beranda</Action>
  </section>;
}

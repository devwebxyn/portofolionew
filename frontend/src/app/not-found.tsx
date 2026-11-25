import { Action, PageIntro } from "@/components/Editorial";

export default function NotFound() {
  return <>
    <PageIntro label="404" title={<>Halaman tidak <em>ditemukan.</em></>}>Alamat ini mungkin berubah atau halamannya sudah tidak tersedia.</PageIntro>
    <div className="frame section-compact"><Action href="/">Kembali ke beranda</Action></div>
  </>;
}

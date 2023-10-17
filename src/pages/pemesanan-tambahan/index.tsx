import { Separator } from "~/components/ui/separator";
import { SideBar } from "~/components/side-bar";
import { SiteHeader } from "~/components/site-header";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Content } from "~/components/pemesanan-tambahan/content";
import { JenisLayanan } from "@prisma/client";

const PemesananTambahanPage = () => {
  const { query, } = useRouter();
  const queryLayanan = query["layanan"]?.toString() ?? "kesehatan";
  const jenisLayanan =
    JenisLayanan[queryLayanan as keyof typeof JenisLayanan] ||
    JenisLayanan.kesehatan;

  // console.log({ query, pathname,route });

  const { data, isLoading, isError, error } =
    api.pemesananTambahan.getAll.useQuery(jenisLayanan);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <SiteHeader />
      <section className="container mx-auto grid items-center gap-6 pb-8 pt-4 md:py-8">
        <div className="flex h-52 space-x-4">
          <SideBar  />

          <Separator orientation="vertical" />
          <div className="flex-1">
            <Content data={data} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PemesananTambahanPage;

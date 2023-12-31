import { Separator } from "~/components/ui/separator";
import { SideBar } from "~/components/side-bar";
import { SiteHeader } from "~/components/site-header";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Content } from "~/components/jadwal-layanan/content";
import { JenisLayanan } from "@prisma/client";

const JadwalPage = () => {
  const { query } = useRouter();
  const queryLayanan = query["layanan"]?.toString() ?? "kesehatan";

  const { data, isLoading, isError, error } = api.jadwalLayanan.getAll.useQuery(
    JenisLayanan[queryLayanan as keyof typeof JenisLayanan] ||
      JenisLayanan.kesehatan
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <SiteHeader />
      <section className="container mx-auto grid items-center gap-6 pb-8 pt-4 md:py-8">
        <div className="flex h-52 space-x-4">
          <SideBar />

          <Separator orientation="vertical" />
          <div className="flex-1">
            <Content data={data} />
          </div>
        </div>
      </section>
    </>
  );
};

export default JadwalPage;

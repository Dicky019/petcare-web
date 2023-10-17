import { SiteHeader } from "~/components/site-header";
import { api } from "~/utils/api";
import { Separator } from "~/components/ui/separator";
import { useRouter } from "next/router";
import { Content } from "~/components/home/content";
import { SideBar } from "~/components/side-bar";
import { pemesanColumns } from "~/components/home/table-layanan/pemesan-column";
import { pemesanNoKeluhanColumns } from "~/components/home/table-layanan/pemesan-no-keluhan-column";
import { JenisLayanan } from "@prisma/client";

const HomePage = () => {
  const { query } = useRouter();
  const queryLayanan = query["layanan"] ?? "kesehatan";
  const jenisLayanan =
    JenisLayanan[queryLayanan as keyof typeof JenisLayanan] ||
    JenisLayanan.kesehatan;
    
  const { data, isLoading, isError, error } =
    api.pemesananLayanan.getAll.useQuery(jenisLayanan);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <SiteHeader />
      <section className="container mx-auto grid items-center gap-6 pb-8 pt-4 md:py-8">
        {/* <button onClick={() => void mutate()}>Tambah</button> */}
        <div className="flex h-40 space-x-4">
          <SideBar />
          <Separator orientation="vertical" />
          <div className="flex-1">
            <Content
              data={data}
              pemesanColumns={
                jenisLayanan === JenisLayanan.grooming
                  ? pemesanNoKeluhanColumns
                  : pemesanColumns
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

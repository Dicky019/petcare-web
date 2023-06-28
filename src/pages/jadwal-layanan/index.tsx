import { Separator } from "~/components/ui/separator";
import { useState } from "react";
import { SideBar } from "~/components/side-bar";
import { SiteHeader } from "~/components/site-header";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Content } from "~/components/jadwal-layanan/content";

const JadwalPage = () => {
  const { data, isLoading, isError, error } =
    api.jadwalLayanan.getAll.useQuery();

  const [layanan, setLayanan] = useState(data?.layananKesehatan);

  const { query } = useRouter();

  const queryLayanan = query["layanan"] ?? "kesehatan";

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const init =
    queryLayanan === "kesehatan"
      ? data.layananKesehatan
      : queryLayanan === "konsultasi"
      ? data.layananKonsultasi
      : queryLayanan === "grooming"
      ? data.layananGrouming
      : data.layananKesehatan;

  const changeLayanan = (
    changeLayanan: typeof data.layananKesehatan,
  ) => {
    void setLayanan(changeLayanan);
  };
  return (
    <>
      <SiteHeader />
      <section className="container mx-auto grid items-center gap-6 pb-8 pt-4 md:py-8">
        {/* <button onClick={() => void mutate()}>Add</button> */}
        <div className="flex h-40 space-x-4">
          <SideBar
            layananKesehatan={() => void changeLayanan(data.layananKesehatan)}
            layananGrooming={() => void changeLayanan(data.layananGrouming)}
            layananKonsultasi={() => void changeLayanan(data.layananKonsultasi)}
          />
          <Separator orientation="vertical" />
          <div className="flex-1">
            <Content data={layanan ?? init} />
          </div>
        </div>
      </section>
    </>
  );
};

export default JadwalPage;

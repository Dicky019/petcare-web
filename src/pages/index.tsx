import { useEffect, useState } from "react";
import { SiteHeader } from "~/components/site-header";
import { api } from "~/utils/api";
import { Separator } from "~/components/ui/separator";
import { useRouter } from "next/router";
import { Content } from "~/components/home/content";
import { SideBar } from "~/components/side-bar";
import { pemesanColumns } from "~/components/home/table-layanan/pemesan-column";
import { pemesanNoKeluhanColumns } from "~/components/home/table-layanan/pemesan-no-keluhan-column";

const HomePage = () => {
  const { data, isLoading, isError, error } =
    api.pemesananLayanan.getAll.useQuery();

  const [layanan, setLayanan] = useState(data?.layananKesehatan);

  const { query } = useRouter();

  const queryLayanan = query["layanan"] ?? "kesehatan";

  const initColumns =
    queryLayanan === "kesehatan"
      ? pemesanColumns
      : queryLayanan === "konsultasi"
      ? pemesanColumns
      : queryLayanan === "grooming"
      ? pemesanNoKeluhanColumns
      : pemesanColumns;

  const [columns, setColumns] = useState(pemesanColumns);
  const init =
  queryLayanan === "kesehatan"
    ? data?.layananKesehatan
    : queryLayanan === "konsultasi"
    ? data?.layananKonsultasi
    : queryLayanan === "grooming"
    ? data?.layananGrouming
    : data?.layananKesehatan;

  useEffect(() => {
    setColumns(initColumns);
    setLayanan(init)
  }, [initColumns, data, init]);
  // const {mutate} = api.pemesananLayanan.create.useMutation()

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const initLayanan =
    queryLayanan === "kesehatan"
      ? data.layananKesehatan
      : queryLayanan === "konsultasi"
      ? data.layananKonsultasi
      : queryLayanan === "grooming"
      ? data.layananGrouming
      : data.layananKesehatan;

  const changeLayanan = (
    changeLayanan: typeof data.layananKesehatan,
    changeColumns: typeof pemesanColumns
  ) => {
    void setLayanan(changeLayanan);
    void setColumns(changeColumns);
  };

  return (
    <>
      <SiteHeader />
      <section className="container mx-auto grid items-center gap-6 pb-8 pt-4 md:py-8">
        {/* <button onClick={() => void mutate()}>Tambah</button> */}
        <div className="flex h-40 space-x-4">
          <SideBar
            layananKesehatan={() =>
              void changeLayanan(data?.layananKesehatan, pemesanColumns)
            }
            layananGrooming={() =>
              void changeLayanan(data?.layananGrouming, pemesanNoKeluhanColumns)
            }
            layananKonsultasi={() =>
              void changeLayanan(data?.layananKonsultasi, pemesanColumns)
            }
          />
          <Separator orientation="vertical" />
          <div className="flex-1">
            <Content data={layanan ?? initLayanan} pemesanColumns={columns} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

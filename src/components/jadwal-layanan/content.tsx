import { useRouter } from "next/router";
import { columns } from "./table-layanan/column";
import { DataTable } from "~/components/data-table";
import { type IJadwalLayanan } from "~/types/jadwal-layanan";

interface IContentProps {
  data: IJadwalLayanan[];
}

export const Content = ({ data }: IContentProps) => {
  return (
    <DataTable
      onClickAdd={() => {
        console.log("logo");
      }}
      columns={columns}
      data={data}
      name="Jadwal Layanan"
    />
  );
};

import { columns } from "./table-layanan/column";
import { DataTable } from "~/components/data-table";
import { type IJadwalLayanan } from "~/types/jadwal-layanan";

interface IContentProps {
  data: IJadwalLayanan[];
}

export const Content = ({ data }: IContentProps) => {
  return <DataTable columns={columns} data={data}  name="Jadwal Layanan"/>;
};
 
import { columns } from "./table-layanan/column";
import { DataTable } from "~/components/data-table";
import { type IPemesananTambahan } from "~/types/pemesanan-tambahan";

interface IContentProps {
  data: IPemesananTambahan[];
}

export const Content = ({ data }: IContentProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      name="Pemesanan Tambahan"
    />
  );
};

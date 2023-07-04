import { columns } from "~/components/home/table-layanan/column";
import { DataTable } from "~/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { Separator } from "../ui/separator";
import type { IPemesananLayanan } from "~/types/pemesanan-layanan";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

type IContent = IPemesananLayanan[];

interface IContentProps {
  data: {
    todayPemesananLayanan: IContent;
    allPemesananLayanan: IContent;
    processing: IContent;
    pending: IContent;
    success: IContent;
    failed: IContent;
  };
}

export const Content = ({ data }: IContentProps) => {
  const trpc = api.useContext();
  const { mutate } = api.pemesananLayanan.create.useMutation({
    onSettled: async (data, error) => {
      error &&  void toast.error(error?.message);
      data &&  void toast.success("success Add");
      await trpc.pemesananLayanan.getAll.invalidate();
    },
  });
  return (
    <Tabs defaultValue="today">
      <TabsList>
        <TabsTrigger value="today">
          Today {data.todayPemesananLayanan.length}
        </TabsTrigger>
        <TabsTrigger value="all">
          All {data.allPemesananLayanan.length}
        </TabsTrigger>
        <Separator orientation="vertical" className="mx-1 w-[2px]" />
        <TabsTrigger value="success">Success {data.success.length}</TabsTrigger>
        <TabsTrigger value="processing">
          Processing {data.processing.length}
        </TabsTrigger>
        <TabsTrigger value="pending">Pending {data.pending.length}</TabsTrigger>
        <TabsTrigger value="failed">Failed {data.failed.length}</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <DataTable
          onCLickAdd={() => {
            mutate();
          }}
          columns={columns}
          data={data.todayPemesananLayanan}
          name="Pemesanan"
        />
      </TabsContent>
      <TabsContent value="all">
        <DataTable
          isActiveAdd={false}
          columns={columns}
          data={data.allPemesananLayanan}
          name="Pemesanan"
        />
      </TabsContent>
      <TabsContent value="success">
        <DataTable
          isActiveAdd={false}
          columns={columns}
          data={data.success}
          name="Pemesanan"
        />
      </TabsContent>
      <TabsContent value="processing">
        <DataTable
          isActiveAdd={false}
          columns={columns}
          data={data.processing}
          name="Pemesanan"
        />
      </TabsContent>
      <TabsContent value="pending">
        <DataTable
          isActiveAdd={false}
          columns={columns}
          data={data.pending}
          name="Pemesanan"
        />
      </TabsContent>
      <TabsContent value="failed">
        <DataTable
          isActiveAdd={false}
          columns={columns}
          data={data.failed}
          name="Pemesanan"
        />
      </TabsContent>
    </Tabs>
  );
};

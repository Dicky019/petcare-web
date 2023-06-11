import React from "react";
import { SiteHeader } from "~/components/site-header";
import { columns } from "~/components/home/table-layanan/column";
import { DataTable } from "~/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";
import { Separator } from "~/components/ui/separator";

const index = () => {
  const { data, isLoading, isError, error } =
    api.pemesananLayanan.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <SiteHeader />
      <section className="container mx-auto grid items-center gap-6 pb-8 pt-4 md:py-8">
        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today {data.todayPemesananLayanan.length}</TabsTrigger>
            <TabsTrigger value="all">All {data.allPemesananLayanan.length}</TabsTrigger>
            <Separator orientation="vertical" className="mx-1 w-[2px]" />
            <TabsTrigger value="success">Success {data.success.length}</TabsTrigger>
            <TabsTrigger value="processing">Processing {data.processing.length}</TabsTrigger>
            <TabsTrigger value="pending">Pending {data.pending.length}</TabsTrigger>
            <TabsTrigger value="failed">Failed {data.failed.length}</TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <DataTable columns={columns} data={data.todayPemesananLayanan} />
          </TabsContent>
          <TabsContent value="all">
            <DataTable columns={columns} data={data.allPemesananLayanan} />
          </TabsContent>
          <TabsContent value="success">
            <DataTable columns={columns} data={data.success} />
          </TabsContent>
          <TabsContent value="processing">
            <DataTable columns={columns} data={data.processing} />
          </TabsContent>
          <TabsContent value="pending">
            <DataTable columns={columns} data={data.pending} />
          </TabsContent>
          <TabsContent value="failed">
            <DataTable columns={columns} data={data.failed} />
          </TabsContent>
        </Tabs>
        {/* <button onClick={() => void mutate()}>Add</button> */}
      </section>
    </div>
  );
};

export default index;

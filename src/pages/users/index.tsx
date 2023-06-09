import React from "react";
import { SiteHeader } from "~/components/home/site-header";
import { columns } from "~/components/home/table-layanan/column";
import { DataTable } from "~/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";

const index = () => {
  const { data, isLoading, isError, error } =
    api.pemesananLayanan.getAll.useQuery();
  // const { mutate } =
  //   api.pemesananLayanan.create.useMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <SiteHeader />
      <section className="container mx-auto grid items-center gap-6 pb-8 pt-4 md:py-8">
        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <DataTable columns={columns} data={data.todayPemesananLayanan} />
          </TabsContent>
          <TabsContent value="all">
            <DataTable columns={columns} data={data.allPemesananLayanan} />
          </TabsContent>
        </Tabs>
        {/* <button onClick={() => void mutate()}>Add</button> */}
      </section>
    </div>
  );
};

export default index;

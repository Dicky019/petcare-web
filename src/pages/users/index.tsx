import React from "react";
import { SiteHeader } from "~/components/site-header";
import { columns } from "~/components/users/table-layanan/column";
import { DataTable } from "~/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";
import { Separator } from "~/components/ui/separator";

const index = () => {
  const { data, isLoading, isError, error } = api.users.getAll.useQuery();
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
            <TabsTrigger value="today">
              Today {data.todayUsers.length}
            </TabsTrigger>
            <TabsTrigger value="all">All {data.allUsers.length}</TabsTrigger>
            <Separator orientation="vertical" className="mx-1 w-[2px]" />
            <TabsTrigger value="active">
              Active {data.isActive.length}
            </TabsTrigger>
            <TabsTrigger value="non-active">
              Non Active {data.isNotActive.length}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <DataTable columns={columns} data={data.todayUsers} />
          </TabsContent>
          <TabsContent value="all">
            <DataTable columns={columns} data={data.allUsers} />
          </TabsContent>
          <TabsContent value="active">
            <DataTable columns={columns} data={data.isActive} />
          </TabsContent>
          <TabsContent value="non-active">
            <DataTable columns={columns} data={data.isNotActive} />
          </TabsContent>
        </Tabs>
        {/* <button onClick={() => void mutate()}>Add</button> */}
      </section>
    </div>
  );
};

export default index;

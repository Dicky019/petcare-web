import { Status, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { type IPemesananLayanan } from "~/types/pemesanan-layanan";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

export const columns: ColumnDef<IPemesananLayanan>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<Status>("status");
      const variant =
        status == "failed"
          ? "destructive"
          : status == "pending"
          ? "outline"
          : status == "processing"
          ? "secondary"
          : "default";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.getValue<User>("user");
      const avatarFallback = (user?.name ?? "")
        .split(" ", 2)
        .map((v) => v[0])
        .join("");
      return (
        <div className="flex flex-row gap-x-3 align-middle font-medium">
          <Avatar>
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt={user?.name ?? "@shadcn"}
            />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-1">
            <div>{user?.name ?? "shadcn"}</div>
            <div className="text-xs text-gray-500">
              {user?.email ?? "shadcn@gmail.com"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "namaHewan",
    header: "Nama Hewan",
  },
  {
    accessorKey: "jenisKelaminHewan",
    header: () => <div className="w-36">Jenis Kelamin Hewan</div>,
    cell: ({ row }) => {
      const jenisKelaminHewan = row
        .getValue<string>("jenisKelaminHewan")
        .split("")
        .map((v, i) => (i === 0 ? v.toUpperCase() : v));
      return jenisKelaminHewan;
    },
  },
  {
    accessorKey: "umurHewan",
    header: "Umur Hewan",
  },
  {
    accessorKey: "kategoriHewan",
    header: "Kategori Hewan",
  },
  {
    accessorKey: "keluhan",
    header: () => <div className="text-right">Keluhan</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // const payment = row.original;

      const listStatus = [
        Status.success,
        Status.processing,
        Status.pending,
        Status.failed,
      ];
      const id = row.getValue<string>("id");
      console.log({ id });

      const status = row.getValue<Status>("status");

      const trpc = api.useContext();

      const { mutate } = api.pemesananLayanan.changeStatus.useMutation({
        onSettled: async (data, error) => {
          error && void toast.error(error?.message);
          data && void toast.success(data.user.name);
          await trpc.pemesananLayanan.getAll.invalidate();
        },
      });

      const updateStatus = (status: Status) =>
        mutate({
          id,
          status,
        });

      const listChangeStatus = listStatus
        .filter((filter) => filter != status)
        .map((v) => (
          <DropdownMenuItem key={v} onClick={() => updateStatus(v)}>
            Change Status {v}
          </DropdownMenuItem>
        ));

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {listChangeStatus}
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

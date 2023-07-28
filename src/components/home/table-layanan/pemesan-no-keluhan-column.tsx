import { type Status, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { type IPemesananLayanan } from "~/types/pemesanan-layanan";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { RowActions } from "./row-action";
import { displayJam } from "~/utils/function";

export const pemesanNoKeluhanColumns: ColumnDef<IPemesananLayanan>[] = [
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
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => row.getValue<string>("tanggal").toUpperCase(),
  },
  {
    accessorKey: "jam",
    header: "Jam",
    cell: ({ row }) => displayJam(row.getValue<string>("tanggal")).toUpperCase(),
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
  // {
  //   accessorKey: "keluhan",
  //   header: () => <div className="text-right">Keluhan</div>,
  //   cell: ({ row }) => {
  //     const jenisKelaminHewan = row.getValue<string>("keluhan");
  //     return jenisKelaminHewan;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <RowActions pemesananLayanan={row.original} />,
  },
];

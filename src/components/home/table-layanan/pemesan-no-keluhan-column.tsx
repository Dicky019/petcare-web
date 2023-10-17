import { type Status } from "@prisma/client";
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
      const user = row.original.user;
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
            <div className="text-xs text-gray-500">{user?.noHP ?? "-"}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "namaHewan",
    header: "Hewan",
    cell: ({ row }) => {
      const data = row.original;
      const jenisKelaminHewan = data.jenisKelaminHewan
        .split("")
        .map((v, i) => (i === 0 ? v.toUpperCase() : v))
        .join("");
      return (
        <div className="flex flex-col gap-y-1">
          <div>{data.namaHewan + " / " + data.kategoriHewan}</div>
          <div className="text-xs text-gray-500">
            {data.umurHewan + " / " + jenisKelaminHewan}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex w-24 flex-col gap-y-1">
          <div>{data.tanggal ?? "shadcn"}</div>
          <div className="text-xs text-gray-500">
            {displayJam(data.jam) ?? "shadcn@gmail.com"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tambahanPemesanan",
    header: "Tambahan Pemesanan",
    cell: ({ row }) => {
      const data = row.original;
      const list = data.pemesananTambahan?.map((v) => v.value) ?? [];
      return list.length != 0 ? list.join(", ") : "-";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions pemesananLayanan={row.original} />,
  },
];

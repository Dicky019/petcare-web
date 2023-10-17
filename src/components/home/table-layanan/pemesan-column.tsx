import { type Status } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { type IPemesananLayanan } from "~/types/pemesanan-layanan";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { RowActions } from "./row-action";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Button } from "~/components/ui/button";
import { SiCodereview } from "react-icons/si";
import { displayJam } from "~/utils/function";

export const pemesanColumns: ColumnDef<IPemesananLayanan>[] = [
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
            <div className="text-xs text-gray-500">
              {user?.noHP ?? "shadcn@gmail.com"}
            </div>
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
    accessorKey: "keluhan",
    header: "Keluhan",
    cell: ({ row }) => {
      const keluhan = row.getValue<string>("keluhan");
      return (
        <div className="flex items-center gap-x-2">
          <div className="line-clamp-2 max-w-[250px] text-left font-medium">
            {keluhan}
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <Button size="sm" variant="outline">
                <SiCodereview />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="text-left">
              <div className="mb-1 text-lg font-semibold">Keluhan</div>
              <div>{keluhan}</div>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
    },
  },
  {
    accessorKey: "hasilKonsultasi",
    header: "Hasil Keluhan",
    cell: ({ row }) => {
      const keluhan = row.getValue<string>("hasilKonsultasi");
      return !keluhan ? (
        "-"
      ) : (
        <div className="flex items-center gap-x-2">
          <div className="line-clamp-2 max-w-[250px] text-left font-medium">
            {keluhan}
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <Button size="sm" variant="outline">
                <SiCodereview />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="text-left">
              <div className="mb-1 text-lg font-semibold">Hasil Keluhan</div>
              <div>{keluhan}</div>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
    },
  },
  {
    accessorKey: "pemesananTambahanId",
    header: "Pemesanan Tambahan",
    cell: ({ row }) => {
      const data = row.original;
      return data.pemesananTambahan?.value ?? "-";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions pemesananLayanan={row.original} />,
  },
];

// import React from "react";

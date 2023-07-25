import { type Status, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { type IPemesananLayanan } from "~/types/pemesanan-layanan";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { RowActions } from "./row-action";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { Button } from "~/components/ui/button";
import { SiCodereview } from "react-icons/si";

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
    accessorKey: "hari",
    header: "Hari",
  },
  {
    accessorKey: "jam",
    header: "Jam",
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
    cell: ({ row }) => {
      const keluhan = row.getValue<string>("keluhan");
      return  (<div className="flex items-center gap-x-2">
      <div className="text-left max-w-[250px] line-clamp-2 font-medium">
        {keluhan}
      </div>
      <HoverCard>
        <HoverCardTrigger>
          <Button size="sm" variant="outline">
            <SiCodereview />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="text-left">
          <div className="font-semibold mb-1 text-lg">Keluhan</div>
          <div>{keluhan}</div>
        </HoverCardContent>
      </HoverCard>
    </div>);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions pemesananLayanan={row.original} />,
  },
];

// import React from "react";

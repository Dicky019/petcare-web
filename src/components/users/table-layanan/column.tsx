// import { type Status, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";

import { type IUsers } from "~/types/users";
import { RowActions } from "../row-action";

export const columns: ColumnDef<IUsers>[] = [
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<boolean>("isActive");
      const variant = status == false ? "destructive" : "default";
      const content = status == false ? "Non Active" : "Active";
      return <Badge variant={variant}>{content}</Badge>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue<string>("image");
      const name = row.getValue<string>("name");

      const avatarFallback = (name ?? "")
        .split(" ", 2)
        .map((v) => v[0])
        .join("");

      return (
        <Avatar>
          <AvatarImage
            src={image || "https://github.com/shadcn.png"}
            alt={name ?? "@shadcn"}
          />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "noHP",
    header: "No.HP",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions user={row.original} />,
  },
];

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type IJadwalLayanan } from "~/types/jadwal-layanan";
import { DialogForm } from "../dialog/dialog-form";
import { displayJam } from "~/utils/function";

export const columns: ColumnDef<IJadwalLayanan>[] = [
  {
    accessorKey: "hari",
    header: "Hari",
    cell: ({ row }) => {
      const hari = row.getValue<string>("hari").toUpperCase();
      return hari;
    },
  },
  {
    accessorKey: "jam",
    header: "Jam",
    cell: ({ row }) => {
      const jam = row.getValue<string>("jam");
      return displayJam(jam);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

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
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogForm data={data}>
              <DropdownMenuItem>Update</DropdownMenuItem>
            </DialogForm>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

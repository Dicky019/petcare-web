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
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { AlertDialog } from "~/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { AlertDialogDelete } from "~/components/alert-dialog-delete";
import { api } from "~/utils/api";
import { serviceDeleteJadwalLayanan } from "~/service/jadwal-layanan";

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
      const { mutate } = serviceDeleteJadwalLayanan();

      return (
        <AlertDialog>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogForm data={data} />
          </Dialog>
          <AlertDialogDelete onContinue={() => mutate(data.id)} />
        </AlertDialog>
      );
    },
  },
];

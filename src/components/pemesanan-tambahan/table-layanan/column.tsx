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


import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { AlertDialog } from "~/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { AlertDialogDelete } from "~/components/alert-dialog-delete";
import { type IPemesananTambahan } from "~/types/pemesanan-tambahan";
import { serviceDeletePemesananTambahan } from "~/service/pemesanan-tambahan";
import { DialogForm } from "../dialog/dialog-form";

export const columns: ColumnDef<IPemesananTambahan>[] = [
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const value = row.getValue<string>("value").toUpperCase();
      return value;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const { mutate } = serviceDeletePemesananTambahan();

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
            <DialogForm  data={data} />
          </Dialog>
          <AlertDialogDelete onContinue={() => mutate(data.id)} />
        </AlertDialog>
      );
    },
  },
];

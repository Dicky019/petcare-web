import { Status } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { AlertDialogDelete } from "~/components/alert-dialog-delete";
import { AlertDialog, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type IPemesananLayanan } from "~/types/pemesanan-layanan";
import { api } from "~/utils/api";

export const RowActions = ({
  pemesananLayanan,
}: {
  pemesananLayanan: IPemesananLayanan;
}) => {
  const listStatus = [
    Status.success,
    Status.processing,
    Status.pending,
    Status.failed,
  ];

  const status = pemesananLayanan.status;
  const id = pemesananLayanan.id;
  console.log({ id });

  const trpc = api.useContext();

  const { mutate: deleteMutate } = api.pemesananLayanan.delete.useMutation({
    onSettled: async (data, error) => {
      error && void toast.error(error?.message);
      data && void toast.success(data.user.name);
      await trpc.pemesananLayanan.getAll.invalidate();
    },
  });

  const { mutate: changeStatusMutate } =
    api.pemesananLayanan.changeStatus.useMutation({
      onSettled: async (data, error) => {
        error && void toast.error(error?.message);
        data && void toast.success(data.user.name);
        await trpc.pemesananLayanan.getAll.invalidate();
      },
    });

  const updateStatus = (status: Status) =>
    changeStatusMutate({
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
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          {listChangeStatus}
          {pemesananLayanan.jenisLayanan != "grooming" &&
            pemesananLayanan.status == "success" && (
              <Link href={"/add-konsultasi/" + id}>
                <DropdownMenuItem>Add Hasil Konsultasi</DropdownMenuItem>
              </Link>
            )}
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogDelete onContinue={() => deleteMutate(id)} />
    </AlertDialog>
  );
};

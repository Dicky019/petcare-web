import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { AlertDialogDelete } from "~/components/alert-dialog-delete";
import { AlertDialog, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { IUsers } from "~/types/users";
import { api } from "~/utils/api";

export const RowActions = ({ user }: { user: IUsers }) => {
  const isActive = !user.isActive;
  const id = user.id;
  console.log({ id });

  const trpc = api.useContext();

  const { mutate: deleteMutate } = api.users.delete.useMutation({
    onSettled: async (data, error) => {
      error && void toast.error(error?.message);
      data && void toast.success(data.name);
      await trpc.users.getAll.invalidate();
    },
  });

  const { mutate: changeStatusMutate } = api.users.changeStatus.useMutation({
    onSettled: async (data, error) => {
      error && void toast.error(error?.message);
      data && void toast.success(data.name);
      await trpc.users.getAll.invalidate();
    },
  });

  const updateStatus = () =>
    changeStatusMutate({
      id,
      isActive,
    });

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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <AlertDialogTrigger asChild> */}
          <DropdownMenuItem onClick={updateStatus}>
            Change Status
          </DropdownMenuItem>
          {/* </AlertDialogTrigger> */}
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogDelete onContinue={() => deleteMutate(id)} />
    </AlertDialog>
  );
};

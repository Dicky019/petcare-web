import { type JenisLayanan, type PemesananTambahan } from "@prisma/client";
import { type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type ISelectItem } from "~/types/jadwal-layanan";

import { PemesananTambahanForm } from "./pemesanan-tambahan-form";

interface IDialogFormProps {
  data?: PemesananTambahan;
  children?: ReactNode;
  jenisLayanan?: JenisLayanan;
}

export function DialogForm({ data, children,jenisLayanan }: IDialogFormProps) {
  // const dialogDescriptionEdit =
  //   "Make changes to your Jadwal here. Click save when you're done.";
  // const dialogDescriptionAdd =
  //   "Make changes to your Jadwal here. Click save when you're done.";

  const DialogContentForm = () => (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{data ? "Edit" : "Tambah"} Pemesanan Tambahan</DialogTitle>
        {/* <DialogDescription>
          {data ? dialogDescriptionEdit : dialogDescriptionAdd}
        </DialogDescription> */}
      </DialogHeader>
      <PemesananTambahanForm jenisLayanan={jenisLayanan} data={data} />
    </DialogContent>
  );

  if (data) {
    return <DialogContentForm />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentForm />
    </Dialog>
  );
}

interface ISelectFormProps {
  value?: string;
  placeholder?: string;
  listItemValue: ISelectItem[];
  id: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const SelectForm = ({
  value,
  placeholder,
  listItemValue,
  id,
  onChange,
  disabled,
}: ISelectFormProps) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent id={id}>
        {listItemValue.map(({ value, display }) => (
          <SelectItem key={value} value={value}>
            {display}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

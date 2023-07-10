import { type JenisLayanan, type JadwalLayanan } from "@prisma/client";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type ISelectItem } from "~/types/jadwal-layanan";
import {
  listHariForm,
  listJamGroumingForm,
  listJamKesehatanKonsultasiForm,
  listJenisLayananForm,
} from "~/utils/data";
import { JadwalLayananForm } from "./jadwal-layanan-form";

interface IDialogFormProps {
  data?: JadwalLayanan;
  children: ReactNode;
  // name: string;
}

export function DialogForm({ data, children }: IDialogFormProps) {
  const dialogDescriptionEdit =
    "Make changes to your Jadwal here. Click save when you're done.";
  const dialogDescriptionAdd =
    "Make changes to your Jadwal here. Click save when you're done.";

  const [jenisLayanan, setJenisLayanan] = useState(data?.jenisLayanan);

  const [listJamForm, setListJamForm] = useState<ISelectItem[]>([]);

  const changeJenisLayanan = (v: string) =>
    void setJenisLayanan(v as JenisLayanan);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button size={"lg"}>
          Add {name}
        </Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? "Edit" : "Add"} Jadwal</DialogTitle>
          <DialogDescription>
            {data ? dialogDescriptionEdit : dialogDescriptionAdd}
          </DialogDescription>
        </DialogHeader>
        {/* 
            jam: string;
            hari: Hari;
            jenisLayanan: JenisLayanan;
        */}
        <JadwalLayananForm data={data} />
        {/* <DialogFooter>
          <Button type="submit">Save {data ? "changes" : "Jadwal"}</Button>
        </DialogFooter> */}
      </DialogContent>
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

/* eslint-disable @typescript-eslint/no-misused-promises */
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "~/utils/utils";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Icons } from "~/components/icons";
import {
  type IJadwalLayanan,
  type ISelectItem,
  formCreateSchema,
} from "~/types/jadwal-layanan";
import { type z } from "zod";
import { SelectForm } from "./dialog-form";
import { useEffect, useState } from "react";
import { type JenisLayanan } from "@prisma/client";
import {
  listHariForm,
  listJamGroumingForm,
  listJamKesehatanKonsultasiForm,
  listJenisLayananForm,
} from "~/utils/data";
import {
  serviceCreateJadwalLayanan,
  serviceEditJadwalLayanan,
} from "~/service/jadwal-layanan";

type UserAuthFormProps = {
  data?: IJadwalLayanan;
  jenisLayananOld?: JenisLayanan;
} & React.HTMLAttributes<HTMLDivElement>;

export function JadwalLayananForm({
  className,
  data,
  jenisLayananOld,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [jenisLayanan, setJenisLayanan] = useState(data?.jenisLayanan ?? jenisLayananOld);

  const [listJamForm, setListJamForm] = useState<ISelectItem[]>([]);

  const desJam =
    jenisLayanan === undefined ? "Pilih Jenis Layanan Lebih Dulu" : "Jam";

  const changeJenisLayanan = (v: string) => {
    void form.setValue("jenisLayanan", v);
    void setJenisLayanan(v as JenisLayanan);
  };

  const changeHari = (v: string) => {
    void form.setValue("hari", v);
  };

  const changeJam = (v: string) => {
    void form.setValue("jam", v);
  };

  useEffect(() => {
    if (jenisLayanan == "grooming") {
      setListJamForm(listJamGroumingForm);
    } else {
      setListJamForm(listJamKesehatanKonsultasiForm);
    }
  }, [jenisLayanan]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formCreateSchema>>({
    resolver: zodResolver(formCreateSchema),
    defaultValues: {
      hari: data?.hari,
      jam: data?.jam,
      jenisLayanan: data?.jenisLayanan ?? jenisLayananOld,
    },
  });

  const { mutateAsync: create } = serviceCreateJadwalLayanan({ form });
  const { mutateAsync: edit } = serviceEditJadwalLayanan({ form });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formCreateSchema>) {
    setIsLoading((v) => !v);
    console.log({ data });

    if (data) {
      await edit({ id: data.id, ...values });
    } else {
      await create(values);
    }
    setIsLoading((v) => !v);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
            <div className="mb-1">
              <FormField
                control={form.control}
                name="jenisLayanan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Layanan</FormLabel>
                    <FormControl>
                      <SelectForm
                        id="jenisLayanan"
                        placeholder="Jenis Layanan"
                        value={field.value}
                        onChange={changeJenisLayanan}
                        listItemValue={listJenisLayananForm}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="hari"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari</FormLabel>
                    <FormControl>
                      <SelectForm
                        id="hari"
                        placeholder="Hari"
                        value={field?.value}
                        onChange={changeHari}
                        listItemValue={listHariForm}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="jam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam </FormLabel>
                    <FormControl>
                      <SelectForm
                        id="jam"
                        placeholder={desJam}
                        value={field?.value}
                        listItemValue={listJamForm}
                        onChange={changeJam}
                        disabled={form.getValues("jenisLayanan") === undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="my-4" disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {data ? "Edit" : "Tambah"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input/>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

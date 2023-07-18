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
} & React.HTMLAttributes<HTMLDivElement>;

export function JadwalLayananForm({
  className,
  data,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [jenisLayanan, setJenisLayanan] = useState(data?.jenisLayanan);

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
      jenisLayanan: data?.jenisLayanan,
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

// {
/* <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form> */
// }
// {
/* Form */
// }

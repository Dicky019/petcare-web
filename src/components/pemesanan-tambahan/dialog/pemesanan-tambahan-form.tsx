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
  type IPemesananTambahan,
  // type ISelectItem,
  formCreateSchema,
} from "~/types/pemesanan-tambahan";

import { type z } from "zod";
import { SelectForm } from "./dialog-form";

import { listJenisLayananForm } from "~/utils/data";
import {
  serviceCreatePemesananTambahan,
  serviceEditPemesananTambahan,
} from "~/service/pemesanan-tambahan";
import { Input } from "~/components/ui/input";
import { type JenisLayanan } from "@prisma/client";

type UserAuthFormProps = {
  data?: IPemesananTambahan;
  jenisLayanan?: JenisLayanan;
} & React.HTMLAttributes<HTMLDivElement>;

export function PemesananTambahanForm({
  className,
  data,
  jenisLayanan,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const changeJenisLayanan = (v: string) => {
    void form.setValue("jenisLayanan", v);
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formCreateSchema>>({
    resolver: zodResolver(formCreateSchema),
    defaultValues: {
      value: data?.value,
      jenisLayanan: data?.jenisLayanan ?? jenisLayanan,
    },
  });

  const { mutateAsync: create } = serviceCreatePemesananTambahan({ form });
  const { mutateAsync: edit } = serviceEditPemesananTambahan({ form });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formCreateSchema>) {
    setIsLoading((v) => !v);

    if (data && data.id) {
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
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input placeholder="value" {...field} />
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

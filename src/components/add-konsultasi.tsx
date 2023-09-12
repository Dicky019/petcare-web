/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const FormSchema = z.object({
  hasilKonsultasi: z
    .string()
    .min(10, {
      message: "HasilKonsultasi must be at least 10 characters.",
    })
    .max(320, {
      message: "HasilKonsultasi must not be longer than 60 characters.",
    }),
});

export function TextareaForm({ id }: { id: string | string[] | undefined }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    data: oltData,
    isLoading,
    isError,
    error,
    refetch,
  } = api.pemesananLayanan.getById.useQuery(id?.toString() ?? "", {
    enabled: typeof id === "string",
    onSuccess(data) {
      form.setValue("hasilKonsultasi", data?.hasilKonsultasi ?? "");
    },
  });

  const { mutateAsync } =
    api.pemesananLayanan.updateHasilKonsultasi.useMutation({
      onSettled: async () => {
        await refetch();
      },
    });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!oltData) {
      return;
    }
    await toast.promise(
      mutateAsync({
        ...oltData,
        hasilKonsultasi: data.hasilKonsultasi,
      }),
      {
        loading: "Saving...",
        success: <b>saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* {JSON.stringify(form.getValues(), null, 2)}
        {JSON.stringify(oltData, null, 2)} */}
        <FormField
          control={form.control}
          name="hasilKonsultasi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasil Konsultasi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

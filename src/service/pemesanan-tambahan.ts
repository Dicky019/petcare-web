import { type JenisLayanan } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { type z } from "zod";
import { type IPrismaProps } from "~/server/db";
import { type formCreateSchema } from "~/types/pemesanan-tambahan";
import { api } from "~/utils/api";

export const getAllPemesananTambahan = async ({
  prisma,
  jenisLayanan,
}: {
  prisma: IPrismaProps;
  jenisLayanan: JenisLayanan;
}) => {
  return await prisma.pemesananTambahan.findMany({
    where: {
      jenisLayanan,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

interface ValidatedProps {
  prisma: IPrismaProps;
  jenisLayanan: JenisLayanan;
  value: string;
}

export const validated = async ({ prisma, ...value }: ValidatedProps) => {
  const validated = await prisma.pemesananTambahan.findFirst({
    where: {
      ...value,
    },
  });

  if (validated) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Data is Already",
      // optional: pass the original error to retain stack trace
      // cause: theError,
    });
  }
};

interface Iform {
  form: UseFormReturn<z.infer<typeof formCreateSchema>>;
}

export const serviceCreatePemesananTambahan = ({ form }: Iform) => {
  const trpc = api.useContext();

  const createPemesananTambahan = api.pemesananTambahan.create.useMutation({
    onError: (err, newPemesananTambahan) => {
      toast.error(err.message);
      // Clear input
      form.reset(newPemesananTambahan);
    },
    onSuccess: ({ value, jenisLayanan }) => {
      toast.success(`Berhasil Menambahkan ${jenisLayanan} ${value}`);
      form.reset();
    },
    // Always refetch after error or success:
    onSettled: async () => {
      console.log("SETTLED");
      await trpc.pemesananTambahan.getAll.invalidate();
    },
  });

  return createPemesananTambahan;
};

export const serviceEditPemesananTambahan = ({ form }: Iform) => {
  const trpc = api.useContext();

  const createPemesananTambahan = api.pemesananTambahan.edit.useMutation({
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newPemesananTambahan) => {
      toast.error(err.message);
      // Clear input
      form.reset(newPemesananTambahan);
    },
    onSuccess: ({ value, jenisLayanan }) => {
      toast.success(`Berhasil Mengupdate ${jenisLayanan} ${value}`);
      form.reset({
        value,
        jenisLayanan,
      });
    },
    // Always refetch after error or success:
    onSettled: async () => {
      console.log("SETTLED");
      await trpc.pemesananTambahan.getAll.invalidate();
    },
  });

  return createPemesananTambahan;
};

export const serviceDeletePemesananTambahan = () => {
  const trpc = api.useContext();

  const createPemesananTambahan = api.pemesananTambahan.delete.useMutation({
    onSettled: async (values, error, value) => {
      console.log("SETTLED", value);
      await trpc.pemesananTambahan.getAll.invalidate();
      if (values) {
        const value = values.value;
        const jenisLayanan = values.jenisLayanan;
        toast.success(`Berhasil Menghapus ${jenisLayanan} ${value}`);
      } else if (error) {
        toast.success(`Error ${error.message}`);
      }
    },
  });

  return createPemesananTambahan;
};

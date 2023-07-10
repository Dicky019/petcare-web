import { faker } from "@faker-js/faker";
import { Hari, JenisLayanan, Status } from "@prisma/client";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { IJadwalLayanan, formCreateSchema } from "~/types/jadwal-layanan";
import { api } from "~/utils/api";

interface IPemesananLayananProps {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  // jenisLayanan?: JenisLayanan;
}

export const getAllJadwalLayanan = async ({
  prisma,
}: IPemesananLayananProps) => {
  return await Promise.all([
    prisma.jadwalLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.grooming,
      },
    }),
    prisma.jadwalLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.kesehatan,
      },
    }),
    prisma.jadwalLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.konsultasi,
      },
    }),
  ]);
};

interface IPembelajaranProps {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

export async function layananFake({ prisma }: IPembelajaranProps) {
  const user = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
      emailVerified: new Date(),
      isActive: faker.datatype.boolean(),
    },
  });

  const pemesananLayanan = await prisma.pemesananLayanan.create({
    data: {
      noHP: "081355834769",
      umurHewan: "16",
      status: Status.processing,
      namaHewan: "Hewan",
      keluhan: "loremmmmm",
      jenisKelaminHewan: "betina",
      jenisLayanan: "grooming",
      kategoriHewan: "changeStatus",
      userId: user.id,
    },
  });

  await prisma.layananGrouming.create({
    data: {
      pilihJamGrouming: "jam09_12",
      pemesananLayananId: pemesananLayanan.id,
    },
  });
}

interface Iform {
  form: UseFormReturn<z.infer<typeof formCreateSchema>>;
}

export const serviceCreateJadwalLayanan = ({ form }: Iform) => {
  const trpc = api.useContext();

  const createJadwalLayanan = api.jadwalLayanan.create.useMutation({
    onMutate: async (newJadwalLayanan) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await trpc.jadwalLayanan.getAll.cancel();

      const hari = newJadwalLayanan.hari as Hari;
      const jenisLayanan = newJadwalLayanan.jenisLayanan as JenisLayanan;
      const jam = newJadwalLayanan.jam;

      // Snapshot the previous value
      const previousJadwalLayanans = trpc.jadwalLayanan.getAll.getData();

      // Optimistically update to the new value
      trpc.jadwalLayanan.getAll.setData(undefined, (prev) => {
        const optimisticJadwalLayanan: IJadwalLayanan = {
          id: "optimistic-todo-id",
          hari,
          jam,
          createdAt: new Date(),
          updatedAt: new Date(),
          jenisLayanan: jenisLayanan,
        };
        const layananGrouming = prev?.layananGrouming ?? [];

        const layananKesehatan = prev?.layananKesehatan ?? [];
        const layananKonsultasi = prev?.layananKonsultasi ?? [];

        if (jenisLayanan === "grooming") {
          layananGrouming.push(optimisticJadwalLayanan);
        } else if (jenisLayanan === "kesehatan") {
          layananKesehatan.push(optimisticJadwalLayanan);
        } else {
          layananKonsultasi.push(optimisticJadwalLayanan);
        }

        return {
          layananGrouming: layananGrouming,
          layananKesehatan: layananKesehatan,
          layananKonsultasi: layananKonsultasi,
        };
      });

      // Clear input
      form.reset(newJadwalLayanan);

      // Return a context object with the snapshotted value
      return { previousJadwalLayanans };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newJadwalLayanan, context) => {
      toast.error("An error occured when creating todo");
      // Clear input
      form.reset(newJadwalLayanan);

      if (!context) return;
      trpc.jadwalLayanan.getAll.setData(
        undefined,
        () => context.previousJadwalLayanans
      );
    },
    onSuccess: ({ hari, jam, jenisLayanan }) => {
      toast.success(`Berhasil Menambahkan ${jenisLayanan} ${hari}, ${jam}`);
      form.reset({
        hari : undefined,
        jam : undefined,
        jenisLayanan : undefined
      });
    },
    // Always refetch after error or success:
    onSettled: async () => {
      console.log("SETTLED");
      await trpc.jadwalLayanan.getAll.invalidate();
    },
  });

  return createJadwalLayanan;
};

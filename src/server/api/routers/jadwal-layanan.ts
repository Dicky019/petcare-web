import { type Hari, type JenisLayanan } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getAllJadwalLayanan } from "~/service/jadwal-layanan";
import { formCreateSchema } from "~/types/jadwal-layanan";

export const jadwalLayananRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const [allLayananGrooming, allLayananKesehatan, allLayananKonsultasi] =
      await getAllJadwalLayanan({
        prisma: ctx.prisma,
      });

    return {
      layananGrouming: allLayananGrooming,
      layananKesehatan: allLayananKesehatan,
      layananKonsultasi: allLayananKonsultasi,
    };
  }),

  create: protectedProcedure
    .input(formCreateSchema)
    .mutation(({ ctx, input }) => {
      const jenisLayanan = input.jenisLayanan as JenisLayanan;
      const hari = input.hari as Hari;
      const jam = input.jam;
      return ctx.prisma.jadwalLayanan.create({
        data: {
          jenisLayanan,
          jam,
          hari,
        },
      });
    }),
});

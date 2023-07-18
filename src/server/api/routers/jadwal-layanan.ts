import { type Hari, type JenisLayanan } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getAllJadwalLayanan, validated } from "~/service/jadwal-layanan";
import { formCreateSchema, formEditSchema } from "~/types/jadwal-layanan";

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
    .mutation(async ({ ctx, input }) => {
      const jenisLayanan = input.jenisLayanan as JenisLayanan;
      const hari = input.hari as Hari;
      const jam = input.jam;

      await validated({
        prisma: ctx.prisma,
        hari,
        jenisLayanan,
        jam,
      });

      return ctx.prisma.jadwalLayanan.create({
        data: {
          jenisLayanan,
          jam,
          hari,
        },
      });
    }),
  edit: protectedProcedure.input(formEditSchema).mutation(async ({ ctx, input }) => {
    const jenisLayanan = input.jenisLayanan as JenisLayanan;
    const hari = input.hari as Hari;
    const jam = input.jam;

    await validated({
      prisma: ctx.prisma,
      hari,
      jenisLayanan,
      jam,
    });

    return ctx.prisma.jadwalLayanan.update({
      data: {
        jenisLayanan,
        jam,
        hari,
      },
      where: {
        id: input.id,
      },
    });
  }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.jadwalLayanan.delete({
      where: {
        id: input,
      },
    });
  }),
});

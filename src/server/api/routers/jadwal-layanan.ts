import { type Hari, type JenisLayanan } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getAllJadwalLayanan, validated } from "~/service/jadwal-layanan";
import { formCreateSchema, formEditSchema } from "~/types/jadwal-layanan";
import { listHari } from "~/utils/data";

export const jadwalLayananRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const [allLayananGrooming, allLayananKesehatan, allLayananKonsultasi] =
      await getAllJadwalLayanan({
        prisma: ctx.prisma,
      });

    const filterByHari = (hari: string) => {
      const haris = Object.entries(listHari);
      console.log({ haris, hari });
      const hariKey = haris.find((h) => h[1] === hari)?.[0];
      return hariKey ?? "0";
    };

    return {
      layananGrouming: allLayananGrooming.sort((a,b) => {
        const hariA = filterByHari(a.hari)
        const hariB = filterByHari(b.hari)
        return Number(hariA) - Number(hariB);
      }),
      layananKesehatan: allLayananKesehatan.sort((a,b) => {
        const hariA = filterByHari(a.hari)
        const hariB = filterByHari(b.hari)
        return Number(hariA) - Number(hariB);
      }),,
      layananKonsultasi: allLayananKonsultasi.sort((a,b) => {
        const hariA = filterByHari(a.hari)
        const hariB = filterByHari(b.hari)
        return Number(hariA) - Number(hariB);
      }),
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
  edit: protectedProcedure
    .input(formEditSchema)
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

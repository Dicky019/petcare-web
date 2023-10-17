import { type JenisLayanan } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  getAllPemesananTambahan,
  validated,
} from "~/service/pemesanan-tambahan";
import { formCreateSchema, formEditSchema } from "~/types/pemesanan-tambahan";

export const pemesananTambahanRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const allpemesananTambahan = await getAllPemesananTambahan({
      prisma: ctx.prisma,
      jenisLayanan: input as JenisLayanan,
    });

    return allpemesananTambahan;
  }),

  create: protectedProcedure
    .input(formCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const jenisLayanan = input.jenisLayanan as JenisLayanan;
      const value = input.value;

      await validated({
        prisma: ctx.prisma,
        jenisLayanan,
        value,
      });

      return ctx.prisma.pemesananTambahan.create({
        data: {
          jenisLayanan,
          value,
        },
      });
    }),
  edit: protectedProcedure
    .input(formEditSchema)
    .mutation(async ({ ctx, input }) => {
      const jenisLayanan = input.jenisLayanan as JenisLayanan;
      const value = input.value;

      await validated({
        prisma: ctx.prisma,
        jenisLayanan,
        value,
      });

      return ctx.prisma.pemesananTambahan.update({
        data: {
          jenisLayanan,
          value,
        },
        where: {
          id: input.id,
        },
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.pemesananTambahan.delete({
      where: {
        id: input,
      },
    });
  }),
});

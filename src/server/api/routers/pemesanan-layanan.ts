import { type JenisLayanan, Status } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  // layananFake,
  getAllPemesananLayanan,
} from "~/service/pemesanan-layanan";

export const pemesananLayananRouter = createTRPCRouter({
  changeStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { id, status } }) => {
      return ctx.prisma.pemesananLayanan.update({
        where: {
          id,
        },
        data: {
          status: status as Status,
        },
        select: {
          user: true,
        },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.prisma.pemesananLayanan.delete({
      where: {
        id: input,
      },

      select: {
        user: true,
      },
    });
  }),

  updateHasilKonsultasi: publicProcedure
    .input(
      z.object({
        id: z.string(),
        hasilKonsultasi: z.string(),
      })
    )
    .mutation(({ ctx, input: { id, hasilKonsultasi } }) => {
      return ctx.prisma.pemesananLayanan.update({
        where: {
          id,
        },
        data: {
          hasilKonsultasi,
        },
      });
    }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input: id }) => {
    return ctx.prisma.pemesananLayanan.findUnique({
      where: {
        id,
      },
    });
  }),

  getAll: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const jenisLayanan = input as JenisLayanan;
    const lastDay = Date.now() - 24 * 60 * 60 * 1000;

    const allLayanan = await getAllPemesananLayanan({
      prisma: ctx.prisma,
      where: {
        jenisLayanan,
      },
    });

    const successLayanan = await getAllPemesananLayanan({
      prisma: ctx.prisma,
      where: { jenisLayanan, status: Status.success },
    });

    const pendingLayanan = await getAllPemesananLayanan({
      prisma: ctx.prisma,
      where: { jenisLayanan, status: Status.pending },
    });

    const processingLayanan = await getAllPemesananLayanan({
      prisma: ctx.prisma,
      where: { jenisLayanan, status: Status.processing },
    });

    const failedLayanan = await getAllPemesananLayanan({
      prisma: ctx.prisma,
      where: { jenisLayanan, status: Status.failed },
    });

    const todayPemesananLayanan = await getAllPemesananLayanan({
      prisma: ctx.prisma,
      where: {
        jenisLayanan,
        createdAt: {
          gte: new Date(lastDay).toISOString(),
        },
      },
    });

    return {
      allPemesananLayanan: allLayanan,
      todayPemesananLayanan: todayPemesananLayanan,
      success: successLayanan,
      processing: processingLayanan,
      pending: pendingLayanan,
      failed: failedLayanan,
    };
  }),
});

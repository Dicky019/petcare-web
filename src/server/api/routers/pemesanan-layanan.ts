import { Status } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sameDay } from "~/utils/function";
import {
  layananFake,
  getAllPemesananLayanan,
} from "~/service/pemesanan-layanan";

const date = new Date();

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

  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.pemesananLayanan.delete({
        where: {
          id : input,
        },
        
        select: {
          user: true,
        },
      });
    }),

  create: publicProcedure.mutation(async ({ ctx }) => {
    await layananFake({
      prisma: ctx.prisma,
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const [allLayananGrooming, allLayananKesehatan, allLayananKonsultasi] =
      await getAllPemesananLayanan({
        prisma: ctx.prisma,
      });

    const [successGrouming, successKesehatan, successKonsultasi] =
      await getAllPemesananLayanan({
        prisma: ctx.prisma,
        status: Status.success,
      });

    const [pendingGrouming, pendingKesehatan, pendingKonsultasi] =
      await getAllPemesananLayanan({
        prisma: ctx.prisma,
        status: Status.pending,
      });

    const [processingGrouming, processingKesehatan, processingKonsultasi] =
      await getAllPemesananLayanan({
        prisma: ctx.prisma,
        status: Status.processing,
      });

    const [failedGrouming, failedKesehatan, failedKonsultasi] =
      await getAllPemesananLayanan({
        prisma: ctx.prisma,
        status: Status.failed,
      });

    const todayPemesananLayananGrouming = allLayananGrooming.filter(
      ({ createdAt }) => sameDay(createdAt, date)
    );

    const todayPemesananLayananKesehatan = allLayananKesehatan.filter(
      ({ createdAt }) => sameDay(createdAt, date)
    );

    const todayPemesananLayananKonsultasi = allLayananKonsultasi.filter(
      ({ createdAt }) => sameDay(createdAt, date)
    );

    return {
      layananGrouming: {
        allPemesananLayanan: allLayananGrooming,
        todayPemesananLayanan: todayPemesananLayananGrouming,
        success: successGrouming,
        processing: processingGrouming,
        pending: pendingGrouming,
        failed: failedGrouming,
      },
      layananKesehatan: {
        allPemesananLayanan: allLayananKesehatan,
        todayPemesananLayanan: todayPemesananLayananKesehatan,
        success: successKesehatan,
        processing: processingKesehatan,
        pending: pendingKesehatan,
        failed: failedKesehatan,
      },
      layananKonsultasi: {
        allPemesananLayanan: allLayananKonsultasi,
        todayPemesananLayanan: todayPemesananLayananKonsultasi,
        success: successKonsultasi,
        processing: processingKonsultasi,
        pending: pendingKonsultasi,
        failed: failedKonsultasi,
      },
    };
  }),
});

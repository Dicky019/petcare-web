import { Status } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pemesananLayanan, sameDay } from "~/utils/function";

const date = new Date(0);

export const pemesananLayananRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [allLayananGrooming, allLayananKesehatan, allLayananKonsultasi] =
      await pemesananLayanan({
        prisma: ctx.prisma,
      });

    const [successGrouming, successKesehatan, successKonsultasi] =
      await pemesananLayanan({
        prisma: ctx.prisma,
        status: Status.success,
      });

    const [pendingGrouming, pendingKesehatan, pendingKonsultasi] =
      await pemesananLayanan({
        prisma: ctx.prisma,
        status: Status.pending,
      });

    const [processingGrouming, processingKesehatan, processingKonsultasi] =
      await pemesananLayanan({
        prisma: ctx.prisma,
        status: Status.processing,
      });

    const [failedGrouming, failedKesehatan, failedKonsultasi] =
      await pemesananLayanan({
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

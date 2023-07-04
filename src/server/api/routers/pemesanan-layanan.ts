import { type Prisma, type PrismaClient, Status } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pemesananLayanan, sameDay } from "~/utils/function";
import { faker } from "@faker-js/faker";

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
        select : {
          user: true
        }
      });
    }),

  create: publicProcedure.mutation(async ({ ctx }) => {
    await layananFake({
      prisma: ctx.prisma,
    });
  }),

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

interface IPembelajaranProps {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

async function layananFake({ prisma }: IPembelajaranProps) {
  const user = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
      emailVerified: date,
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

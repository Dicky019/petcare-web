// import { type RelawanUserRole } from "@prisma/client";

// import { z } from "zod";

import { Status } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// import { dummyRandomAnimal } from "~/types/pemesanan-layanan";
import { sameDay } from "~/utils/function";

// import { z } from "zod"

// import { userRelawanEdit, userRelawanInput } from "~/utils/types";

export const pemesananLayananRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allPemesananLayanan = await ctx.prisma.pemesananLayanan.findMany({
      include: {
        user: true,
        layananGrouming: true,
        LayananKesehatan: true,
        LayananKonsultasi: true,
      },
    });

    const date = new Date(0);

    const todayPemesananLayanan = allPemesananLayanan.filter((v) =>
      sameDay(v.createdAt, date)
    );

    // const   pending: 'pending';
    // processing: 'processing';
    // success: 'success';
    // failed: 'failed';

    const pending = allPemesananLayanan.filter((v) => v.status === "pending");
    const processing = allPemesananLayanan.filter(
      (v) => v.status === "processing"
    );
    const success = allPemesananLayanan.filter((v) => v.status === "success");
    const failed = allPemesananLayanan.filter((v) => v.status === "failed");

    return {
      todayPemesananLayanan,
      allPemesananLayanan,
      success,
      processing,
      pending,
      failed,
    };
  }),

  // create: publicProcedure.mutation(async ({ ctx }) => {
  //   const data = dummyRandomAnimal();
  //   console.log({ data });

  //   for (const element of data) {
  //     let layanan;
  //     if (element.kategoriHewan === "Kucing") {
  //       layanan = {
  //         layananGrouming: {
  //           create: {
  //             pelanggan: element.layananGrouming.pelanggan,
  //             pilihJamGrouming: element.layananGrouming
  //               .pilihJamGrouming as PilihJamGrouming,
  //           },
  //         },
  //       };
  //     } else if (element.kategoriHewan === "Anjing") {
  //       layanan = {
  //         LayananKesehatan: {
  //           create: {
  //             pelanggan: element.LayananKesehatan.pelanggan,
  //             pilihJamKesehatan: element.LayananKesehatan.pilihJamKesehatan,
  //           },
  //         },
  //       };
  //     } else {
  //       layanan = {
  //         LayananKonsultasi: {
  //           create: {
  //             pelanggan: element.LayananKonsultasi.pelanggan,
  //             pilihJamKesehatan: element.LayananKonsultasi.pilihJamKesehatan,
  //           },
  //         },
  //       };
  //     }

  //     await ctx.prisma.pemesananLayanan.create({
  //       data: {
  //         user: {
  //           create: {
  //             name: element.user.name,
  //             email: element.user.email,
  //             image: element.user.image,
  //           },
  //         },
  //         ...layanan,
  //         jenisKelaminHewan: element.jenisKelaminHewan as JenisKelaminHewan,
  //         kategoriHewan: element.kategoriHewan,
  //         keluhan: element.keluhan,
  //         namaHewan: element.namaHewan,
  //         umurHewan: element.umurHewan,
  //         noHP: element.noHP,
  //         status: element.status as Status,
  //       },
  //     });
  //   }
  // }),
});

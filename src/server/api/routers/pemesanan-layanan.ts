// import { type RelawanUserRole } from "@prisma/client";

// import { z } from "zod";
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

    ////
    const allLayananGrouming = allPemesananLayanan.filter(
      (v) => v.layananGroumingId != null
    );

    const todayPemesananLayananGrouming = allLayananGrouming.filter((v) =>
      sameDay(v.createdAt, date)
    );

    const pendingGrouming = allLayananGrouming.filter(
      (v) => v.status === "pending"
    );
    const processingGrouming = allLayananGrouming.filter(
      (v) => v.status === "processing"
    );
    const successGrouming = allLayananGrouming.filter(
      (v) => v.status === "success"
    );
    const failedGrouming = allLayananGrouming.filter(
      (v) => v.status === "failed"
    );

    ////
    const allLayananKesehatan = allPemesananLayanan.filter(
      (v) => v.layananKesehatanId != null
    );

    const todayPemesananLayananKesehatan = allLayananKesehatan.filter((v) =>
      sameDay(v.createdAt, date)
    );

    const pendingKesehatan = allLayananKesehatan.filter(
      (v) => v.status === "pending"
    );
    const processingKesehatan = allLayananKesehatan.filter(
      (v) => v.status === "processing"
    );
    const successKesehatan = allLayananKesehatan.filter(
      (v) => v.status === "success"
    );
    const failedKesehatan = allLayananKesehatan.filter(
      (v) => v.status === "failed"
    );

    /////
    const allLayananKonsultasi = allPemesananLayanan.filter(
      (v) => v.layananKonsultasiId != null
    );

    const todayPemesananLayananKonsultasi = allLayananKonsultasi.filter((v) =>
      sameDay(v.createdAt, date)
    );

    const pendingKonsultasi = allLayananKonsultasi.filter(
      (v) => v.status === "pending"
    );
    const processingKonsultasi = allLayananKonsultasi.filter(
      (v) => v.status === "processing"
    );
    const successKonsultasi = allLayananKonsultasi.filter(
      (v) => v.status === "success"
    );
    const failedKonsultasi = allLayananKonsultasi.filter(
      (v) => v.status === "failed"
    );

    // allPemesananLayanan: data.layananGrouming.allLayananGrouming,
    // todayPemesananLayanan:
    //   data.layananGrouming.todayPemesananLayananGrouming,
    // failed: data.layananGrouming.failedGrouming,
    // pending: data.layananGrouming.pendingGrouming,
    // processing: data.layananGrouming.pendingGrouming,
    // success: data.layananGrouming.successGrouming,

    return {
      layananGrouming: {
        todayPemesananLayanan: todayPemesananLayananGrouming,
        allPemesananLayanan: allLayananGrouming,
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

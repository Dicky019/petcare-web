import { JenisLayanan } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const jadwalLayananRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const [allLayananGrooming,allLayananKesehatan,allLayananKonsultasi ] = await Promise.all([
       ctx.prisma.jadwalLayanan.findMany({
        where : {
          jenisLayanan : JenisLayanan.grooming
        }
    }),
       ctx.prisma.jadwalLayanan.findMany({
        where : {
          jenisLayanan : JenisLayanan.kesehatan
        }
    }),
       ctx.prisma.jadwalLayanan.findMany({
        where : {
          jenisLayanan : JenisLayanan.konsultasi
        }
    }),

    ])

    // ////
    // const allLayananGrooming = allPemesananLayanan.filter(
    //   (v) => v.jenisLayanan === JenisLayanan.grooming
    // );

    // ////
    // const allLayananKesehatan = allPemesananLayanan.filter(
    //   (v) => v.jenisLayanan === JenisLayanan.kesehatan
    // );

    // /////
    // const allLayananKonsultasi = allPemesananLayanan.filter(
    //   (v) => v.jenisLayanan === JenisLayanan.konsultasi
    // );

    return {
      layananGrouming: allLayananGrooming,
      layananKesehatan: allLayananKesehatan,
      layananKonsultasi: allLayananKonsultasi,
    };
  }),

//  create : 
});

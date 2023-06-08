// import { type RelawanUserRole } from "@prisma/client";

// import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

import { dummyRandomAnimal } from "~/types/pemesanan-layanan"

// import { z } from "zod"

// import { userRelawanEdit, userRelawanInput } from "~/utils/types";

export const pemesananLayananRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const pemesananLayanan = await ctx.prisma.pemesananLayanan.findMany({
      include: {
        user: true,
        layananGrouming: true,
        LayananKesehatan: true,
        LayananKonsultasi: true,
      },
    })

    return pemesananLayanan
  }),

  create: publicProcedure.mutation(async ({ ctx, input }) => {
    const data = dummyRandomAnimal()
    console.log({ data })

    const pemesananLayanan = await ctx.prisma.pemesananLayanan.createMany({
      data: data,
      skipDuplicates: true,
    })
  }),
})

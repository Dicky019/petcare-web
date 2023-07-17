// import { type RelawanUserRole } from "@prisma/client";

// import { z } from "zod";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { sameDay } from "~/utils/function";

// import { z } from "zod"

// import { userRelawanEdit, userRelawanInput } from "~/utils/types";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.prisma.user.findMany({});

    const date = new Date(0);

    const todayUsers = allUsers.filter((v) => sameDay(v.createdAt, date));

    const isActive = allUsers.filter((v) => v.isActive === true);
    const isNotActive = allUsers.filter((v) => v.isActive === false);

    return {
      todayUsers,
      allUsers,
      isActive,
      isNotActive,
    };
  }),
  changeStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isActive: z.boolean(),
      })
    )
    .mutation(({ ctx, input: { id, isActive } }) => {
      return ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          isActive,
        },
      });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.user.delete({
      where: {
        id: input,
      },
    });
  }),
});

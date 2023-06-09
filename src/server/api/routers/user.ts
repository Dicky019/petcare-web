// import { type RelawanUserRole } from "@prisma/client";

// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { sameDay } from "~/utils/function";

// import { z } from "zod"

// import { userRelawanEdit, userRelawanInput } from "~/utils/types";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.prisma.user.findMany({});

    const date = new Date(0);

    const todayUsers = allUsers.filter((v) =>
      sameDay(v.createdAt, date)
    );

    return {
      todayUsers,
      allUsers,
    };
  }),
});

import { type AppRouter } from "~/server/api/root";
import { type inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type allUserOutput = RouterOutput["pemesananTambahan"]["getAll"];

export type IPemesananTambahan = allUserOutput[number];

import { z } from "zod";

export const formCreateSchema = z.object({
  jenisLayanan: z.string(),
  value: z.string(),
});

export const formEditSchema = z.object({
  id: z.string(),
  jenisLayanan: z.string(),
  value: z.string(),
});

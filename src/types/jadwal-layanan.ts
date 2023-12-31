import { type AppRouter } from "~/server/api/root";
import { type inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type allUserOutput = RouterOutput["jadwalLayanan"]["getAll"];

export type IJadwalLayanan = allUserOutput[number];

export interface ISelectItem {
  value: string;
  display: string;
}

import { z } from "zod";

export const formCreateSchema = z.object({
  jenisLayanan: z.string(),
  jam: z.string(),
  hari: z.string(),
});

export const formEditSchema = z.object({
  id: z.string(),
  jenisLayanan: z.string(),
  jam: z.string(),
  hari: z.string(),
});

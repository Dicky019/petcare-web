import { type AppRouter } from "~/server/api/root";
import { type inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type allUserOutput = RouterOutput["jadwalLayanan"]["getAll"];

export type IJadwalLayanan = allUserOutput["layananGrouming"][number];

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

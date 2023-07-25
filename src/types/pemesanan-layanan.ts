import { type AppRouter } from "~/server/api/root";

import { type inferRouterOutputs } from "@trpc/server";
import { z } from "zod";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type IPemesananLayanan =
  RouterOutput["pemesananLayanan"]["getAll"]["layananGrouming"]["allPemesananLayanan"][number];

export const ZCreatePemesananLayanan = z.object({
  jenisLayanan: z.enum(["grooming", "kesehatan", "konsultasi"]),
  namaHewan: z.string(),
  kategoriHewan: z.string(),
  umurHewan: z.string(),
  jenisKelaminHewan: z.enum(["jantan", "betina"]),
  keluhan: z.string().optional(),
  noHP: z.string(),
  status: z.enum(["pending", "processing", "success", "failed"]),
  hari: z.enum(["senin", "selasa", "rabu", "kamis", "jumat"]),
  jam: z.string(),
 
});

export const ZUpdatePemesananLayanan = z.object({
  id: z.string(),
  jenisLayanan: z.enum(["grooming", "kesehatan", "konsultasi"]),
  namaHewan: z.string(),
  kategoriHewan: z.string(),
  umurHewan: z.string(),
  jenisKelaminHewan: z.enum(["jantan", "betina"]),
  keluhan: z.string().optional(),
  noHP: z.string(),
  status: z.enum(["pending", "processing", "success", "failed"]),
  hari: z.enum(["senin", "selasa", "rabu", "kamis", "jumat"]),
  jam: z.string(),
 
});

export const ZDeletePemesananLayanan = z.object({
  id: z.string(),
});

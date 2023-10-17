import { type AppRouter } from "~/server/api/root";

import { type inferRouterOutputs } from "@trpc/server";
import { z } from "zod";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type IPemesananLayanan =
  RouterOutput["pemesananLayanan"]["getAll"]["allPemesananLayanan"][number];

export const ZCreatePemesananLayanan = z.object({
  jenisLayanan: z.enum(["grooming", "kesehatan", "konsultasi"]),
  namaHewan: z.string(),
  kategoriHewan: z.string(),
  umurHewan: z.string(),
  jenisKelaminHewan: z.enum(["jantan", "betina"]),
  keluhan: z.string().optional(),
  noHP: z.string(),
  status: z.enum(["pending", "processing", "success", "failed"]),
  tanggal: z.string(),
  jam: z.string(),
});

export const ZUpdatePemesananLayanan = z.object({
  id: z.string(),
  jenisLayanan: z.enum(["grooming", "kesehatan", "konsultasi"]).optional(),
  namaHewan: z.string().optional(),
  kategoriHewan: z.string().optional(),
  umurHewan: z.string().optional(),
  jenisKelaminHewan: z.enum(["jantan", "betina"]).optional(),
  keluhan: z.string().optional(),
  noHP: z.string().optional(),
  status: z.enum(["pending", "processing", "success", "failed"]).optional(),
  tanggal: z.string().optional(),
  jam: z.string().optional(),
});

export const ZUpdatePemesananTambahan = z.object({
  id: z.string(),
  listData: z.array(z.string()),
});

export const ZDeletePemesananLayanan = z.object({
  id: z.string(),
});

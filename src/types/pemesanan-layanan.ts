import { type AppRouter } from "~/server/api/root";

import { type inferRouterOutputs } from "@trpc/server";
import { z } from "zod";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type IPemesananLayanan =
  RouterOutput["pemesananLayanan"]["getAll"]["layananGrouming"]["allPemesananLayanan"][number];

export const ZPemesananLayanan = z.object({
  jenisLayanan: z.enum(["grooming", "kesehatan", "konsultasi"]),
  namaHewan: z.string(),
  kategoriHewan: z.string(),
  umurHewan: z.string(),
  jenisKelaminHewan: z.enum(["jantan", "betina"]),
  keluhan: z.string().optional(),
  noHP: z.string(),
  status: z.enum(["pending", "processing", "success", "failed"]),
  pilihJamGrouming: z.enum(["jam09_12", "jam10_14", "jam14_17", "jam16_19"]),
  hari: z.enum(["senin", "selasa", "rabu", "kamis", "jumat"]),
  pilihJamKesehatanKonsultasi: z.enum([
    "jam09_10",
    "jam10_11",
    "jam12_13",
    "jam13_14",
    "jam14_15",
    "jam15_16",
    "jam16_17",
    "jam17_18",
    "jam18_19",
    "jam19_20",
    "jam20_21",
  ]),
});

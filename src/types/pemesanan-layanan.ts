import { type AppRouter } from "~/server/api/root";

import { type inferRouterOutputs } from "@trpc/server";
// import {
//   type User,
//   type JenisLayanan,
//   type JenisKelaminHewan,
//   type Status,
// } from "@prisma/client";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type IPemesananLayanan =
  RouterOutput["pemesananLayanan"]["getAll"]["layananGrouming"]["allPemesananLayanan"][number];

// export type IPemesananLayanan = {
//   user: User;
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   userId: string;
//   jenisLayanan: JenisLayanan;
//   namaHewan: string;
//   kategoriHewan: string;
//   umurHewan: string;
//   jenisKelaminHewan: JenisKelaminHewan;
//   keluhan: string;
//   noHP: string;
//   status: Status;
// };

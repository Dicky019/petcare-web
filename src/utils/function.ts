import {
  JenisLayanan,
  type Prisma,
  type PrismaClient,
  type Status,
} from "@prisma/client";

export function sameDay(d1: Date, d2: Date) {
  console.log({d1,d2});
  
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDay() === d2.getDay()
  );
}

interface IPemesananLayananProps {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  status?: Status;
}

export const pemesananLayanan = async ({
  prisma,
  status,
}: IPemesananLayananProps) => {
  const whereStatus = status && {
    status,
  };

  const select = { select: {
    user: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
    jenisLayanan: true,
    namaHewan: true,
    kategoriHewan: true,
    umurHewan: true,
    jenisKelaminHewan: true,
    keluhan: true,
    noHP: true,
    status: true,
  },}
  return await Promise.all([
    prisma.pemesananLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.grooming,
        ...whereStatus,
      },
     ...select,
    }),
    prisma.pemesananLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.kesehatan,
        ...whereStatus,
      },
      ...select,
    }),
    prisma.pemesananLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.konsultasi,
        ...whereStatus,
      },
      ...select,
    }),
  ]);
};

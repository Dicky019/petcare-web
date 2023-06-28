import { JenisLayanan, type Prisma, type PrismaClient, type Status } from "@prisma/client";

export function sameDay(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
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

export const pemesananLayanan = async ({ prisma, status }: IPemesananLayananProps) => {
  const whereStatus = status && {
    status,
  };
  return await Promise.all([
    prisma.pemesananLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.grooming,
        ...whereStatus,
      },
    }),
    prisma.pemesananLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.kesehatan,
        ...whereStatus,
      },
    }),
    prisma.pemesananLayanan.findMany({
      where: {
        jenisLayanan: JenisLayanan.konsultasi,
        ...whereStatus,
      },
    }),
  ]);
};

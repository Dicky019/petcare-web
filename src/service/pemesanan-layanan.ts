import { faker } from "@faker-js/faker";
import { JenisLayanan, Status } from "@prisma/client";
import { type Prisma, type PrismaClient } from "@prisma/client";

interface IPemesananLayananProps {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  status?: Status;
}

export const getAllPemesananLayanan = async ({
  prisma,
  status,
}: IPemesananLayananProps) => {
  const whereStatus = status && {
    status,
  };

  const select = {
    select: {
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
    },
  };
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

interface IPembelajaranProps {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

export async function layananFake({ prisma }: IPembelajaranProps) {
  const user = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
      emailVerified: new Date(),
      isActive: faker.datatype.boolean(),
    },
  });

  const pemesananLayanan = await prisma.pemesananLayanan.create({
    data: {
      noHP: "081355834769",
      umurHewan: "16",
      status: Status.processing,
      namaHewan: "Hewan",
      keluhan: "loremmmmm",
      jenisKelaminHewan: "betina",
      jenisLayanan: "grooming",
      kategoriHewan: "changeStatus",
      userId: user.id,
    },
  });

  await prisma.layananGrouming.create({
    data: {
      pilihJamGrouming: "jam09_12",
      pemesananLayananId: pemesananLayanan.id,
    },
  });
}

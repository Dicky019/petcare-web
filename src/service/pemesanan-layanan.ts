import type { PemesananLayanan, User } from "@prisma/client";
import {
  JenisLayanan,
  type Status,
} from "@prisma/client";
import { type JWT } from "next-auth/jwt";
import { type NextApiRequest, type NextApiResponse } from "next/types";
import { type IPrismaProps } from "~/server/db";
import {
  ZCreatePemesananLayanan,
  ZDeletePemesananLayanan,
  ZUpdatePemesananLayanan,
} from "~/types/pemesanan-layanan";
import { displayJam } from "~/utils/function";

interface IPemesananLayananProps {
  prisma: IPrismaProps;
  status?: Status;
}

export const getAllPemesananLayanan = async ({
  prisma,
  status,
}: IPemesananLayananProps) => {
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

interface IPemesananProps {
  prisma: IPrismaProps;
  jwt: JWT;
  req: NextApiRequest;
  res: NextApiResponse;
}

export async function createPemesanan({
  req,
  res,
  prisma,
  jwt,
}: IPemesananProps) {
  const result = ZCreatePemesananLayanan.safeParse(req.body);

  if (!result.success) {
    return res.status(404).json({
      code: "400",
      status: "Bad Request",
      errors: [result.error.formErrors.fieldErrors],
    });
  }

  const { noHP, ...dataPemesanan } = result.data;

  const user = await prisma.user.update({
    where: {
      email: jwt.email,
    },
    data: {
      noHP,
    },
  });

  const { jam, ...value } = await prisma.pemesananLayanan.create({
    data: {
      ...dataPemesanan,
      userId: user.id,
    },
  });

  const pemesanan: PemesananLayanan = {
    ...value,
    jam: displayJam(jam),
  };

  return res.status(200).json({
    code: "200",
    status: "Succses",
    data: pemesanan,
  });
}

export async function updatePemesanan({
  req,
  res,
  prisma,
  jwt,
}: IPemesananProps) {
  const result = ZUpdatePemesananLayanan.safeParse({...req.query,...req.body});

  if (!result.success) {
    return res.status(404).json({
      code: "400", 
      status: "Bad Request",
      errors: [result.error.formErrors.fieldErrors],
    });
  }

  const { noHP, id, ...dataPemesanan } = result.data;

  const user = await prisma.user.update({
    where: {
      email: jwt.email,
    },
    data: {
      noHP,
    },
  });

  const { jam, ...value } = await prisma.pemesananLayanan.update({
    data: {
      ...dataPemesanan,
      userId: user.id,
    },
    where: {
      id,
    },
  });

  const pemesanan: PemesananLayanan = {
    ...value,
    jam: displayJam(jam),
  };

  return res.status(200).json({
    code: "200",
    status: "Succses",
    data: pemesanan,
  });
}

export const deletePemesanan = async ({
  prisma,
  res,
  req,
}: {
  prisma: IPrismaProps;
  res: NextApiResponse;
  req: NextApiRequest;
}) => {
  const result = ZDeletePemesananLayanan.safeParse(req.query);

  if (!result.success) {
    return res.status(404).json({
      code: "400",
      status: "Bad Request",
      errors: [result.error.formErrors.fieldErrors],
    });
  }

  const { id } = result.data;

  const { jam, ...value } = await prisma.pemesananLayanan.delete({
    where: {
      id,
    },
  });

  const pemesanan: PemesananLayanan = {
    ...value,
    jam: displayJam(jam),
  };

  return res.status(200).json({
    code: "200",
    status: "Succses",
    data: pemesanan,
  });
};

export const getByUserPemesanan = async ({
  prisma,
  req,
  res,
}: {
  prisma: IPrismaProps;
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const result = ZDeletePemesananLayanan.safeParse(req.query);

  if (!result.success) {
    return res.status(404).json({
      code: "400",
      status: "Bad Request",
      errors: [result.error.formErrors.fieldErrors],
    });
  }

  const { id } = result.data;

  const response = await prisma.pemesananLayanan.findUnique({
    where: {
      id,
    },
  });

  if (!response) {
    return res.status(404).json({
      code: "404",
      status: "Not Found",
      errors: [{ pemesanan: ["Pemesanan Not Found"] }],
    });
  }

  const { jam, ...value } = response

  const pemesanan: PemesananLayanan = {
    ...value,
    jam: displayJam(jam),
  };


  return res.status(200).json({
    code: "200",
    status: "Succses",
    data: pemesanan,
  });
};

export const getAllByUserPemesanan = async ({
  prisma,
  user,
  res,
}: {
  prisma: IPrismaProps;
  user: User;
  res: NextApiResponse;
}) => {
  const pemesanans = await prisma.pemesananLayanan.findMany({
    where: {
      userId: user.id,
    },
  });

  const changeJam = pemesanans.map(({ jam, ...value }) => ({
    ...value,
    jam: displayJam(jam),
  }));

  return res.status(200).json({
    code: "200",
    status: "Succses",
    data: changeJam,
  });
};



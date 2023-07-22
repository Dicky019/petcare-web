import { verifyJwt } from "~/utils/jwt";
import { prisma } from "~/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import type { JWT } from "next-auth/jwt";
import { ZPemesananLayanan } from "~/types/pemesanan-layanan";
import { PilihJamGrouming } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authToken = (req.headers.authorization || "").split("Bearer ").at(1);

  if (!authToken) {
    return res.status(401).json({
      code: "401",
      status: "Unauthorized",
      errors: [{ token: ["Token Null"] }],
    });
  }

  const JWT = verifyJwt(authToken) as JWT | undefined;
  if (!JWT) {
    return res.status(401).json({
      code: "401",
      status: "Unauthorized",
      errors: [{ token: ["Invalid Auth Token"] }],
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: JWT.email,
    },
  });

  if (!user) {
    return res.status(401).json({
      code: "401",
      status: "Unauthorized",
      errors: [{ user: ["User Not Found"] }],
    });
  }

  if (req.method !== "GET" && req.method !== "PUT" && req.method !== "POST") {
    return res.status(404).json({
      code: "404",
      status: "Not Found",
      errors: [{ route: ["Route Not Found"] }],
    });
  }

  if (req.method === "GET") {
    const pemesanans = await prisma.pemesananLayanan.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json({
      code: "200",
      status: "Succses",
      data: pemesanans,
    });
  }

  if (req.method === "POST") {
    const result = ZPemesananLayanan.safeParse(req.body);
    if (!result.success) {
      return res.status(404).json({
        code: "404",
        status: "Bad Request",
        errors: [result.error.formErrors.fieldErrors],
      });
    }

    const { pilihJamGrouming, pilihJamKesehatanKonsultasi, ...dataPemesanan } =
      result.data;

    const pemesanan = await prisma.pemesananLayanan.create({
      data: {
        ...dataPemesanan,
        userId: user.id,
      },
    });

    if (result.data.jenisLayanan === "grooming") {
      await prisma.layananGrouming.create({
        data: {
          pilihJamGrouming,
          pemesananLayananId: pemesanan.id,
        },
      });
    }

    if (result.data.jenisLayanan === "kesehatan") {
      await prisma.layananKesehatan.create({
        data: {
          pilihJamKesehatan: pilihJamKesehatanKonsultasi,
          pemesananLayananId: pemesanan.id,
        },
      });
    }

    if (result.data.jenisLayanan === "konsultasi") {
      await prisma.layananKonsultasi.create({
        data: {
          pilihJamKesehatan: pilihJamKesehatanKonsultasi,
          pemesananLayananId: pemesanan.id,
        },
      });
    }

    return res.status(200).json({
      code: "200",
      status: "Succses",
      data: pemesanan,
    });
  }
}

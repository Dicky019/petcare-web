import { verifyJwt } from "~/utils/jwt";
import { prisma } from "~/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import type { JWT } from "next-auth/jwt";
import { getAllJadwalLayanan } from "~/service/jadwal-layanan";
import { displayJam, filterByHari } from "~/utils/function";

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

  if (req.method !== "GET") {
    return res.status(404).json({
      code: "404",
      status: "Not Found",
      errors: [{ route: ["Route Not Found"] }],
    });
  }

  if (req.method === "GET") {
    const [allLayananGrooming, allLayananKesehatan, allLayananKonsultasi] =
      await getAllJadwalLayanan({
        prisma,
      });

    const data = {
      layananGrouming: allLayananGrooming.map(({ jam, ...value }) => ({
        ...value,
        jam: displayJam(jam),
      })).sort((a,b) => {
        const hariA = filterByHari(a.hari)
        const hariB = filterByHari(b.hari)
        return Number(hariA) - Number(hariB);
      }),
      layananKesehatan: allLayananKesehatan.map(({ jam, ...value }) => ({
        ...value,
        jam: displayJam(jam),
      })).sort((a,b) => {
        const hariA = filterByHari(a.hari)
        const hariB = filterByHari(b.hari)
        return Number(hariA) - Number(hariB);
      }),
      layananKonsultasi: allLayananKonsultasi.map(({ jam, ...value }) => ({
        ...value,
        jam: displayJam(jam),
      })).sort((a,b) => {
        const hariA = filterByHari(a.hari)
        const hariB = filterByHari(b.hari)
        return Number(hariA) - Number(hariB);
      }),
    };

    return res.status(200).json({
      code: "200",
      status: "Succses",
      data,
    });
  }
}

import { type NextApiRequest, type NextApiResponse } from "next";
import type { JWT } from "next-auth/jwt";

import { verifyJwt } from "~/utils/jwt";
import { prisma } from "~/server/db";
import {
  createPemesanan,
  getAllByUserPemesanan,
} from "~/service/pemesanan-layanan";

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

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(404).json({
      code: "404",
      status: "Not Found",
      errors: [{ route: ["Route Not Found"] }],
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


  if (req.method === "POST") {
    return createPemesanan({ prisma, jwt: JWT, req, res });
  }

  return getAllByUserPemesanan({ prisma, user, res });
}

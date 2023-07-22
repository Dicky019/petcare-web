import { signJwtAccessToken } from "~/utils/jwt";
import { prisma } from "~/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";

interface RequestBody {
  email: string;
  image: string;
  name: string;
  isActive?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const keysLogin = req.headers["authorization"];
  const {
    image,
    email,
    name,
    isActive = true,
  }: RequestBody = req.body as RequestBody;

  const user = await prisma.user.upsert({
    where: {
      email,
    },
    create: {
      email,
      emailVerified: new Date(),
      image,
      isActive,
      name,
    },
    update: {
      email,
      image,
      name,
    },
  });

  if (!user) {
    return res.status(401).json({
      code: "401",
      status: "Unauthorized",
      errors: [{ user: ["Akun Anda tidak terdaftar"] }],
    });
  }

  if (user?.isActive !== true) {
    return res.status(401).json({
      code: "401",
      status: "Unauthorized",
      errors: [{ user: ["Status anda non active"] }],
    });
  }
  
  const { ...userWithoutPass } = user;
  const accessToken = signJwtAccessToken(userWithoutPass);
  const result = {
    ...userWithoutPass,
    accessToken,
  };

  return res.status(200).json({
    code: "200",
    status: "Succses",
    data: result,
  });
}

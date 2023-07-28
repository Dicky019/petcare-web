import { signJwtAccessToken } from "~/utils/jwt";
import { prisma } from "~/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import { formRegisterSchema } from "~/types/login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const result = formRegisterSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(404).json({
      code: "400",
      status: "Bad Request",
      errors: [result.error.formErrors.fieldErrors],
    });
  }

  const { email, image, isActive, name } = result.data;

  const user = await prisma.user.upsert({
    where: {
      email,
    },
    create: {
      email,
      emailVerified: new Date(),
      image,
      isActive,
      noHP: "-",
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

  const data = {
    ...userWithoutPass,
    accessToken,
  };

  return res.status(200).json({
    code: "200",
    status: "Succses",
    data,
  });
}

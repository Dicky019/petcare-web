import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "~/env.mjs";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "20d",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = env.NEXTAUTH_SECRET;
  const token = jwt.sign(payload, secret_key ?? "", options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = env.NEXTAUTH_SECRET;
    const decoded = jwt.verify(token, secret_key ?? "");
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// export const validationToken = (req: NextApiRequest, res: NextApiResponse) => {
//   const authToken = (req.headers.authorization || "").split("Bearer ").at(1);
//   // replace ADMIN_AUTH_TOKEN with your expected token

//   if (!authToken) {
//     res.status(401).json({
//       code: "401",
//       status: "Unauthorized",
//       errors: [{ token: ["Token Null"] }],
//     });
//     return "";
//   }

//   return authToken;
// };

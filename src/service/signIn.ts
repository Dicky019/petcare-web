import { type Account, type User,type Profile } from "next-auth";
import { prisma } from "~/server/db";

export const signInCheck = async ({ user }: { user: User }) => {
  return  await prisma.user.findFirst({
    where: {
      email: user?.email,
    },
  });

//   return user;
};

export const signInGoogle = async ({
  profile,
  account,
}: {
  profile: Profile;
  account: Account;
}) => {
  const { name, email, picture, email_verified, image } = profile || {};

  const providerProviderAccountId = account.providerAccountId;

  if (!providerProviderAccountId) {
    throw Error("providerProviderAccountId");
  }

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      email,
      name,
      emailVerified: email_verified ? new Date(0) : undefined,
      image: picture ?? image,
    },
  });

  const profileUser = await prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: account.provider,
        providerAccountId: providerProviderAccountId,
      },
    },
    create: {
      type: account.type,
      provider: account.provider,
      providerAccountId: providerProviderAccountId,
      access_token: account.access_token,
      expires_at: account.expires_at,
      token_type: account.token_type,
      id_token: account.id_token,
      scope: account.scope,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    update: {
      type: account.type,
      provider: account.provider,
      providerAccountId: providerProviderAccountId,
      access_token: account.access_token,
      expires_at: account.expires_at,
      token_type: account.token_type,
      id_token: account.id_token,
      scope: account.scope,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  console.log({ profileUser, profile, valid: !!profileUser });

  return !!profileUser;
};

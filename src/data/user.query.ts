import { prisma } from "@/lib/prisma";

export const getUserInfo = async ({
  user_id,
}: {
  user_id: string | undefined | null;
}) => {
  if (!user_id) return null;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        image: true,
        email: true,
        plan: true,
        role: true,
        emailVerified: true,
      },
    });
    return user;
  } catch {
    return null;
  }
};

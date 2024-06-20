"use server";

import { prisma } from "@/lib/prisma";

export const getQuizAction = async () => {
  const quiz = await prisma.quiz.findMany({
    take: 12,
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
    },
  });
  return quiz;
};

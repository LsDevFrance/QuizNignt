"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getQuizById = async (quizId: string) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  const formattedQuiz = quiz.questions.map((question) => {
    const correctAnswer = question.answers.find((answer) => answer.correct);
    return {
      text: question.title,
      options: question.answers.map((answer) => answer.title),
      answer: correctAnswer ? correctAnswer.title : null,
    };
  });

  return formattedQuiz;
};

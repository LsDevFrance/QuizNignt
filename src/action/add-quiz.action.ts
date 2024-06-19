"use server";

import { prisma } from "@/lib/prisma";
import { QuizType } from "../../app/(protected)/dashboard/quiz-create/quiz.schema";

export const addQuizAction = async (values: QuizType, user_id: string) => {
  try {
    const { title, description, image, questions } = values;

    const createdQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        image,
        creatorId: user_id,
        questions: {
          create: questions.map((question) => ({
            title: question.title,
            answers: {
              create: question.answers.map((answer, index) => ({
                title: answer.title,
                correct: index === Number(question.correctAnswerIndex),
              })),
            },
          })),
        },
      },
    });

    return {
      success: true,
      message: "Quiz created successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Quiz cannot be created",
    };
  }
};

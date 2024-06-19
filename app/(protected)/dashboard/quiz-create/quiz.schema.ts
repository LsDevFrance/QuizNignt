import * as z from "zod";

const AnswerSchema = z.object({
  title: z.string({ message: "Title est requis" }),
});

const QuestionSchema = z.object({
  title: z.string({ message: "Title est requis" }),
  correctAnswerIndex: z
    .string()
    .min(0)
    .max(3, { message: "Must be between 0 and 3" }),
  answers: z
    .array(AnswerSchema)
    .length(4, { message: "Each question must have 4 answers" }),
});

export const QuizSchema = z.object({
  title: z.string({ message: "Title est requis" }),
  description: z.string({ message: "Description est requis" }),
  image: z.string().optional(),
  questions: z
    .array(QuestionSchema)
    .min(1, { message: "Quiz must have at least one question" }),
});

export type QuizType = z.infer<typeof QuizSchema>;

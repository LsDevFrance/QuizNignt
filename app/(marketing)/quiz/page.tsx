import QuizComponent from "./quiz";
import { getQuizById } from "./quiz.action";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const quizId = searchParams.quizId as string;
  if (!quizId) {
    return <div>Quiz not found</div>;
  }
  const quiz = await getQuizById(quizId);
  return <QuizComponent quiz={quiz} />;
}

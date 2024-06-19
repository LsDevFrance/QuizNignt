import { auth } from "@/auth";
import QuizForm from "./quiz-form";

export default async function QuizCreatePage() {
  const session = await auth();
  if (!session) return null;
  return <QuizForm user_id={session?.user.id} />;
}

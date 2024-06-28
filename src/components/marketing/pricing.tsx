import { getQuizAction } from "@/action/get-quiz.action";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";

export default async function QuizSectionCards() {
  try {
    const quiz = await getQuizAction();
    if (quiz) {
      revalidatePath("/");
    }

    return (
      <>
        <section
          className="mx-auto max-w-screen-xl p-10 sm:p-12  lg:p-14"
          id="princing"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Quiz disponible pour tous
            </h2>
            <p className="mt-1 text-muted-foreground">
              Testez vos connaissances avec notre quiz accessible à tous les
              niveaux !
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quiz.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <Avatar className="rounded w-full h-40 object-cover">
                    <AvatarFallback className="rounded">
                      {quiz.title[0]}
                    </AvatarFallback>
                    {quiz.image && (
                      <AvatarImage src={quiz.image} alt={quiz.title} />
                    )}
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <Link
                    className="text-lg font-semibold"
                    href={`/quiz/?quizId=${quiz.id}`}
                  >
                    {quiz.title}
                  </Link>
                  <p className="text-muted-foreground">{quiz.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return <p>Failed to load quizzes. Please try again later.</p>;
  }
}

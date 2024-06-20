import { prisma } from "@/lib/prisma";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";

export default async function QuizSectionCards() {
  const quiz = await prisma.quiz.findMany({
    take: 12,
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
    },
  });
  return (
    <>
      {/* Pricing */}
      <section
        className="mx-auto max-w-screen-xl p-10 sm:p-12  lg:p-14"
        id="princing"
      >
        {/* Title */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Quiz disponible pour tous
          </h2>
          <p className="mt-1 text-muted-foreground">
            Whatever your status, our offers evolve according to your needs.
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
}

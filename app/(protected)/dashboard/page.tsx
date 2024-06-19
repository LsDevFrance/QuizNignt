import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/ui/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const quiz = await prisma.quiz.findMany({
    where: {
      creatorId: session?.user?.id,
    },
    select: {
      id: true,
      title: true,
      image: true,
    },
  });

  return (
    <Layout>
      <LayoutHeader>
        <div className="flex w-full items-center justify-between">
          <LayoutTitle>Mes Quiz</LayoutTitle>
          <Link
            href="/dashboard/quiz-create"
            className={buttonVariants({ variant: "default" })}
          >
            Ajouter un quiz
          </Link>
        </div>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-4">
            <Table>
              <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Nom du quiz</TableHead>
              </TableHeader>
              <TableBody>
                {quiz.length > 0 &&
                  quiz.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell>
                        <Avatar className="rounded">
                          <AvatarFallback>{quiz.title[0]}</AvatarFallback>
                          {quiz.image && (
                            <AvatarImage src={quiz.image} alt={quiz.title} />
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography
                          as={Link}
                          variant="large"
                          href={`/admin/courses/${quiz.id}`}
                        >
                          {quiz.title}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}

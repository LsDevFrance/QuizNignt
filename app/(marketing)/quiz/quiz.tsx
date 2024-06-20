"use client";

import Confetti from "@/components/magicui/confetti";
import NumberTicker from "@/components/magicui/number-ticker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Question from "@/shared/Question";
import Link from "next/link";
import { useState } from "react";

type QuizType = {
  text: string;
  options: string[];
  answer: string | null;
}[];

type AnswerType = {
  question: string;
  answer: boolean;
};

export default function QuizComponent({ quiz }: { quiz: QuizType }) {
  const confettiOptions = {
    force: 0.9,
    duration: 6000,
    particleCount: 100,
    width: 800,
  };
  const [question, setQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [quizdone, setQuizdone] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const saveAnswer = (e: boolean, q: string) => {
    const newAnswers = [...answers];
    newAnswers.push({
      question: q,
      answer: e,
    });
    setAnswers(newAnswers);
    if (e) {
      setScore(score + 1);
    }
    if (question < quiz.length) {
      setQuestion(question + 1);
    }
    if (question === quiz.length) {
      setQuizdone(true);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          {!quizdone && (
            <div>
              <Progress
                className="h-[2px] mb-5 opacity-50"
                value={(question * 100) / quiz.length}
              />
              <CardTitle className="text-sm">
                Question {question}/{quiz.length}
              </CardTitle>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="w-[400px]">
            {!quizdone &&
              quiz.map((x, i) => {
                if (i + 1 === question) {
                  return (
                    <Question
                      key={i}
                      data={x}
                      save={(e: boolean) => saveAnswer(e, (i + 1).toString())}
                    />
                  );
                }
                return null;
              })}

            {quizdone && (
              <div className="flex flex-col items-center relative">
                <Label className="text-3xl">Quiz Result</Label>
                <Separator className="my-2" />
                <Confetti className="absolute inset-0" {...confettiOptions} />
                <span className="text-2xl">
                  {score}/{quiz.length} Questions are correct!
                </span>
                <NumberTicker
                  value={score * 100}
                  direction="up"
                  className="text-4xl mt-5"
                />

                <span className="text-2xl">Points</span>

                <Link href="/">
                  <Button className="mt-5">Back to Home</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

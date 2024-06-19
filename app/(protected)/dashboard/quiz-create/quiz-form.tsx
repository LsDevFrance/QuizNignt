"use client";
import { addQuizAction } from "@/action/add-quiz.action";
import { FormError } from "@/components/marketing/auth/form-error";
import { FormSuccess } from "@/components/marketing/auth/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { QuizSchema, QuizType } from "./quiz.schema";

export default function QuizForm({ user_id }: { user_id: string }) {
  const mutation = useMutation(async (values: QuizType) => {
    const result = await addQuizAction(values, user_id);
    if (!result.success) {
      throw result.message;
    } else {
      return result.message;
    }
  });

  const form = useForm<QuizType>({
    resolver: zodResolver(QuizSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      questions: [
        {
          title: "",
          correctAnswerIndex: "0", // default to first answer being correct
          answers: [{ title: "" }, { title: "" }, { title: "" }, { title: "" }],
        },
      ],
    },
  });

  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    appendQuestion({
      title: "",
      correctAnswerIndex: "0",
      answers: [{ title: "" }, { title: "" }, { title: "" }, { title: "" }],
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div className="">
            <Typography className="mb-4" variant="h2">
              Cree un Quiz
            </Typography>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={mutation.isLoading}
                      type="text"
                      placeholder="Quiz Title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={mutation.isLoading}
                      type="text"
                      placeholder="Quiz Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={mutation.isLoading}
                      type="text"
                      placeholder="Image URL"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {questionFields.map((question, questionIndex) => (
            <div key={question.id} className="space-y-4">
              <Separator />
              <Typography variant="h3">Question {questionIndex + 1}</Typography>
              <FormField
                control={form.control}
                name={`questions.${questionIndex}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={mutation.isLoading}
                        type="text"
                        placeholder="Question Title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2 grid grid-cols-2">
                {form
                  .watch(`questions.${questionIndex}.answers`)
                  .map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.answers.${answerIndex}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Reponse {answerIndex + 1} Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={mutation.isLoading}
                                type="text"
                                placeholder={`Answer ${answerIndex + 1} Title`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
              </div>
              <FormField
                control={form.control}
                name={`questions.${questionIndex}.correctAnswerIndex`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correct Answer</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Answer 1</SelectItem>
                          <SelectItem value="1">Answer 2</SelectItem>
                          <SelectItem value="2">Answer 3</SelectItem>
                          <SelectItem value="3">Answer 4</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button type="button" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </div>
        {mutation.isError && <FormError message={mutation.error} />}
        {mutation.isSuccess && <FormSuccess message={mutation.data} />}
        <Button
          disabled={mutation.isLoading}
          type="submit"
          className="flex w-full items-center gap-2"
        >
          {mutation.isLoading && (
            <span>
              <Loader />
            </span>
          )}
          Create Quiz
        </Button>
      </form>
    </Form>
  );
}

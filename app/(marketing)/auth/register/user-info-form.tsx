"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { registerAction } from "@/action/register.action";
import { InfoRegisterSchema, InfoRegisterType } from "./register.schema";
export const UserInfoForm = () => {
  const mutation = useMutation(async (values: InfoRegisterType) => {
    const result = await registerAction(values);
    if (!result.success) {
      throw result.message;
    } else {
      return result.message;
    }
  });
  const form = useForm<InfoRegisterType>({
    resolver: zodResolver(InfoRegisterSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  // const onSubmit = (values: LoginFormType) => {
  //   loginAction(values);
  // };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={mutation.isLoading}
                      type="text"
                      placeholder="John"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={mutation.isLoading}
                      type="text"
                      placeholder="Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={mutation.isLoading}
                    type="email"
                    placeholder="email@domaine.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={mutation.isLoading}
                    type="password"
                    placeholder="******"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
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
          Create an account
        </Button>
      </form>
    </Form>
  );
};

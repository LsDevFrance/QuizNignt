import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, {
      message: "Password is required it must have at least 6 caracteres",
    }),
});

export type LoginFormType = z.infer<typeof LoginSchema>;

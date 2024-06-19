import * as z from "zod";

export const InfoRegisterSchema = z.object({
  name: z.string({ message: "Name is required" }),
  lastname: z.string({ message: "Lastname is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Password is required it must have at least 6 caracteres",
  }),
});

export type InfoRegisterType = z.infer<typeof InfoRegisterSchema>;

export const BillingRegisterSchema = z.object({
  name: z.string({ message: "Name is required" }),
  lastname: z.string({ message: "Lastname is required" }),
  adress: z.string({ message: "Adress is required" }),
  city: z.string({ message: "City is required" }),
});

export type BillingRegisterType = z.infer<typeof BillingRegisterSchema>;

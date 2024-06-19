import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const comfirmationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "delivered@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<a href="${comfirmationLink}">Click here to confirm your email</a>`,
  });
  if (error) {
    throw new Error("Error sending email");
  }
};

import { CardWrapper } from "@/components/marketing/auth/card-wrapper";
import { UserInfoForm } from "./user-info-form";

export const RegisterForm = () => {
  return (
    <CardWrapper
      title="Register"
      headerLabel="Create an account"
      backButtonLabel="Already have an account ?"
      backButtonHref="/auth/login"
    >
      <UserInfoForm />
    </CardWrapper>
  );
};

"use client";
import { verifyEmail } from "@/action/verify-email";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
export const VerificationEmailForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const handleSubmit = useCallback(async () => {
    if (success || error) return;
    setError(undefined);
    setSuccess(undefined);
    if (!token) {
      setError("Missing token!");
      return;
    }
    verifyEmail(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setSuccess(data.success);
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);
  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);
  return (
    <CardWrapper
      title="Verify your email"
      headerLabel="Confirming your email"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader color="#ffff" />}
        {!success && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

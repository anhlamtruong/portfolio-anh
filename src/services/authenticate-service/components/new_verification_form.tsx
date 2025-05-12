"use client";
import { BeatLoader, ClimbingBoxLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "../actions/new_verification";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./ui/form_error";
import { FormSuccess } from "./ui/form_success";
import { useRouter } from "next/navigation";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      if (success || error) {
        return;
      }

      if (!token) {
        setError("Missing token");
        return;
      }
      const { success: verificationSuccess, error: verificationError } =
        await newVerification(token);
      setError(verificationError);
      setSuccess(verificationSuccess);

      if (success) {
        router.push("/login");
      }
    } catch (error) {
      setError("Something went wrong:" + error);
    } finally {
      setIsLoading(false);
    }
  }, [error, router, success, token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <CardWrapper
        headerLabel="Confirm your verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to Login"
      >
        <div className=" flex flex-col items-center w-full justify-center">
          {!success && !error && (
            <ClimbingBoxLoader size={10} className=" rotate-45" />
          )}
          {isLoading && (
            <>
              <BeatLoader></BeatLoader>
              <p>Verifying your Token</p>
            </>
          )}
          <FormSuccess message={success}></FormSuccess>
          {!success && <FormError message={error}></FormError>}
        </div>
      </CardWrapper>
    </>
  );
};

export default NewVerificationForm;

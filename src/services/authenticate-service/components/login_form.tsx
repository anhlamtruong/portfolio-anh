"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schemas";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError } from "./ui/form_error";
import { FormSuccess } from "./ui/form_success";
import { login } from "../actions/login";
import { Icons } from "./ui/icons";
import Link from "next/link";
import { MESSAGES } from "../config/message";
export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? MESSAGES.ui.oauth_account_not_linked
      : "";
  //TODO: Add Loading State Notification
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const { success, error, twoFactor } = await login(
          values,
          callbackUrl as string
        );
        if (error) {
          form.reset();
          setError(error);
        }
        if (success) {
          form.reset();
          setSuccess(success);
        } else if (twoFactor) {
          setShowTwoFactor(true);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel={MESSAGES.ui.login_header}
      backButtonHref="/auth/register"
      backButtonLabel={MESSAGES.ui.login_back_to_register}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {MESSAGES.ui.login_two_factor_label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={MESSAGES.ui.login_two_factor_placeholder}
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{MESSAGES.ui.email_label}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={MESSAGES.ui.email_placeholder}
                          type="email"
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{MESSAGES.ui.password_label}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={MESSAGES.ui.password_placeholder}
                          type="password"
                        ></Input>
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">
                          {MESSAGES.ui.forgot_password}
                        </Link>
                      </Button>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError}></FormError>
          <FormSuccess message={success}></FormSuccess>
          {!!success && (
            <p>
              {MESSAGES.ui.go_to_mailbox}{" "}
              <a href="https://mail.google.com/">{MESSAGES.ui.mailbox_here}</a>
            </p>
          )}
          <Button disabled={isPending} type="submit" className=" w-full">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {showTwoFactor
              ? MESSAGES.ui.confirm_button
              : MESSAGES.ui.login_button}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "../schemas";
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

import { Icons } from "./ui/icons";
import { useSearchParams } from "next/navigation";
import { newPassword } from "../actions/new_password";
import { ClimbingBoxLoader } from "react-spinners";
import { MESSAGES } from "../config/message";

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const { success, error } = await newPassword(values, token);
      setError(error);
      setSuccess(success);
    });
  };

  return (
    <CardWrapper
      headerLabel={MESSAGES.ui.new_password_header}
      backButtonHref="/auth/login"
      backButtonLabel={MESSAGES.ui.new_password_back_to_login}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className="space-y-4">
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
                      placeholder={MESSAGES.ui.new_password_placeholder}
                      type="password"
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}></FormError>
          <FormSuccess message={success}></FormSuccess>
          {isPending && (
            <ClimbingBoxLoader
              className=" items-center text-center rotate-45 p-0 m-0"
              size={10}
            />
          )}
          <Button disabled={isPending} type="submit" className=" w-full">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {MESSAGES.ui.reset_button}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

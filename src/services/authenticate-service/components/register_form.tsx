"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../schemas";
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
import { register } from "../actions/register";
import { Icons } from "./ui/icons";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { MESSAGES } from "../config/message";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const { success, error } = await register(values);
      setError(error);
      setSuccess(success);
    });
  };

  return (
    <CardWrapper
      headerLabel={MESSAGES.ui.register_header}
      backButtonHref="/auth/login"
      backButtonLabel={MESSAGES.ui.register_back_to_login}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{MESSAGES.ui.name_label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={MESSAGES.ui.name_placeholder}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
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
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}></FormError>
          <FormSuccess message={success}></FormSuccess>
          {!!success && (
            <div className="ml-4 rounded-md flex items-center gap-x-2 text-sm">
              <MailCheck className="h-4 w-4" />
              <p>
                {MESSAGES.ui.go_to_mailbox}
                <Link
                  className=" hover:underline text-blue-600"
                  target="_blank"
                  href="https://mail.google.com/"
                >
                  {MESSAGES.ui.mailbox_here}
                </Link>
              </p>
            </div>
          )}
          <Button disabled={isPending} type="submit" className=" w-full">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {MESSAGES.ui.register_button}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

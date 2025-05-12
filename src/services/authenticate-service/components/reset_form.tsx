"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "../schemas";
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
import { reset } from "../actions/reset";
import { Icons } from "./ui/icons";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const { success, error } = await reset(values);
      setError(error);
      setSuccess(success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="sassy-authy@example.com"
                      type="email"
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}></FormError>
          <FormSuccess message={success}></FormSuccess>

          <Button disabled={isPending} type="submit" className=" w-full">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

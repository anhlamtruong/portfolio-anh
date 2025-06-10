"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { Button } from "@/services/authenticate-service/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/services/authenticate-service/components/ui/form";
import { Input } from "@/services/authenticate-service/components/ui/input";
import { FormError } from "@/services/authenticate-service/components/ui/form_error";
import { FormSuccess } from "@/services/authenticate-service/components/ui/form_success";
import { ClockLoader } from "react-spinners";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/app/creata/_trpc/client";
import {
  CreataAccountUpdateInput,
  updateAccountSchema,
} from "@/app/creata/_types";

const AccountEditSetting = () => {
  const trpc = useTRPC();
  const { data: userAccount } = useSuspenseQuery(
    trpc.private_creata.getCurrentUserAccount.queryOptions()
  );
  const { data: user } = useSuspenseQuery(
    trpc.private_creata.getCurrentUser.queryOptions()
  );
  const updateAccountMutation = useMutation(
    trpc.private_creata.updateAccount.mutationOptions()
  );

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreataAccountUpdateInput>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      avatarURL:
        userAccount?.avatarURL ??
        `https://avatar.iran.liara.run/public${userAccount?.username ? `?username=${userAccount.username}` : ""}`,
      name: user?.name ?? "",
      username: userAccount?.username ?? "",
      email: user?.email ?? "",
    },
  });
  const onSubmit = (values: CreataAccountUpdateInput) => {
    startTransition(() => {
      updateAccountMutation.mutate(values, {
        onSuccess: (data) => {
          if (data.status == "error") {
            setError(data.message);
          }
          if (data.status == "success") {
            setSuccess(data.message);
          }
        },
        onError: () => {
          setError("Something went wrong!");
        },
      });
    });
  };
  if (isPending && !user) {
    return null;
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your Name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Creata123"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatarURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://example.com/avatar.png"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  You can use a custom avatar URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    disabled={isPending || user?.isOAuth} // Disable if user is OAuth
                  />
                </FormControl>
                <FormDescription>
                  Email will not available to update for OAuth users.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className=" flex items-center gap-2">
          <Button className="w-24" disabled={isPending} type="submit">
            Save
          </Button>
          {isPending && <ClockLoader size={30}></ClockLoader>}
        </div>
      </form>
    </Form>
  );
};

export default AccountEditSetting;

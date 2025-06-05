"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useState } from "react"
import { useSession } from "next-auth/react"

import { Switch } from "@/services/authenticate-service/components/ui/switch"

import { Button } from "@/services/authenticate-service/components/ui/button"
import { settings } from "@/services/authenticate-service/actions/settings"
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/services/authenticate-service/components/ui/form"
import { Input } from "@/services/authenticate-service/components/ui/input"
import { FormError } from "@/services/authenticate-service/components/ui/form_error"
import { FormSuccess } from "@/services/authenticate-service/components/ui/form_success"
import { ClockLoader } from "react-spinners"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/app/creata/_trpc/client"

const SettingsSchema = z.object({
  name: z.optional(z.string()),
  username: z.optional(
    z
      .string()
      .min(6)
      .max(30)
      .trim()
      .regex(/^[a-z0-9]+$/)
  ),
  avatarURL: z.optional(z.string()),
  email: z.optional(z.string().email()),
})

const AccountEditSetting = () => {
  const trpc = useTRPC()
  const { data: userAccount } = useSuspenseQuery(
    trpc.private_creata.getCurrentUserAccount.queryOptions()
  )
  const { data: user } = useSuspenseQuery(
    trpc.private_creata.getCurrentUser.queryOptions()
  )
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      avatarURL:
        userAccount?.avatarURL ??
        `https://avatar.iran.liara.run/public${userAccount?.username ? `?username=${userAccount.username}` : ""}`,
      name: user?.name ?? "",
      username: userAccount?.username ?? "",
      email: user?.email ?? "",
    },
  })
  // const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
  //   startTransition(() => {
  //     settings(values)
  //       .then((data) => {
  //         if (data.error) {
  //           setError(data.error);
  //         }

  //         if (data.success) {
  //           update();
  //           setSuccess(data.success);
  //         }
  //       })
  //       .catch(() => setError("Something went wrong!"));
  //   });
  // };
  // if (isPending && !user) {
  //   return null;
  // }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(() => {})}>
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
  )
}

export default AccountEditSetting

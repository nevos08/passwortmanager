"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  email: z.string().email({ message: "Das ist keine gültige E-Mail-Adresse" }),
  password: z.string().min(3, { message: "Das Passwort muss mindestens 3 Zeichen lang sein" }),
})

export default function FormPanel() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signIn("credentials", { email: values.email, password: values.password, callbackUrl: "/dashboard" })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[450px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white dark:bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  className="bg-white dark:bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4 w-full">Anmelden</Button>
      </form>
    </Form>
  )
}

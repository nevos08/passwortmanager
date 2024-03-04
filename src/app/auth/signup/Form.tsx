"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  firstName: z.string().min(3, { message: "Der Vorname muss mindestens 3 Zeichen lang sein" }),
  lastName: z.string().min(3, { message: "Der Nachname muss mindestens 3 Zeichen lang sein" }),
  email: z.string().email({ message: "Das ist keine gültige E-Mail-Adresse" }),
  password: z.string().min(3, { message: "Das Passwort muss mindestens 3 Zeichen lang sein" }),
})

export default function FormPanel() {
  const [disabled, setDisabled] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setDisabled(true)

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }),
    })

    const { status, msg }: { status: "success" | "error"; msg: string } = await res.json()

    setDisabled(false)

    if (status == "error") {
      toast.error("Es ist ein Fehler aufgetreten.", { description: msg })
    } else {
      toast.success("Dein Konto wurde erstellt.", { description: msg })
      signIn("credentials", { email: values.email, password: values.password })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[450px]"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vorname</FormLabel>
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
          name="lastName"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Nachname</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem className="mt-2">
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

        <Button
          className="mt-4 w-full"
          disabled={disabled}
        >
          Anmelden
        </Button>
      </form>
    </Form>
  )
}

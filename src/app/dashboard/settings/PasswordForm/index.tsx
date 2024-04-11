"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { changePassword } from "../actions"
import { toast } from "sonner"

const formSchema = z.object({
  password1: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
  password2: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
})

export default function PasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password1: "",
      password2: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.password1 !== values.password2) {
      form.setError("password1", { message: "Die Passwörter stimmen nicht überein." })
      form.setError("password2", { message: "Die Passwörter stimmen nicht überein." })
      return
    }

    form.clearErrors("password1")
    form.clearErrors("password2")

    changePassword(values.password1, values.password2).then((res) => {
      if (!res.state) {
        toast.error(res.msg)
      } else {
        toast.success(res.msg)
        form.reset()
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-2 flex w-full items-center justify-between gap-4"
      >
        <FormField
          control={form.control}
          name="password1"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Neues Passwort</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormDescription>Das wird dein neues Master-Passwort.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Passwort bestätigen</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormDescription>Wiederhole das Passwort aus dem ersten Feld.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Passwort ändern</Button>
      </form>
    </Form>
  )
}

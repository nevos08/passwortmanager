"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(3),
  url: z.string().url(),
  entries: z.array(z.object({ type: z.number(), value: z.string() })),
})

export default function CreationForm() {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: {} })
  const [types, setTypes] = useState<Array<{ description: string; id: number }>>([])

  useEffect(() => {
    fetch("/api/items/get-types", { method: "GET" }).then(async (res) => {
      console.log(await res.json())
    })
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-secondary"
                />
              </FormControl>
              <FormDescription>Der Name des Eintrags.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-secondary"
                />
              </FormControl>
              <FormDescription>Die URL der Website. Wird zur Autovervollständigung verwendet.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4 w-full">Bestätigen</Button>
      </form>
    </Form>
  )
}

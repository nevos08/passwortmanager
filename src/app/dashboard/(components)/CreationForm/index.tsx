"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FaPlus } from "react-icons/fa6"
import { FocusEvent } from "react"
import Entry from "@/app/dashboard/(components)/CreationForm/Entry"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createItem } from "@/app/dashboard/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(3),
  url: z.string().url(),
})

export default function CreationForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  })
  const [types, setTypes] = useState<Array<{ description: string; id: number; hideInput: boolean }>>([])
  const [entries, setEntries] = useState<Array<{ type: number; value: string }>>([])

  useEffect(() => {
    fetch("/api/items/get-types", { method: "GET" }).then(async (res) => {
      const types = await res.json()
      setTypes(types.types)
    })
  }, [])

  const onAdd = () => {
    setEntries([...entries, { type: types[0].id, value: "" }])
  }

  const onRemove = (index: number) => {
    setEntries((prev) => {
      const newEntries = [...prev]
      newEntries.splice(index, 1)
      return newEntries
    })
  }

  const onChange = (index: number, value: string) => {
    setEntries((prev) => {
      const newEntries = [...prev]
      newEntries[index].value = value
      return newEntries
    })
  }

  const onTypeChange = (index: number, typeId: number) => {
    setEntries((prev) => {
      if (types.find((x) => x.id == typeId) == undefined) return prev

      const newEntries = [...prev]
      newEntries[index].type = typeId
      return newEntries
    })
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (entries.length === 0) {
      return toast.error("Es muss mindestens ein Eintrag vorhanden sein.")
    }

    const res = await createItem(values.name, values.url, entries)
    if (res.state) {
      toast.success(res.msg)
      router.refresh()
    } else {
      toast.error(res.msg)
    }
  }

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.setAttribute("type", "text")
  }

  const onBlur = (e: FocusEvent<HTMLInputElement>, entryIndex: number) => {
    e.target.setAttribute("type", types.find((x) => x.id == entries[entryIndex].type)?.hideInput ? "password" : "text")
  }

  // @ts-ignore
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
                  className="bg-secondary transition-all hover:shadow-md"
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
                  className="bg-secondary transition-all hover:shadow-md"
                />
              </FormControl>
              <FormDescription>Die URL der Website. Wird zur Autovervollständigung verwendet.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={"my-4 border-b border-t py-2"}>
          <h2 className={"text-md my-2 font-[600]"}>Einträge</h2>
          {entries.length == 0 && <p className={"text-sm text-gray-500"}>Keine Einträge vorhanden.</p>}
          {entries.map((entry, index) => (
            <Entry
              key={`entry-${index}`}
              index={index}
              entry={entry}
              types={types}
              onFocus={onFocus}
              onBlur={onBlur}
              onTypeChange={onTypeChange}
              onValueChange={onChange}
              onRemove={() => onRemove(index)}
            />
          ))}

          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type={"button"}
                  size={"icon"}
                  className={"mb-2 mt-4 w-full border transition hover:shadow-md"}
                  variant={"secondary"}
                  onClick={onAdd}
                >
                  <FaPlus className="text-xl" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Neuen Eintrag erstellen</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button className="w-full">Bestätigen</Button>
      </form>
    </Form>
  )
}

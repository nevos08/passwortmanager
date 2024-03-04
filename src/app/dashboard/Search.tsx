"use client"

import { FormEvent } from "react"
import { useDebouncedState } from "@mantine/hooks"
import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export default function SearchField() {
  const [search, setSearch] = useDebouncedState("", 500)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2"
    >
      <Input
        defaultValue={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Suche..."
        className="bg-secondary dark:bg-background"
      />
      <Button
        size="icon"
        className="shrink-0"
        type="submit"
      >
        <FaSearch className="text-lg" />
      </Button>
    </form>
  )
}

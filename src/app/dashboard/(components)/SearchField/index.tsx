"use client"

import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

export default function SearchField() {
  const pathname = usePathname()
  const { replace } = useRouter()

  const search = (formData: FormData) => {
    const searchValue = formData.get("searchValue") as string
    if (searchValue.length === 0) {
      replace(pathname)
      return
    }

    const searchParams = new URLSearchParams()
    searchParams.set("search", searchValue)

    replace(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <form
      action={search}
      className="flex items-center gap-2"
    >
      <Input
        name="searchValue"
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

"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { LuMoonStar, LuSun } from "react-icons/lu"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      variant="ghost"
      size="icon"
    >
      {theme === "dark" ? <LuMoonStar className="text-2xl" /> : <LuSun className="text-2xl" />}
    </Button>
  )
}

"use client"

import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FaCheck, FaCopy } from "react-icons/fa6"
import { toast } from "sonner"
import { PopoverClose } from "@radix-ui/react-popover"

type GeneratePasswordPopoverProps = {
  onValueChange: (value: string) => void
}

export default function GeneratePasswordPopover({ onValueChange }: GeneratePasswordPopoverProps) {
  const [password, setPassword] = useState<string>("")
  const [length, setLength] = useState<number>(20)
  const [specialCharacters, setSpecialCharacters] = useState<boolean>(false)
  const [numbers, setNumbers] = useState<boolean>(true)

  const onGenerate = () => {
    let charset = ""
    let newPassword = ""

    // Add characters to charset
    charset += "abcdefghijklmnopqrstuvwxyz"
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    // Add special characters and numbers if selected
    if (specialCharacters) charset += "!@#$%^&*()"
    if (numbers) charset += "0123456789"

    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(newPassword)
  }

  const onCopy = () => {
    navigator.clipboard.writeText(password)
    toast.success("Passwort kopiert!")
  }

  const onSubmit = () => {
    onValueChange(password)
    toast.success("Passwort eingefügt!")
  }

  return (
    <>
      <h2 className={"font-[600]"}>Passwort generieren</h2>

      <div className={"mt-2"}>
        <p>Passwortlänge</p>
        <div className={"mt-[-5px] flex items-center gap-4"}>
          <Slider
            className={"grow"}
            min={1}
            max={100}
            defaultValue={[length]}
            onValueChange={(value) => setLength(value[0])}
          />
          <div className={"h-full shrink-0 grow-0 basis-[20%] rounded-md border bg-background py-2 text-center"}>
            {length}
          </div>
        </div>
      </div>

      <div className={"mt-2 flex items-center justify-between gap-4"}>
        <p>Sonderzeichen?</p>
        <Switch
          defaultChecked={specialCharacters}
          onCheckedChange={setSpecialCharacters}
        />
      </div>

      <div className={"mt-2 flex items-center justify-between gap-4"}>
        <p>Zahlen?</p>
        <Switch
          defaultChecked={numbers}
          onCheckedChange={setNumbers}
        />
      </div>

      <Button
        className={"mt-2 w-full"}
        onClick={onGenerate}
      >
        Passwort generieren
      </Button>

      {password !== "" && (
        <div
          className={
            "mt-2 flex items-center justify-between gap-2 rounded-md bg-background px-4 py-2 shadow-md dark:border dark:shadow-none"
          }
        >
          <TooltipProvider delayDuration={400}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className={"grow overflow-hidden text-ellipsis"}>{password}</p>
              </TooltipTrigger>
              <TooltipContent>{password}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className={"shrink-0"}
                  onClick={onCopy}
                >
                  <FaCopy className={"text-xl"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Passwort kopieren</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverClose asChild>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className={"shrink-0"}
                    onClick={onSubmit}
                  >
                    <FaCheck className={"text-xl"} />
                  </Button>
                </PopoverClose>
              </TooltipTrigger>
              <TooltipContent>Passwort verwenden</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  )
}

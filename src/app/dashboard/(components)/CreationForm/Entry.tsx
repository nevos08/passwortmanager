import { FocusEvent } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BsStars } from "react-icons/bs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import GeneratePasswordPopover from "@/app/dashboard/(components)/GeneratePasswordPopover"
import { FaXmark } from "react-icons/fa6"

type CreationFormEntryProps = {
  index: number
  entry: { type: number; value: string }
  types: { id: number; description: string; hideInput: boolean }[]
  onFocus: (e: FocusEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>, index: number) => void
  onTypeChange: (index: number, typeId: number) => void
  onValueChange: (index: number, value: string) => void
  onRemove: () => void
}

export default function CreationFormEntry({
  index,
  entry,
  types,
  onBlur,
  onFocus,
  onTypeChange,
  onValueChange,
  onRemove,
}: CreationFormEntryProps) {
  const isPassword = (): boolean => {
    return types.find((x) => x.id == entry.type)?.hideInput || false
  }

  const onChangeText = (value: string) => onValueChange(index, value)

  return (
    <>
      <div
        key={`entry-${index}`}
        className={"mt-2 flex items-center justify-between gap-2"}
      >
        <Button
          size="icon"
          variant="secondary"
          className="shrink-0"
          onClick={onRemove}
        >
          <FaXmark />
        </Button>
        <Select
          defaultValue={types.find((x) => x.id == entry.type)?.description}
          onValueChange={(value) => onTypeChange(index, types.find((x) => x.description == value)?.id || 0)}
        >
          <SelectTrigger className={"shrink-0  basis-[30%] bg-secondary transition-all hover:shadow-md"}>
            <SelectValue
              placeholder={"Typ"}
              defaultValue={types[0].description}
            />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem
                value={type.description}
                key={type.id}
              >
                {type.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className={"grow bg-secondary transition-all hover:shadow-md"}
          type={types.find((x) => x.id == entry.type)?.hideInput ? "password" : "text"}
          onFocus={(e) => onFocus(e)}
          onBlur={(e) => onBlur(e, index)}
          defaultValue={entry.value}
          placeholder={"Wert eingeben..."}
          onChange={(e) => onValueChange(index, e.currentTarget.value)}
        />
        {isPassword() && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type={"button"}
                size={"icon"}
                className={"shrink-0 grow-0"}
                variant={"ghost"}
              >
                <BsStars className={"text-xl"} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-[400px]"}>
              <GeneratePasswordPopover onValueChange={onChangeText} />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  )
}

'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'

export default function SelectDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-[180px] rounded border border-gray-300 bg-gray-100 text-black">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="rounded border border-gray-300 bg-white shadow-md">
        <SelectGroup>
          <SelectLabel className="px-2 py-1 text-gray-700">Fruits</SelectLabel>
          <SelectItem className="cursor-pointer px-2 py-1 hover:bg-gray-200" value="apple">
            Apple
          </SelectItem>
          <SelectItem className="cursor-pointer px-2 py-1 hover:bg-gray-200" value="banana">
            Banana
          </SelectItem>
          <SelectItem className="cursor-pointer px-2 py-1 hover:bg-gray-200" value="blueberry">
            Blueberry
          </SelectItem>
          <SelectItem className="cursor-pointer px-2 py-1 hover:bg-gray-200" value="grapes">
            Grapes
          </SelectItem>
          <SelectItem className="cursor-pointer px-2 py-1 hover:bg-gray-200" value="pineapple">
            Pineapple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

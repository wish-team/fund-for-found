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
  const [selectedValue, setSelectedValue] = React.useState('')
  const [textInput, setTextInput] = React.useState('')

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Select onValueChange={(value) => setSelectedValue(value)}>
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

      {/* Conditionally render the text input below the select component */}
      {selectedValue === 'pineapple' && (
        <input
          type="text"
          placeholder="Type here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
        />
      )}
    </div>
  )
}

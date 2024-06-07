"use client"

import { useEffect, useState } from "react"

export default function ChipAutoComplete() {
  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const suggestions = [
    "Hands On",
    "Live Coding",
    "Angular",
    "Vue JS",
    "JS Fundamentals",
    "Typescript",
    "Browser/DOM",
    "API",
    "Router",
    "Forms",
    "Jest",
    "Vue",
    "Templates",
    "Directives",
    "Routing",
    "State management",
    "Asynchronous programming",
    "React Js",
    "Hooks",
    "JSX",
    "CSS",
    "flex",
    "DOM",
  ]

  useEffect(() => {
    if (inputValue) {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false)
      }, 500) // simulate a loading delay
      return () => clearTimeout(timer)
    } else {
      setLoading(false)
    }
  }, [inputValue])

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
  }

  const handleTagRemove = (index) => {
    const updatedTags = [...tags]
    updatedTags.splice(index, 1)
    setTags(updatedTags)
  }

  const handleSuggestionClick = (suggestion) => {
    if (!tags.includes(suggestion)) {
      setTags([...tags, suggestion])
      setInputValue("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const trimmedInput = inputValue.trim()
      if (!suggestions.includes(trimmedInput)) {
        setInputValue("")
      }
    }
  }

  const highlightMatch = (suggestion, input) => {
    const regex = new RegExp(`(${input})`, "gi")
    return suggestion.replace(regex, "<span class='text-blue-600'>$1</span>")
  }

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().startsWith(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  )

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex flex-col">
        <label htmlFor="input-tags" className="mb-2 text-[10px] font-[8px] text-gray-700">
          INPUT TAGS
        </label>
        <div className="flex flex-wrap items-center gap-2 p-3 border bg-gray-100 border-gray-300 rounded-[20px]">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-2 py-1 text-sm text-black bg-white rounded-[10px] shadow-md"
            >
              {tag}
              <XIcon className="w-3 h-3 cursor-pointer" onClick={() => handleTagRemove(index)} />
            </span>
          ))}
          <input
            type="text"
            id="input-tags"
            className="flex-1 p-1 text-sm bg-gray-100 outline-none"
            placeholder="Type here..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {loading && <LoadingSpinner />}
        </div>
        {inputValue.length > 0 && filteredSuggestions.length > 0 && (
          <div className="relative">
            <div className="absolute left-0 mt-1 w-full rounded-lg bg-white shadow-lg">
              <ul className="p-2 text-sm text-gray-700">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 rounded-[10px] cursor-pointer hover:bg-gray-100 hover:text-black"
                    onClick={() => handleSuggestionClick(suggestion)}
                    dangerouslySetInnerHTML={{ __html: highlightMatch(suggestion, inputValue) }}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-gray-500">
        Enter a comma-separated chips and enjoy.
      </p>
    </div>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function LoadingSpinner() {
  return (
    <svg
      className="w-5 h-5 text-black animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

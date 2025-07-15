"use client"

import { useState } from "react"

export default function FilterBar({
  onSearch,
  onFilter,
}: {
  onSearch: (q: string) => void
  onFilter: (range: string) => void
}) {
  const [searchText, setSearchText] = useState("")

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
      <input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)
          onSearch(e.target.value)
        }}
        placeholder="Tìm kiếm khóa học..." 
        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 
          text-gray-700 placeholder-gray-400 shadow-sm"
      />

      <select
        onChange={(e) => onFilter(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 
          bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500 transition duration-200 hover:cursor-pointer"
      >
        <option value="">Lọc theo giá</option>
        <option value="low">Dưới 500K</option>
        <option value="mid">500K – 1 triệu</option>
        <option value="high">Trên 1 triệu</option>
      </select>
    </div>
  )
}

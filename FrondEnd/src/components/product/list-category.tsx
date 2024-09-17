'use client'

import { ListCategoryProps } from '@/components/interfaces/interface'
import { Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const ListCategory: React.FC<ListCategoryProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products/categories'
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <div className='flex justify-start items-start mb-10'>
      <Select
        maxW='250px'
        placeholder='Tất cả'
        value={selectedCategory}
        onChange={handleChange}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Select>
    </div>
  )
}

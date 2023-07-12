'use client'
import { ChangeEvent, useEffect, useState } from 'react'

import { filterList } from '@/utils/helpers'

type FilterProps = {
    chooseFilter: (filter: {
        category: { id: string; value: string }
        difficulty: { id: string; value: string }
    }) => void
}

const Filter = ({ chooseFilter }: FilterProps) => {
    const [filterOpen, setFilterOpen] = useState(false)
    const [filterValues, setFilterValues] = useState({
        category: { id: '', value: '' },
        difficulty: { id: '', value: '' },
    })
    const filterIcon = filterOpen ? '▲' : '▼'

    useEffect(() => {
        chooseFilter(filterValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterValues])

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>, filterName: string) => {
        const selectedFilter = {
            id: e.target.options[e.target.selectedIndex].id,
            value: e.target.value,
        }
        setFilterValues((prevFilterValues) => ({
            ...prevFilterValues,
            [filterName]: selectedFilter,
        }))
    }
    const categoryList = filterList.category.map((item, index) => (
        <option value={item.name} key={index} id={item.id}>
            {item.name}
        </option>
    ))

    const difficultyList = filterList.difficulty.map((item, index) => (
        <option value={item.name} key={index} id={item.id}>
            {item.name}
        </option>
    ))

    return (
        <>
            <button className="cursor-pointer text-xl mb-6" onClick={() => setFilterOpen(!filterOpen)}>
                Filter <span className="text-xs">{filterIcon}</span>
            </button>
            {filterOpen && (
                <div className="flex flex-col mb-8">
                    <div className="flex flex-col">
                        <label className="text-lg" htmlFor="category">
                            Category:
                        </label>
                        <select
                            className="w-1/2 text-sm rounded-lg bg-black/50 p-2"
                            id="category"
                            value={filterValues.category.value}
                            onChange={(e) => handleFilterChange(e, 'category')}
                        >
                            <option value="">Select Category</option>
                            {categoryList}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg" htmlFor="difficulty">
                            Difficulty:
                        </label>
                        <select
                            className="w-1/2 text-sm rounded-lg bg-black/50 p-2"
                            id="difficulty"
                            value={filterValues.difficulty.value}
                            onChange={(e) => handleFilterChange(e, 'difficulty')}
                        >
                            <option value="">Select Difficulty</option>
                            {difficultyList}
                        </select>
                    </div>
                </div>
            )}
        </>
    )
}
export default Filter

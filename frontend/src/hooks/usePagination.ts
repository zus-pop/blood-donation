import { useState, useMemo } from 'react'

interface UsePaginationProps<T> {
    data: T[]
    itemsPerPage?: number
}

interface UsePaginationReturn<T> {
    currentPage: number
    totalPages: number
    paginatedData: T[]
    goToPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
    setItemsPerPage: (items: number) => void
    itemsPerPage: number
    totalItems: number
}

export function usePagination<T>({
    data,
    itemsPerPage: initialItemsPerPage = 10
}: UsePaginationProps<T>): UsePaginationReturn<T> {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage)

    const totalItems = data.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return data.slice(startIndex, endIndex)
    }, [data, currentPage, itemsPerPage])

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const setItemsPerPage = (items: number) => {
        setItemsPerPageState(items)
        setCurrentPage(1) // Reset to first page when changing items per page
    }

    // Reset to page 1 if current page exceeds total pages after data changes
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1)
    }

    return {
        currentPage,
        totalPages,
        paginatedData,
        goToPage,
        nextPage,
        prevPage,
        setItemsPerPage,
        itemsPerPage,
        totalItems
    }
}

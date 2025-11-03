import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import { useGetUsersQuery } from "@/features/user/api/useGetUsers"
import { useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import type { userQueryResponse } from "../types/usersTypes"

const pageSize: number = 5

function UserPage() {
    const { data, isLoading ,isError} = useGetUsersQuery()
    const users:userQueryResponse = data?.data || []
    const [filter, setFilter] = useState<string>('')
    const [page, setPage] = useState(1)

    const filtered = users.filter((p) =>
        p?.name.toLowerCase().includes(filter.toLowerCase())
    )

    const totalPages = Math.ceil(filtered.length / pageSize)
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Spinner />
            </div>
        )
    if (isError){
        return (
            <div className={'text-center'}>error</div>
        )
    }
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
                    👥 User List
                </h1>
                <Input
                    placeholder="Search name..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full sm:w-64"
                />
            </div>

            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[50px] sm:w-[60px] text-xs sm:text-sm">ID</TableHead>
                            <TableHead className="text-xs sm:text-sm">Name</TableHead>
                            <TableHead className="hidden md:table-cell text-xs sm:text-sm">Username</TableHead>
                            <TableHead className="text-xs sm:text-sm">Email</TableHead>
                            <TableHead className="hidden sm:table-cell text-xs sm:text-sm">City</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginated?.map((user: userQueryResponse) => (
                            <TableRow
                                key={user.id}
                                className="hover:bg-muted/40 transition-colors text-xs sm:text-sm"
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="hidden sm:table-cell">{user.address?.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <Pagination>
                        <PaginationContent className="flex flex-wrap justify-center gap-2">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={page === i + 1}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

export default UserPage

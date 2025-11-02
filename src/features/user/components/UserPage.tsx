import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import { useGetUsersQuery } from "@/features/user/api/useGetUsers.ts"
import {useState} from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {Input} from "@/components/ui/input.tsx";
const pageSize:number = 5

function UserPage() {
    const { data, isLoading } = useGetUsersQuery()
    const users = data?.data || []
    const [filter,setFilter] = useState('')
    const [page, setPage] = useState(1)

    const filtered =  users.filter((p: any) =>
        p?.name.toLowerCase().includes(filter.toLowerCase())
    )

    const totalPages = Math.ceil(filtered.length / pageSize)
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

    if (isLoading)
        return (
            <div>
                <Spinner />
            </div>
        )

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-6 text-foreground">👥 User List</h1>
            <Input
                placeholder="Search title..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-64"
            />
            <div className="overflow-x-auto rounded-xl border border-border shadow-sm mt-6">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[60px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>City</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginated?.map((user: any) => (
                            <TableRow
                                key={user.id}
                                className="hover:bg-muted/40 transition-colors"
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address?.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {totalPages > 1 && (
                <Pagination className={'mt-6'}>
                    <PaginationContent>
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
            )}
        </div>
    )
}

export default UserPage

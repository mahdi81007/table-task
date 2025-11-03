import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import { useGetPostsQuery } from "../api/useGetPosts"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import type { postQueryResponse } from "../types/postsTypes"

const pageSize: number = 10

function PostPage() {
    const { data, isLoading,isError } = useGetPostsQuery()
    const posts = data?.data || []

    const [filter, setFilter] = useState("")
    const [page, setPage] = useState(1)

    const filtered = posts.filter((p: any) =>
        p.title.toLowerCase().includes(filter.toLowerCase())
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
                    📝 Posts
                </h1>
                <Input
                    placeholder="Search title..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full sm:w-64"
                />
            </div>

            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className={'text-xs sm:text-sm'}>
                            <TableHead className="w-[50px] sm:w-[60px] ">ID</TableHead>
                            <TableHead className="hidden sm:table-cell ">User ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden md:table-cell">Body</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginated.map((post: postQueryResponse) => (
                            <TableRow
                                key={post.id}
                                className="hover:bg-muted/40 transition-colors text-xs sm:text-sm"
                            >
                                <TableCell>{post.id}</TableCell>
                                <TableCell className="hidden sm:table-cell">{post.userId}</TableCell>
                                <TableCell className="font-sm md:font-medium whitespace-normal break-words">
                                    {post.title}
                                </TableCell>
                                <TableCell className="hidden md:table-cell whitespace-pre-line text-muted-foreground">
                                    {post.body}
                                </TableCell>
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

export default PostPage

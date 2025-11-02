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
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";


const pageSize:number = 10

function PostPage() {
    const { data, isLoading } = useGetPostsQuery()
    const posts = data?.data || []

    const [filter,setFilter] = useState('')
    const [page, setPage] = useState(1)

    const filtered =  posts.filter((p: any) =>
        p.title.toLowerCase().includes(filter.toLowerCase())
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
            <h1 className="text-2xl font-semibold mb-6 text-foreground">📝 Posts</h1>
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
                            <TableHead>User ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Body</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginated.map((post: any) => (
                            <TableRow
                                key={post.id}
                                className="hover:bg-muted/40 transition-colors"
                            >
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.userId}</TableCell>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell className="whitespace-pre-line text-sm text-muted-foreground">
                                    {post.body}
                                </TableCell>
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

export default PostPage

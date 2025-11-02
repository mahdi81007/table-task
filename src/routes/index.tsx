import {createBrowserRouter} from "react-router-dom";
import HomePage from "@/features/home/components/HomePage";
import PostPage from "@/features/post/components/PostPage";
import UserPage from "@/features/user/components/UserPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: 'posts',
        element: <PostPage/>
    },
    {
        path: 'users',
        element:<UserPage/>
    }

])
export default router;
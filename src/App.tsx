import router from "@/routes";
import {RouterProvider} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/appSidebar";
import ThemeToggle from "@/components/themToggle";

function App() {
    const savedTheme =
        JSON.parse(localStorage.getItem("theme") || '{"state":{"theme":"light"}}').state.theme
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <main>
                    <div className={'flex items-center justify-between'}>
                        <SidebarTrigger/>
                        <ThemeToggle/>
                    </div>
                    <RouterProvider router={router}/>
                </main>
            </SidebarProvider>
        </>
    )
}

export default App

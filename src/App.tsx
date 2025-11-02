import router from "@/routes";
import {RouterProvider} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/appSidebar";
import ThemeToggle from "@/components/themToggle";

function App() {
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

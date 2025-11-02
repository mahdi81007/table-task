import router from "@/routes";
import {RouterProvider} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/appSidebar.tsx";

function App() {
    return (<SidebarProvider>
        <AppSidebar/>
        <main>
            <SidebarTrigger/>
            <RouterProvider router={router}/>
        </main>
    </SidebarProvider>)
}

export default App

import { useThemeStore } from "@/store/useThemeStore"
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore()
    const savedTheme =
        JSON.parse(localStorage.getItem("theme") || '{"state":{"theme":"light"}}').state.theme
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
    return (
        <Button  onClick={toggleTheme} className={'mr-4 mt-4'}  variant="outline" size="icon" aria-label="Submit">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    )
}

import {StrictMode, useState} from 'react'
import './assets/styles/index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import {QueryClientProvider} from "@tanstack/react-query";
import {getQueryClient} from "@/data/query";

// eslint-disable-next-line react-refresh/only-export-components
function QueryClient() {
    const [queryClient] = useState(() => getQueryClient())
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StrictMode>
    )
}

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(<QueryClient />)

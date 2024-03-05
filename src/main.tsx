import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style/index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContextProvider } from './contexts/auth.tsx'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>;
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

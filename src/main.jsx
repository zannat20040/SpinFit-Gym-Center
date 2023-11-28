import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './Routes'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import AuthProvider from './AuthProvider/AuthProvider'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <Toaster/>
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BottomNav } from '@/components/layout/BottomNav'
import HomePage from '@/pages/HomePage'
import PlaceDetailPage from '@/pages/PlaceDetailPage'
import ProfilePage from '@/pages/ProfilePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="relative h-[100dvh] max-w-md mx-auto bg-white overflow-hidden flex flex-col">
          <Routes>
            <Route path="/"                         element={<HomePage />} />
            <Route path="/place/:kakaoPlaceId"      element={<PlaceDetailPage />} />
            <Route path="/profile"                  element={<ProfilePage />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

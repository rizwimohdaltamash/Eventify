import { Calendar, Sparkles } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EventsPage from './pages/EventsPage'
import EventAttendeesPage from './pages/EventAttendeesPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg border-b border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  Eventify
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </h1>
                <p className="text-gray-300 text-xs">Manage events & attendees with ease</p>
              </div>
            </div>
          </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/events/:eventId/attendees" element={<EventAttendeesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

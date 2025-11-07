import { Box } from '@chakra-ui/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CocktailsPageBasic from './components/CocktailsPageBasic'
import MusingsRouter from './components/MusingsPage'
import ExperimentsRouter from './components/ExperimentsPage'
import Dash0Test from './components/Dash0Test'

// Import Dash0 tracking functions
import { sendEvent } from '@dash0/sdk-web'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Track page views on route change
  useEffect(() => {
    // Track page view with Dash0
    sendEvent('page_view', {
      path: location.pathname,
      search: location.search,
      hash: location.hash,
      timestamp: Date.now(),
    })

    // Track custom event for navigation
    sendEvent('navigation', {
      from: location.pathname,
      timestamp: Date.now(),
    })
  }, [location.pathname, location.search, location.hash])

  return (
    <Box>
      <Navbar />
      {/* <Dash0Test /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cocktails" element={<CocktailsPageBasic />} />
        <Route path="/musings/*" element={<MusingsRouter />} />
        <Route path="/experiments/*" element={<ExperimentsRouter />} />
      </Routes>
    </Box>
  )
}

export default App

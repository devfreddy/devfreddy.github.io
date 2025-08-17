import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ColorModeProvider>
      </ChakraProvider>
    </ErrorBoundary>
  </StrictMode>,
)

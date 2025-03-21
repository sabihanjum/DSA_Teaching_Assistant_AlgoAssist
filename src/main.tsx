
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './components/ThemeProvider'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

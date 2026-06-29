import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import AppRoutes from './routes/AppRoutes'
import Home from './pages/Home'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppRoutes />
      <Footer/>
    </div>
  )
}

export default App

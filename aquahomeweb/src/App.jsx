import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import RegisterPage from './pages/Register.jsx'
import Login from './pages/Login.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
          <RegisterPage />
  )
}

export default App

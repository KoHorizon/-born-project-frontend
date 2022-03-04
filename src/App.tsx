import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import { ProtectedRoute } from './services/protectedRoute'
import MainPage from './pages/mainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} > </Route>

        <Route element={<ProtectedRoute/>}> 
              <Route path="/test" element={<MainPage/>} > </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

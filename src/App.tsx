import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import { ProtectedRoute } from './services/protectedRoute'
import MainPage from './pages/mainPage'
import { ReduxProvider } from './providers/redux'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ReduxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>} > </Route>

          <Route element={<ProtectedRoute/>}> 
                <Route path="/test" element={<MainPage/>} > </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default App

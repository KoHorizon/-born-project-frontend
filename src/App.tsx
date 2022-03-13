import { useState } from 'react'
import './App.css'
import './Reset.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import { ProtectedRoute } from './services/protectedRoute'
import MainPage from './pages/mainPage'
import { ReduxProductProvider } from './providers/reduxProducts'
import { ReduxBasketProvider } from './providers/reduxBasket'
import ProductPage from './pages/productPage'

function App() {

  return (
    <ReduxProductProvider>
      <ReduxBasketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage/>} /> 

            <Route element={<ProtectedRoute/>}> 
                  <Route path="/test" element={<MainPage/>} /> 
                  <Route path="details/product/:id" element={<ProductPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReduxBasketProvider>
    </ReduxProductProvider>
  )
}
export default App

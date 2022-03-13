import { useState } from 'react'
import './App.css'
import './Reset.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import { ProtectedRoute } from './services/protectedRoute'
import MainPage from './pages/mainPage'
import { ReduxProductProvider } from './providers/providerProducts'
import { ReduxBasketProvider } from './providers/providerBasket'
import ProductPage from './pages/productPage'
import { ReduxIngredientProvider } from './providers/providerIngredient'

function App() {

  return (
    <ReduxIngredientProvider>
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
    </ReduxIngredientProvider>
  )
}
export default App

import { useEffect, useState } from 'react'
import './App.css'
import './Reset.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import { ProtectedRouteUser } from './services/protectedRoute'
import MainPage from './pages/mainPage'
import { ReduxProductProvider } from './providers/providerProducts'
import { ReduxBasketProvider } from './providers/providerBasket'
import ProductPage from './pages/productPage'
import { ReduxIngredientProvider } from './providers/providerIngredient'
import InvoicePage from './pages/invoicePage'
import { ReduxUserProvider } from './providers/providerUser'
import KitchenPage from './pages/kitchen/kitchenPage'
import CreateIngredientPage from './components/admin/createIngredient'
import CreateIngredientAndProductPage from './pages/admin/createIngredientAndProductPage'
import MainAdminPage from './pages/admin/mainAdminPage'

function App() {

  return (
    <ReduxUserProvider>

    <ReduxIngredientProvider>
      <ReduxProductProvider>
        <ReduxBasketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage/>} /> 

              <Route element={<ProtectedRouteUser/>}> 
                    <Route path="/details/product/:id" element={<ProductPage/>} />
                    <Route path="/home" element={<MainPage/>} /> 
                    <Route path="/invoice" element={<InvoicePage/>} />
                    <Route path="/kitchen" element={<KitchenPage/>} /> 
                    <Route path="/admin/create" element={<CreateIngredientAndProductPage/>} /> 
                    <Route path="/admin/gestion" element={<MainAdminPage/>} /> 

              </Route>

    

            </Routes>
          </BrowserRouter>
        </ReduxBasketProvider>
      </ReduxProductProvider>
    </ReduxIngredientProvider>
    </ReduxUserProvider>
  )
}
export default App

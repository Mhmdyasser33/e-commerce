import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './index.css'
import {createBrowserRouter , createRoutesFromElements , Route , RouterProvider} from "react-router-dom"; 
import App from './App.tsx'

import HomePage from "./pages/HomePage.tsx"
import ProductPage from './pages/ProductPage.tsx';
import axios from "axios" ; 
 axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/" ; 
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} element={<HomePage/>}/> 
      <Route path='/product/:slug' element={<ProductPage/>}/>
    </Route>
 ))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)

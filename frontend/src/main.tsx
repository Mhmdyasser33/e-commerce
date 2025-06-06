import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import {createBrowserRouter , createRoutesFromElements , Route , RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import App from './App.tsx'
import HomePage from "./pages/HomePage.tsx"
import ProductPage from './pages/ProductPage.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from './context/index.tsx';
import CartPage from './pages/CartPage.tsx';
import SigninPage from './pages/SigninPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ShippingAddressPage from './pages/ShippingAddressPage.tsx';
import './index.css'
import PaymentMethodPage from './pages/PaymentMethodPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PlaceOrderPage from './pages/PlaceOrderPage.tsx';
import OrderPageDetails from './pages/OrderPageDetails.tsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import OrderHistoryPage from './pages/OrderHistoryPage.tsx';
/* import Test from './testConcept/Test.tsx';
 */
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} element={<HomePage/>}/> 
      <Route path='/product/:slug' element={<ProductPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
       <Route path='signin' element={<SigninPage/>}/>
       <Route path='signup' element={<SignupPage/>}/>
       <Route path='' element={<ProtectedRoute/>}>
       <Route path='shipping' element={<ShippingAddressPage/>}/>
       <Route path='payment' element={<PaymentMethodPage/>}/>
       <Route path='placeorder' element={<PlaceOrderPage/>}/>
       <Route path='/order/:id' element={<OrderPageDetails/>}/>
       <Route path='/orderhistory' element={<OrderHistoryPage/>}/>
       </Route>
    </Route>
 ))
const queryClient = new QueryClient() ; 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <StoreProvider>
    <PayPalScriptProvider options={{clientId : "AVnrcbleEcnNsT-MBYvUXnVVYcQqdICZKcWwP7HOTRHIaagIaU8Lw6Puibnrj-IdBeaTCvm0G58xlEIL"}} deferLoading={true}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
            <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
          </HelmetProvider>
    </PayPalScriptProvider>
    
    </StoreProvider>  
  </StrictMode>,  
)

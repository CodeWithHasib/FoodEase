import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Cart from '../pages/cart/Cart'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            }, 
            {
                path: '/login',
                element : <Login />
            }, 
            {
                path: '/register',
                element : <Register />
            }, 
            {
                path : '/cart', 
                element : <Cart />
            }
        ]
    }
])
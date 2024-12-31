import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import Signup from "../Pages/Signup";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import Category from "../Pages/Category";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";
import Order from "../Pages/Order";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'forgotpassword',
                element: <ForgotPassword/>
            },
            {
                path: 'signup',
                element: <Signup/>
            },
            {
                path: 'admin-panel',
                element: <AdminPanel/>,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path: "products",
                        element: <AllProducts/>
                    }
                ]
            },
            {
                path: "product-category",
                element: <Category/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "search",
                element: <SearchProduct/>
            },
            {
                path: "success",
                element: <Success/>,
            },

            {
                path: "cancel",
                element: <Cancel/>
            },
            {
                path: "order",
                element: <Order/>
            }
        ]
    }
])

export default router;
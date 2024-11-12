
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import PaymentSuccess from "../components/PaymentSuccess";
import Register from "../components/Register";
import CategoryPage from "../pages/category/CategoryPage";
import DashBoardLayout from "../pages/dashboard/DashBoardLayout";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageOrders from "../pages/dashboard/admin/orders/ManageOrders";
import ManageUsers from "../pages/dashboard/admin/users/ManageUsers";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import OrderDetails from "../pages/dashboard/user/orders/OrderDetails";
import UserOrders from "../pages/dashboard/user/orders/UserOrders";
import UserPayments from "../pages/dashboard/user/payments/UserPayments";
import UserProfile from "../pages/dashboard/user/profile/UserProfile";
import UserReviews from "../pages/dashboard/user/reviews/UserReviews";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement: <ErrorPage/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
          path:"/categories/:categoryName",
          element:<CategoryPage/>
        },
        {
          path:"/search",
          element:<Search/>
        },
        {
          path:"/shop",
          element:<ShopPage/>
        },
        {
          path:"/shop/:id",
          element:<SingleProduct/>
        },
        {
          path: "/success",
          element:<PaymentSuccess/>
        },
        {
          path:"/orders/:orderId",
          element: <OrderDetails/>

        }
       
      ]
    },

    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path: "/dashboard", // parents
      element:<PrivateRoute><DashBoardLayout/></PrivateRoute>,
      children: [
        

        // if we give "/" before order or payments it will becomne absolute path


        // user routes
        //relative path
        {
          path:"",
          element:<UserDMain/>
        },
       
        {
          path: "orders",
          element:<UserOrders/>
        },
        //relative path 
        {
          path:"payments",
          element: <UserPayments/>
        },
        {
          path:"profile",
          element: <UserProfile/>
        },
        {
          path:"reviews",
          element: <UserReviews/>
        },

        // admin router

        {
          path:"admin",
          element:<PrivateRoute role="admin"><AdminDMain/></PrivateRoute> 
        },
        {
          path:"add-product",
          element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>
        },
        {
          path:"manage-products",
          element:<PrivateRoute role="admin"><ManageProduct/></PrivateRoute> 
        },
        {
          path:"update-product/:id",
          element:<PrivateRoute role="admin"><UpdateProduct/></PrivateRoute> 
        },
        {
          path:"manage-orders",
          element:<PrivateRoute role="admin"><ManageOrders/></PrivateRoute>
        },
        {
          path:"users",
          element:<PrivateRoute role="admin"><ManageUsers/></PrivateRoute>
        },

      ]
    }
  ]);


  export default router ;
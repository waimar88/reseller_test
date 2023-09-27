import { Navigate, createBrowserRouter } from "react-router-dom"

import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./Dashboard";

import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users";
import Customers from "./views/Customers";
import CustomerForm from "./views/CustomerForm";
import Accounts from "./views/Accounts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users/" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
            {
                path: '/customers',
                element: <Customers />
            },
            {
                path: '/customers/new',
                element: <CustomerForm key="customerCreate" />
            },
            {
                path: '/customers/:id',
                element: <CustomerForm key="customerUpdate" />
            },
            {
                path: '/accounts',
                element: <Accounts key="accountApiDataShow" />
            },
            {
                path: '/accounts/new',
                element: <Accounts key="accountsNew" />
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },

])

export default router;
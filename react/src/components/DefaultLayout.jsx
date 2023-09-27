import { NavLink, Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/dashboard">
                    Dashboard
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/customers">
                    Customers
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/accounts">
                    Accounts
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/users">
                    Users
                </NavLink>
            </aside>

            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout"> Logout </a>
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>

                {notification &&
                    <div className="notification">
                        {notification}
                    </div>
                }
            </div>
        </div>
    )
}

export default DefaultLayout
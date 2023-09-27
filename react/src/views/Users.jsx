import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import PaginationLinks from "../components/PaginationLinks";
import { format } from 'date-fns';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext()
    const [meta, setMeta] = useState({});

    const onPageClick = (link) => {
        getUsers(link.url);
    };

    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }
        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User was successfully deleted')
                getUsers()
            })
    }

    const getUsers = (url) => {
        url = url || "/users";
        setLoading(true)

        axiosClient.get(url)
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
                setMeta(data.meta);
            })
            .catch(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{format(new Date(u.created_at), 'dd-MM-yyyy')}</td>
                                    <td>
                                        <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>

                {users.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
            </div>
        </div>
    )
}

export default Users
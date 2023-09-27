import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { useStateContext } from "../context/ContextProvider.jsx";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext()

    const onDeleteClick = cus => {
        if (!window.confirm("Are you sure you want to delete this customer?")) {
            return
        }
        console.log(cus.id);
        axiosClient.delete(`/customers/${cus.id}`)
            .then(() => {
                setNotification('Customer was successfully deleted')
                getCustomers()
            })

    }

    const getCustomers = (url) => {
        url = "/customers";
        setLoading(true)

        axiosClient.get(url)
            .then(({ data }) => {
                setLoading(false)
                setCustomers(data.customers)
                // console.log(data.customers);
                // console.log(data.response.access_token);
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
            })
    }

    useEffect(() => {
        getCustomers();
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Customers</h1>
                <Link className="btn-add" to="/customers/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
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
                            {customers.map(cus => (
                                <tr key={cus.id}
                                    className={cus.user_active_manage === "expired" ? "expired_row" : ""}
                                >
                                    <td>{cus.id}</td>
                                    <td>{cus.first_name + ' ' + cus.last_name}</td>
                                    <td>{cus.email}</td>
                                    <td>{cus.mobile_number}</td>
                                    <td>{cus.address}</td>
                                    <td>{format(new Date(cus.created_at), 'dd-MM-yyyy')}</td>
                                    <td>
                                        <Link className="btn-edit" to={'/customers/' + cus.id}>Edit</Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={ev => onDeleteClick(cus)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>

            </div>
        </div >
    )
}

export default Customers
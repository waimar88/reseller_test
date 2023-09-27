import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { useStateContext } from "../context/ContextProvider.jsx";

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext()
    const [message, setMessage] = useState(null)

    const onDeleteClick = acc => {
        if (!window.confirm("Are you sure you want to delete this account?")) {
            return
        }
        console.log(acc.id);
        // axiosClient.delete(`/accounts/${acc.id}`)
        //     .then(() => {
        //         setNotification('Account was successfully deleted')
        //         getAccounts()
        //     })

    }

    const pathname = window.location.pathname;

    const getAccounts = (url) => {
        url = pathname;
        setLoading(true)

        axiosClient.get(url)
            .then(({ data }) => {
                setLoading(false)
                setAccounts(data.accounts.value)
                console.log(data.accounts.value);
                console.log(data.token);

                if (url == "/accounts/new") {
                    setNotification('Account was successfully created')
                    console.log('API data created status');
                }
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
                const response = error.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message)
                    console.log(error);
                }
            })
    }

    useEffect(() => {
        getAccounts();
        console.log(pathname);
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Accounts</h1>
                <Link className="btn-add" to="/accounts/new">Add new</Link>
            </div>

            {message &&
                <div className="alert">
                    <p>{message}</p>
                </div>
            }

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Account Index</th>
                            <th>Account Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            {/* <th>Create Date</th> */}
                            {/* <th>Actions</th> */}
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
                            {accounts.map(acc => (
                                <tr key={acc.accountIndex}>
                                    <td>{acc.accountIndex}</td>
                                    <td>{acc.accountName}</td>
                                    <td style={{ whiteSpace: "pre-line" }}>
                                        {acc.accountDescription}
                                    </td>
                                    <td>
                                        {
                                            acc.accountImagePath ?
                                                <img
                                                    src={acc.accountImagePath}
                                                    width={60}
                                                    alt='Image'
                                                />
                                                :
                                                ''
                                        }
                                    </td>
                                    {/* <td>{format(new Date(acc.created_at), 'dd-MM-yyyy')}</td> */}
                                    {/* <td>
                                        <Link className="btn-edit" to={'/customers/' + acc.accountIndex}>Edit</Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={ev => onDeleteClick(acc)}>Delete</button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>

            </div>
        </div >
    )
}

export default Accounts
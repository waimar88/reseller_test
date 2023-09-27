import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function CustomerForm() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [customer, setCustomer] = useState({
        id: null,
        first_name: '',
        last_name: '',
        customer_user_id: '',
        customer_user_index: '',
        mobile_number: '',
        mobile_number2: '',
        address: '',
        email: '',
        city: '',
        user_active_manage: '',
        company: '',
        state: '',
        display_name: '',
        caller_id: '',
        customer_user_notes: ''
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/customers/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setCustomer(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (customer.id) {
            axiosClient.put(`/customers/${customer.id}`, customer)
                .then(() => {
                    setNotification('Customer was successfully updated')
                    navigate('/customers')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            console.log(customer);
            axiosClient.post('/customers', customer)
                .then(() => {
                    setNotification('Customer was successfully created')
                    navigate('/customers')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                    console.log(err);
                })
        }
    }

    return (
        <>
            {customer.id && <h1>Update Customer: {customer.name}</h1>}
            {!customer.id && <h1>New Customer</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={customer.first_name}
                            onChange={ev => setCustomer({ ...customer, first_name: ev.target.value })}
                            placeholder="First Name"
                        />
                        <input
                            value={customer.last_name}
                            onChange={ev => setCustomer({ ...customer, last_name: ev.target.value })}
                            placeholder="Last Name"
                        />
                        <input
                            value={customer.customer_user_id}
                            onChange={ev => setCustomer({ ...customer, customer_user_id: ev.target.value })}
                            placeholder="User Id"
                        />
                        <input
                            value={customer.customer_user_index}
                            onChange={ev => setCustomer({ ...customer, customer_user_index: ev.target.value })}
                            placeholder="User Index"
                        />
                        <input
                            value={customer.mobile_number}
                            onChange={ev => setCustomer({ ...customer, mobile_number: ev.target.value })}
                            placeholder="Mobile Number"
                        />
                        <input
                            value={customer.mobile_number2}
                            onChange={ev => setCustomer({ ...customer, mobile_number2: ev.target.value })}
                            placeholder="Mobile Number 2"
                        />
                        <input
                            value={customer.address}
                            onChange={ev => setCustomer({ ...customer, address: ev.target.value })}
                            placeholder="Address"
                        />
                        <input
                            value={customer.email}
                            onChange={ev => setCustomer({ ...customer, email: ev.target.value })}
                            placeholder="Email"
                        />
                        <input
                            value={customer.city}
                            onChange={ev => setCustomer({ ...customer, city: ev.target.value })}
                            placeholder="City"
                        />
                        <input
                            value={customer.user_active_manage}
                            onChange={ev => setCustomer({ ...customer, user_active_manage: ev.target.value })}
                            placeholder="User Active Manage"
                        />
                        <input
                            value={customer.company}
                            onChange={ev => setCustomer({ ...customer, company: ev.target.value })}
                            placeholder="Company"
                        />
                        <input
                            value={customer.state}
                            onChange={ev => setCustomer({ ...customer, state: ev.target.value })}
                            placeholder="State"
                        />
                        <input
                            value={customer.display_name}
                            onChange={ev => setCustomer({ ...customer, display_name: ev.target.value })}
                            placeholder="Display Name"
                        />
                        <input
                            value={customer.caller_id}
                            onChange={ev => setCustomer({ ...customer, caller_id: ev.target.value })}
                            placeholder="Caller Id"
                        />
                        <input
                            value={customer.customer_user_notes}
                            onChange={ev => setCustomer({ ...customer, customer_user_notes: ev.target.value })}
                            placeholder="User Notes"
                        />



                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}
import { useEffect } from "react";
import axiosClient from "./axios-client.js";

function Dashboard() {

    // const getUserToken = (url) => {
    //     url = "https://rapi.earthlink.iq/api/reseller/Token";

    //     const passdata = {
    //         username: 'walaaim',
    //         password: '@walaalink@',
    //         loginType: '1',
    //         grant_type: 'password'
    //     }

    //     axiosClient.post(url, passdata)
    //         .then((response) => {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })

    // }

    // useEffect(() => {
    //     getUserToken();

    // }, [])


    return (
        <div>Dashboard</div>
    )
}

export default Dashboard
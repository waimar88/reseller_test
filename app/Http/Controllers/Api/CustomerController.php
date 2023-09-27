<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;

use Illuminate\Support\Facades\Http;

class CustomerController extends Controller
{
    public function index()
    {
        // $apiURL = 'https://rapi.earthlink.iq/api/reseller/Token' ;  
        // $data = [
        //     "username"   => "walaaim",
        //     "password"   => "@walaalink@",
        //     "loginType"  => "1",
        //     "grant_type" => "password"
        // ]; 
        // $api_response = Http::asForm()->post($apiURL, $data);
        // $response     = json_decode($api_response->getBody(), true);

        $customers = Customer::all();
        // return response(compact('customers', 'response'));
        return response(compact('customers'));
    }

    public function show(Customer $customer)
    {
        return new CustomerResource($customer);
    }

    public function store(StoreCustomerRequest $request)
    {
        $data = $request->validated();
        $customer = Customer::create($data);

        return response(new CustomerResource($customer) , 201);
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $data = $request->validated();
        
        $customer->update($data);

        return new CustomerResource($customer);
    }

    public function destroy(Customer $customer) // update the 'user_active_manage'
    {
        $data = [
            'user_active_manage' => 'expired'
        ];
        $customer->update($data);

        // $customer->delete();

        return response("", 204);
    }

}

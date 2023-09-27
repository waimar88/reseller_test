<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use App\Models\Account;
use Illuminate\Support\Facades\Http;

class AccountController extends Controller
{
    public function GetApiToken()
    {
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/Token' ;  
        $data = [
            "username"   => "walaaim",
            "password"   => "@walaalink@",
            "loginType"  => "1",
            "grant_type" => "password"
        ]; 
        $api_response       = Http::asForm()->post($apiURL, $data);
        $api_response_token = json_decode($api_response->getBody(), true); 

        return $api_response_token['access_token'];
    } // GetApiToken
   
    public function index()
    {
        $token = $this->GetApiToken();
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/accounts/all' ;      
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $api_response = Http::withHeaders($headers)->get($apiURL);  
        $accounts     = json_decode($api_response->getBody(), true);      

        return response(compact('accounts', 'token'));
    } // index
 
    public function accountsNew() { // insert API data to db
        $token = $this->GetApiToken();
        $apiURL = 'https://rapi.earthlink.iq/api/reseller/accounts/all' ;      
        $headers = [
            'Authorization'=>'Bearer '.$token, 
            'Accept' => 'application/json'
        ];
        $api_response = Http::withHeaders($headers)->get($apiURL);  
        $accounts     = json_decode($api_response->getBody(), true);       
        
        $collection = collect($accounts['value']);
        $accountIndex = $collection->pluck("accountIndex");
        $accountIndex->all(); 
        $account = Account::whereIn('account_index', $accountIndex)->first();
        if($account){
            return response(compact('accounts', 'token'), 422);
        } else {
            foreach ($accounts['value'] as $acc) {
                Account::insert([
                    'account_index' => $acc['accountIndex'],
                    'account_name'  => $acc['accountName'],
                    'is_max_account'     => $acc['isMAXAccount'],
                    'account_description' => $acc['accountDescription'],
                    'account_image_path'  => $acc['accountImagePath'],
                    'account_thumbnail'   => $acc['accountThumbnail'],
                    'end_user_account_price' => $acc['endUserAccountPrice'],
                    'account_price'          => $acc['accountPrice']
                ]);          
            } 
            return response(compact('accounts', 'token'), 201);
        }            

    } // accountsNew
   
}

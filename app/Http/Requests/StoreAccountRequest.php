<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccountRequest extends FormRequest
{
   
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'accountIndex'     => 'required|unique:accounts',
            'accountName'      => 'required',
          
            // 'account_index'     => 'required|unique:accounts',
            // 'account_name'      => 'required',
            // // 'is_max_account'    => '',
            // // 'account_description'   => '',
            // // 'account_image_path'    => '',
            // // 'account_thumbnail'     => '',
            // // 'end_user_account_price' => '',
            // // 'account_price' => '',            
        ];
    }
}

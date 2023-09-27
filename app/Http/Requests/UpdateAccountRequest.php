<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAccountRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }
   
    public function rules(): array
    {
        return [
            'accountIndex'     => 'required|unique:accounts',
            'accountName'      => 'required',
            
            // 'account_index'     => 'required',
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

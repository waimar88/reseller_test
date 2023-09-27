<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [           
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'customer_user_id' => $this->customer_user_id,
            'customer_user_index' => $this->customer_user_index,
            'mobile_number' => $this->mobile_number,
            'mobile_number2' => $this->mobile_number2,
            'address' => $this->address,
            'email' => $this->email,
            'city' => $this->city,
            'user_active_manage' => $this->user_active_manage,
            'company' => $this->company,
            'state' => $this->state,
            'display_name' => $this->display_name,
            'caller_id' => $this->caller_id,
            'customer_user_notes' => $this->customer_user_notes,
            'created_at' => $this->created_at->format('Y-m-d H:i:s')
        ];
    }
}

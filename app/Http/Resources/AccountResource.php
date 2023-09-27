<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [           
            'id' => $this->id,
            'account_index'     => $this->account_index,
            'account_name'      => $this->account_name,
            'is_max_account'    => $this->is_max_account,
            'account_description'   => $this->account_description,
            'account_image_path'    => $this->account_image_path,
            'account_thumbnail'     => $this->account_thumbnail,
            'end_user_account_price' => $this->end_user_account_price,
            'account_price' => $this->account_price,            
            'created_at'    => $this->created_at->format('Y-m-d H:i:s')
        ];
    }
}

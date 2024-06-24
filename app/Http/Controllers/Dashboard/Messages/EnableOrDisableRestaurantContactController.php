<?php

namespace App\Http\Controllers\Dashboard\Messages;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Messages\EnableOrDisableRestaurantContactRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;

class EnableOrDisableRestaurantContactController extends Controller
{
    public function __invoke(EnableOrDisableRestaurantContactRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();        
        $restaurant->update($data);
        return ApiResponse::created([
            'message' => 'Restaurant contact has been updated successfully',
            'restaurant' => $restaurant
        ]);
    }

}

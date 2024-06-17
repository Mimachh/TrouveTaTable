<?php

namespace App\Http\Controllers\Dashboard\Messages;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Messages\EnableOrDisableRestaurantContactRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;
use App\Repositories\UserRepository;

class EnableOrDisableRestaurantContactController extends Controller
{
    public function __invoke(EnableOrDisableRestaurantContactRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $user = auth()->user();
        if(!(new UserRepository())->isFondator($user->id)) {
            return ApiResponse::forbidden("You are not allowed to change the status of the restaurant!");  
        }
        
        $restaurant->update($data);
        return ApiResponse::created([
            'message' => 'Restaurant contact has been updated successfully',
            'restaurant' => $restaurant
        ]);
    }

}

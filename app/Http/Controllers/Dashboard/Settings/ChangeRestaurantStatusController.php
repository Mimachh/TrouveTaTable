<?php

namespace App\Http\Controllers\Dashboard\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Settings\ChangeRestaurantStatusRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;
use App\Repositories\UserRepository;

class ChangeRestaurantStatusController extends Controller
{
    public function __invoke(ChangeRestaurantStatusRequest $request, Restaurant $restaurant)
    {
        $user = auth()->user();
        if(!(new UserRepository())->isFondator($user->id)) {
            return ApiResponse::forbidden("You are not allowed to change the status of the restaurant!");  
        }
        $data = $request->validated();
        $restaurant->update($data);
        return ApiResponse::created(["message" => "Restaurant status updated successfully!"]);
    }
}

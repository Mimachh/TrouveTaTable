<?php

namespace App\Http\Controllers\Dashboard\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Settings\ChangeRestaurantStatusRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;

class ChangeRestaurantStatusController extends Controller
{
    public function __invoke(ChangeRestaurantStatusRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);
        return ApiResponse::created(["message" => "Restaurant status updated successfully!"]);
    }
}

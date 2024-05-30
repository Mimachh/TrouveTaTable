<?php

namespace App\Http\Controllers\Dashboard\Reservation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Reservation\EnableOrDisableRestaurantReservationRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;

class EnableOrDisableRestaurantReservationController extends Controller
{
    public function __invoke(EnableOrDisableRestaurantReservationRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);
        return ApiResponse::created(['message' => 'Restaurant reservation status updated successfully']);
    }
}

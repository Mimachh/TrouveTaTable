<?php

namespace App\Http\Controllers\Dashboard\Settings\Notification;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Settings\Notification\UpdateNotifyRestaurantAfterBookingStatusRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;

class UpdateNotifyRestaurantAfterBookingStatusController extends Controller
{
    public function __invoke(UpdateNotifyRestaurantAfterBookingStatusRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);
        return ApiResponse::created(["Setting has been updated successfully"]);
    }
}

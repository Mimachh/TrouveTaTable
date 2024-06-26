<?php

namespace App\Http\Controllers\Dashboard\Settings\Notification;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Settings\Notification\UpdateNotifyRestaurantMessageStatusRequest;
use App\Models\Restaurant;

class UpdateNotifyRestaurantMessageStatusController extends Controller
{
    public function __invoke(UpdateNotifyRestaurantMessageStatusRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);
    }
}

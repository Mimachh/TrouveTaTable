<?php

namespace App\Http\Controllers\Dashboard\Settings\Notification;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Settings\Notification\UpdateNotifyClientAfterBookingStatusRequest;
use App\Http\Resources\UserResource;
use App\Models\Restaurant;

class UpdateNotifyClientAfterBookingStatusController extends Controller
{
    public function __invoke(UpdateNotifyClientAfterBookingStatusRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $user = auth()->user();

        $restaurant->update($data);
    }
}

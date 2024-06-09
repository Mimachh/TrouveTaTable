<?php

namespace App\Http\Controllers\Dashboard\Settings\Notification;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Settings\Notification\UpdateNotifyClientDayBeforeBookingStatusRequest;
use App\Models\Restaurant;

class UpdateNotifyClientDayBeforeBookingStatusController extends Controller
{
    public function __invoke(UpdateNotifyClientDayBeforeBookingStatusRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);
    }
}

<?php

namespace App\Http\Controllers\Dashboard\Settings\Notification;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;

class IndexRestaurantNotificationController extends Controller
{
    public function __invoke(Restaurant $restaurant)
    {
        $restaurantResource = new RestaurantResource($restaurant);
        
        return inertia('Dashboard/Settings/Notifications/Index', [
            'restaurant' => $restaurantResource,
            "can" => [
                "enable_notifications_after_booking_user" => auth()->user()->can('enable_notifications_after_booking_user', $restaurant),
                "enable_notifications_after_booking_restaurant" => auth()->user()->can('enable_notifications_after_booking_restaurant', $restaurant),
                "enable_notifications_day_before_booking_user" => auth()->user()->can('enable_notifications_day_before_booking_user', $restaurant),
                "enable_notifications_contact_message_restaurant" => auth()->user()->can('enable_notifications_contact_message_restaurant', $restaurant),
            ]
        ]);
    }
}

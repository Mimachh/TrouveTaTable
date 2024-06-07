<?php

namespace App\Http\Requests\Dashboard\Settings\Notification;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotifyRestaurantAfterBookingStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->can('enable_notifications_after_booking_restaurant', $this->restaurant);
    }

    public function rules(): array
    {
        return [
            "is_notify_restaurant_after_booking" => ['required', 'boolean'],
        ];
    }
}

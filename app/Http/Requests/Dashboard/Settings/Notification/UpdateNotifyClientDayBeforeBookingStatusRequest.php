<?php

namespace App\Http\Requests\Dashboard\Settings\Notification;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotifyClientDayBeforeBookingStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->can('enable_notifications_day_before_booking_user', $this->restaurant);
    }
    public function rules(): array
    {
        return [
            "is_notify_client_a_day_before_booking" => "required|boolean"
        ];
    }
}

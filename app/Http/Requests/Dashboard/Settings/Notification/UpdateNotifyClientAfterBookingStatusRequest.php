<?php

namespace App\Http\Requests\Dashboard\Settings\Notification;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotifyClientAfterBookingStatusRequest extends FormRequest
{

    public function authorize(): bool
    {
        return auth()->user()->can('enable_notifications_after_booking_user', $this->route('restaurant'));
    }

    public function rules(): array
    {
        return [
            'is_notify_client_after_booking' => ['required', 'boolean'],
        ];
    }
}

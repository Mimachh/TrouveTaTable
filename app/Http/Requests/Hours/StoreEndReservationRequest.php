<?php

namespace App\Http\Requests\Hours;

use Illuminate\Foundation\Http\FormRequest;

class StoreEndReservationRequest extends FormRequest
{

    public function authorize(): bool
    {
        return auth()->user()->can('handle_services', $this->restaurant);
    }

    public function rules(): array
    {
        return [
            'time_to_stop_reservation' => 'nullable|date_format:H:i:s',
        ];
    }
}

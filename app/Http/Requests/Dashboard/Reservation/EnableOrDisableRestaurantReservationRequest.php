<?php

namespace App\Http\Requests\Dashboard\Reservation;

use Illuminate\Foundation\Http\FormRequest;

class EnableOrDisableRestaurantReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'accept_reservations' => 'required|boolean',
        ];
    }
}

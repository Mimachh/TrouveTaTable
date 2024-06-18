<?php

namespace App\Http\Requests\Dashboard\Reservation;

use Illuminate\Foundation\Http\FormRequest;

class CreateReservationFromAdminStepOneRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('enableBookingForm', $this->route('restaurant'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "reservation_date" => ["required", "date"],
            "service_id" => ["required", "integer", "exists:services,id"],
            "guests" => ["required", "integer", "min:1"],
        ];
    }
}

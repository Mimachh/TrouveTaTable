<?php

namespace App\Http\Requests\Dashboard\Reservation;

use App\Rules\TimeInServiceRange;
use Illuminate\Foundation\Http\FormRequest;

class CreateReservationFromAdminStepTwoRequest extends FormRequest
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
            "services" => ["required", "array"],
            "table_id" => ["required", "integer", "exists:tables,id"],
            'time' => ['required', 'string', new TimeInServiceRange], 
        ];
    }
}

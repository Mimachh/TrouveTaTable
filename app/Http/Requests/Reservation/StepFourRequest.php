<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Foundation\Http\FormRequest;

class StepFourRequest extends FormRequest
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
            "first_name" => ["required", "string", "max:255"],
            "last_name" => ["required", "string", "max:255"],
            "email" => ["required", "email", "max:255"],
            "phone" => ["nullable", "string", "max:255"],
            "guests" => ["required", "integer", "min:1"],
            "reservation_date" => ["required", "date"],
            "time" => ["required", "date_format:H:i:s"],
            "table_id" => ["required", "exists:tables,id"],
            "service_id" => ["required", "exists:services,id"],
        ];
    }
}

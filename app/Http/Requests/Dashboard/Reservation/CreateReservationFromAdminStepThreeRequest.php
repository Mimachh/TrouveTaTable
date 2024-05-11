<?php

namespace App\Http\Requests\Dashboard\Reservation;

use App\Rules\TimeInServiceRange;
use Illuminate\Foundation\Http\FormRequest;

class CreateReservationFromAdminStepThreeRequest extends FormRequest
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
            // ici je mets toutes les règles de validation pour la troisième étape
            "reservation_date" => ["required", "date"],
            "service_id" => ["required", "integer", "exists:services,id"],
            "guests" => ["required", "integer", "min:1"],

            "services" => ["required", "array"],
            "table_id" => ["required", "integer", "exists:tables,id"],
            'time' => ['required', 'string', new TimeInServiceRange], 

            "first_name" => ["required", "string", "max:60"],
            "last_name" => ["required", "string", "max:60"],
            "email" => ["required", "email", "max:255"],
            "phone" => ["nullable", "string", "max:12"],
        ];
    }
}

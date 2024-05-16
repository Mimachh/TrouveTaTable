<?php

namespace App\Http\Requests\Reservation;

use App\Rules\TimeInServiceRange;
use App\Rules\TimeInServiceRangeWithOptionParams;
use Illuminate\Foundation\Http\FormRequest;

class StepTwoRequest extends FormRequest
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
            'services' => ['required', 'array'],
            'guests' => ['required', 'integer', 'min:1'],
            'reservation_date' => ['required', 'date'],
            // 'time' => ['required', 'string', new TimeInServiceRange],
            'time' => ['required', 'string', new TimeInServiceRangeWithOptionParams],
            'id' => ['required', 'string'],
        ];
    }
}

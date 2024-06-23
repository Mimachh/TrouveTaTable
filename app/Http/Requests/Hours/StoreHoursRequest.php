<?php

namespace App\Http\Requests\Hours;

use Illuminate\Foundation\Http\FormRequest;

class StoreHoursRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('handle_services', $this->restaurant);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "day_id" => "required|exists:days,id",
            "services" => "nullable|array",
            "services.*.id" => "nullable|exists:services,id",
            "services.*.name" => "required|string",
            "services.*.start_time" => ["required", "date_format:H:i:s", "before:services.*.end_time"],
            "services.*.end_time" => "required|date_format:H:i:s",
        ];
    }
}

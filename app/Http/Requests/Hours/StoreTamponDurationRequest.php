<?php

namespace App\Http\Requests\Hours;

use Illuminate\Foundation\Http\FormRequest;

class StoreTamponDurationRequest extends FormRequest
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
            'time_before_service' => 'nullable|date_format:H:i:s',
            'time_after_service' => 'nullable|date_format:H:i:s',
        ];
    }
}

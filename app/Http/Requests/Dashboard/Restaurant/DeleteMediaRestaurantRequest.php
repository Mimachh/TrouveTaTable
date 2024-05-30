<?php

namespace App\Http\Requests\Dashboard\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class DeleteMediaRestaurantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('updateMedia', $this->restaurant);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "id" => [
                "required",
                "exists:media,id"
            ]
        ];
    }
}

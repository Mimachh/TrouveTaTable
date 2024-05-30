<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageToRestaurantRequest extends FormRequest
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
            'subject' => ['required', 'string', 'max:60'],
            'content' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:100'],
            'last_name' => ['required', 'string', 'min:3', 'max:60'],
            'first_name' => ['required', 'string', 'min:3', 'max:60'],
            'phone' => ['required', 'string', 'min:10', 'max:13'],
            'restaurant_id' => ['required', 'exists:restaurants,id'],
        ];
    }
}

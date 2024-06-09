<?php

namespace App\Http\Requests\Dashboard\Messages;

use Illuminate\Foundation\Http\FormRequest;

class EnableOrDisableRestaurantContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('enableMessages', $this->route('restaurant'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'accept_messages' => 'required|boolean',
        ];
    }
}

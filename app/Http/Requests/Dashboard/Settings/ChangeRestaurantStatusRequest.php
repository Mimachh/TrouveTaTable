<?php

namespace App\Http\Requests\Dashboard\Settings;

use Illuminate\Foundation\Http\FormRequest;

class ChangeRestaurantStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->can('change_status', $this->route('restaurant'));
    }

    public function rules(): array
    {
        return [
            'active' => ['required', 'boolean'],
        ];
    }
}

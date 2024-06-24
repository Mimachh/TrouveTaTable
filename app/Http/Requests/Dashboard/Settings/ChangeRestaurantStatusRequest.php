<?php

namespace App\Http\Requests\Dashboard\Settings;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

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

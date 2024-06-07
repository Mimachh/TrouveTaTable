<?php

namespace App\Http\Requests\Dashboard\Rating;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRatingStatusClientRequest extends FormRequest
{

    public function authorize(): bool
    {
        return auth()->user()->can('enable_rating', $this->route('restaurant'));
    }

    public function rules(): array
    {
        return [
            'accept_rating' => ['required', 'boolean'],
        ];
    }
}

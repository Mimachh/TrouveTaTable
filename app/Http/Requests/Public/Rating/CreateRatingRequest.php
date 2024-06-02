<?php

namespace App\Http\Requests\Public\Rating;

use Illuminate\Foundation\Http\FormRequest;

class CreateRatingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'comment' => ['required', 'string', 'max:255'],
            'notes' => ['required', 'array'],
            'notes.*.item_id' => ['required', 'integer', 'exists:rating_restaurant_items,id'],
            'notes.*.rate' => ['required', 'integer', 'min:1', 'max:5'],
            "token" => ["required", "string", "exists:rating_tokens,token"],
        ];
    }
}

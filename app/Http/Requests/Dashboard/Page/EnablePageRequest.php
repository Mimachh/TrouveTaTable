<?php

namespace App\Http\Requests\Dashboard\Page;

use Illuminate\Foundation\Http\FormRequest;

class EnablePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        // return auth()->user()->can('enablePage', $this->route('restaurant'));
        return true;
    }

    public function rules(): array
    {
        return [
            'enable_page' => ['required', 'boolean'],
        ];
    }
}

<?php

namespace App\Http\Requests\Dashboard\Newsletter;

use Illuminate\Foundation\Http\FormRequest;

class UnsubscribeUserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return auth()->user()->can('unsubscribeNewsletterUser', $this->restaurant);
    }

    public function rules(): array
    {
        return [
            'id' => ['required', 'exists:newsletter_users,id'],
        ];
    }
}

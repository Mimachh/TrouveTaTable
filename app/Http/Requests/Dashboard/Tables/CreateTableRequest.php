<?php

namespace App\Http\Requests\Dashboard\Tables;

use App\Enums\TableStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('createTable', $this->restaurant);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['nullable', 'integer', "exists:tables,id"],
            'name' => ['required', 'string', 'max:255'],
            'seats' => ['required', 'integer'],
            'status' => ['required', 'string', 'max:60', Rule::in(array_column(TableStatus::cases(), 'value'))],
        ];
    }
}

<?php

namespace App\Http\Requests\Dashboard\Restaurant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rules\File;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\JsonResponse;

class UpdateMediaRestaurantRequest extends FormRequest
{
    
    public static array $extensions = [
        "jpg", "jpeg", "png", "webp"
    ];

    public function authorize(): bool
    {
        return auth()->user()->can('updateMedia', $this->route('restaurant'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
  
            "attachments" => [
                'array', 'max:5', 'min:1',
                function ($attribute, $value, $fail) {

                    $totalSize = collect($value)->sum(fn(UploadedFile $file) => $file->getSize());
                    if($totalSize > 1 * 1024 * 1024 * 1024) {
                        $fail('The total size of the files must not exceed 1GB');
                    }
                }
            ],
            "attachments.*" => [
                'image',
                File::types(self::$extensions)
                // "mimes:jpeg,png,jpg,webp"
            ]
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
    }

    
}

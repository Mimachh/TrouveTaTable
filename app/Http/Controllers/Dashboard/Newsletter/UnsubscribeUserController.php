<?php

namespace App\Http\Controllers\Dashboard\Newsletter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Newsletter\UnsubscribeUserRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;

class UnsubscribeUserController extends Controller
{
    public function __invoke(UnsubscribeUserRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->newsletter_users()->where('id', $data['id'])->delete();

        return ApiResponse::created(['message' => 'User unsubscribed successfully']);
    }
}

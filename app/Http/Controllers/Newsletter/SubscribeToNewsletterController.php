<?php

namespace App\Http\Controllers\Newsletter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Newsletter\SubscribeToNewsletterRequest;
use App\Models\NewsletterUser;
use App\Models\Restaurant;


class SubscribeToNewsletterController extends Controller
{
    public function __invoke(SubscribeToNewsletterRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        NewsletterUser::create([
            "email" => $data["email"],
            "restaurant_id" => $restaurant->id
        ]);
    }
}

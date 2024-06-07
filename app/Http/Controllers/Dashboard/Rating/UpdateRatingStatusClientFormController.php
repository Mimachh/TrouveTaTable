<?php

namespace App\Http\Controllers\Dashboard\Rating;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Rating\UpdateRatingStatusClientRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;

class UpdateRatingStatusClientFormController extends Controller
{

    public function __invoke(UpdateRatingStatusClientRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);
        return ApiResponse::created(["message" => "Rating have been enable successfully"]);
    }
}

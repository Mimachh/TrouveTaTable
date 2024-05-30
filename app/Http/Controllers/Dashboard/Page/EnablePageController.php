<?php

namespace App\Http\Controllers\Dashboard\Page;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Page\EnablePageRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;

class EnablePageController extends Controller
{
    public function __invoke(EnablePageRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);
        return ApiResponse::created(["message" => "Restaurant page has been enabled successfully"]);
    }
}

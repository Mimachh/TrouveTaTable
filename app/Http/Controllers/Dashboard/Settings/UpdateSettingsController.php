<?php

namespace App\Http\Controllers\Dashboard\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Settings\UpdateSettingsRequest;
use App\Models\Restaurant;

class UpdateSettingsController extends Controller
{
    public function __invoke(UpdateSettingsRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);
    }
}

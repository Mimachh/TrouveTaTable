<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\CreateRestaurantRequest;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CreateRestaurantController extends Controller
{


    public function store(CreateRestaurantRequest $request) {
        $data = $request->validated();

        $data['owner_id'] = auth()->id();
        $restaurant = Restaurant::create($data);

        return Redirect::route('dashboard', ['restaurant' => $restaurant->id])->with('message', 'Nouveau restaurant créé avec succès !');
    }
}

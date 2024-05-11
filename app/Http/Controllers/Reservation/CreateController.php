<?php

namespace App\Http\Controllers\Reservation;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Day;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id)
    {
        //    $now = microtime(true) * 1000;
        $before_today = strtotime("yesterday") * 1000 - 1;

        

        try {

            // return new RestaurantResource($restaurant);
            $restaurant = Restaurant::findOrFail($id);

            $services = $restaurant->services;


            // $joursDouverture = [];
            // foreach ($services as $service) {
            //     $jour = $service->day->name;
            //     if (!in_array($jour, $joursDouverture)) {
            //         $joursDouverture[] = $jour;
            //     }
            // }

            $joursDouvertureIds = $services->pluck('day_id')->toArray();
            $disabledDays = Day::whereNotIn('id', $joursDouvertureIds)->pluck('id')->toArray();
            

            // dd($disabledDays);

            // $restaurant = Restaurant::with('days.services')->findOrFail($id);

            
            return inertia("Reservation/Form/Index", [
                'restaurant' => $restaurant,
                'before_today' => $before_today,
                'disabledDays' => $disabledDays,
                'id' => $id
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('Error404');
        }
    }
}

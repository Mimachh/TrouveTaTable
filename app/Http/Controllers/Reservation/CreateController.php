<?php

namespace App\Http\Controllers\Reservation;

use App\Actions\Restaurant\RedirectIfCanNotAcceptReservation;
use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Day;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class CreateController extends Controller
{
    public $restaurantRepository;
    public function __construct(RestaurantRepository $restaurantRepository)
    {
        $this->restaurantRepository = $restaurantRepository;
    }

    public function __invoke($id)
    {
        //    $now = microtime(true) * 1000;
        $before_today = strtotime('today midnight') - 1; // La fin du jour d'hier en secondes
        $before_today = $before_today * 1000;

        try {

            // return new RestaurantResource($restaurant);
            $restaurant = Restaurant::findOrFail($id);

            if (!$this->restaurantRepository->isRestaurantCanAcceptReservation($restaurant)) {
                return (new RedirectIfCanNotAcceptReservation())->action($restaurant);
            }
            // scopeReservationOpen
            // dd($restaurant);
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


            return inertia("Public/Reservation/Form/Index", [
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

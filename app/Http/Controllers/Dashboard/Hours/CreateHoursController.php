<?php

namespace App\Http\Controllers\Dashboard\Hours;


use App\Http\Controllers\Controller;
use App\Http\Requests\Hours\StoreHoursRequest;
use App\Http\Requests\Hours\StoreTamponDurationRequest;
use App\Models\Day;
use App\Models\Restaurant;
use App\Repositories\ServiceRepository;


class CreateHoursController extends Controller
{


    private $serviceRepository;

    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    public function getHoursByDayId(Restaurant $restaurant, Day $day)
    {
        $services = $restaurant->services()->where('day_id', $day->id)->get();
        return response()->json($services);
    }

    public function store(StoreHoursRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();

        // if(!auth()->user()->can('deleteRestaurantService', $restaurant)) {
        //     return Redirect::route('dashboard.hours.index', ["restaurant" => $restaurant->id])->with('error', 'Pas le droit');
        // }  
        $this->serviceRepository->updateManyServices($data['services'], $restaurant, $data['day_id']);
    }

    public function storeTamponDuration(StoreTamponDurationRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $restaurant->update($data);

        return response()->json([$restaurant]);
    }
}

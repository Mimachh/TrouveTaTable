<?php

declare(stric_types=1);

namespace App\Actions\Hours;

use App\Http\Resources\DayResource;
use App\Models\Day;
use Illuminate\Database\Eloquent\Collection;

class GetHoursOfRestaurant
{

    /**
     * @param Collection|App\Models\Service[] $services
     */
    public function planning(Collection $services)
    {
        $days = DayResource::collection(Day::all());

        $hours = [];

        // Loop through each day
        foreach ($days as $day) {
            $dayServices = $services->where('day_id', $day->id);
        
            // Vérifie s'il y a des services pour ce jour
            if ($dayServices->isNotEmpty()) {
                $formattedHours = [];
        
                foreach ($dayServices as $service) {
                    $formattedHours[] = [
                        'start_time' => $service->start_time,
                        'end_time' => $service->end_time
                    ];
                }
        
                // Attribue les heures formatées pour ce jour
                $hours[$day->name] = [
                    'day_id' => $day->id,
                    'day_name' => $day->name,
                    'services' => $formattedHours
                ];
            } else {
                // Si aucun service n'existe pour le jour actuel, définissez les heures d'ouverture et de fermeture sur null
                $hours[$day->name] = [
                    'day_id' => $day->id,
                    'day_name' => $day->name,
                    'services' => []
                ];
            }
        }
        

        return $hours;
    }
}

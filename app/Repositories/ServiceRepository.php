<?php

namespace App\Repositories;

use App\Models\Restaurant;
use App\Models\Service;
use Illuminate\Database\Eloquent\Collection;

class ServiceRepository
{
    public function getRestaurantServicesForADay(Restaurant $restaurant, int $day)
    {
        return Service::where('restaurant_id', $restaurant->id)
            ->where('day_id', $day)
            ->get();
    }

    public function deleteUselessServicesBeforeUpdate(Collection $existingServices, array $newServices) {
        foreach ($existingServices as $existingService) {
            // if(!auth()->user()->can('delete', $existingService)) {
            //     return;
            // }
            
            $found = false;
            foreach ($newServices as $serviceData) {
                if ($existingService->id == $serviceData['id']) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $existingService->delete();
            }
        }
    }

    public function updateManyServices(array $newServices, Restaurant $restaurant, int $day) {
        
        $oldServices = $this->getRestaurantServicesForADay($restaurant, $day);
        
        $this->deleteUselessServicesBeforeUpdate($oldServices, $newServices);

        foreach ($newServices as $serviceData) {
            Service::updateOrCreate(
                ['id' => $serviceData['id'] ?? null],
                [
                    'name' => $serviceData['name'],
                    'start_time' => $serviceData['start_time'],
                    'end_time' => $serviceData['end_time'],
                    'restaurant_id' => $restaurant->id,
                    'day_id' => $day,
                ]
            );
        }
    }


}

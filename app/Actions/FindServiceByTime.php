<?php

declare(strict_types=1);

namespace App\Actions;

class FindServiceByTime
{

    public function handle($services, $time)
    {
        $matchingService = null;
        
        foreach ($services as $service) {
            $startTime = strtotime($service->start_time);
            $endTime = strtotime($service->end_time);

            if ($time >= $startTime && $time <= $endTime) {
                // Si le temps est dans la plage horaire du service, stocker ce service
                $matchingService = $service;
                break; // Sortir de la boucle car nous avons trouvé le service correspondant
            }
        }


        return $matchingService;
    }
}

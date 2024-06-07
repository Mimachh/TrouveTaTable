<?php

namespace App\Repositories;

use App\Models\Media;
use App\Models\Restaurant;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class RestaurantRepository
{
    public function getAllMyRestaurants()
    {
        return Restaurant::where('owner_id', auth()->id())->get();
    }

    public function getServicesFromTheSelectedDate(Restaurant $restaurant, $date) {
        $date = Carbon::parse($date);
        $date->setLocale('fr');
        $dayOfWeekIndex = $date->dayOfWeek;
        return $restaurant->services->where('day_id', $dayOfWeekIndex);
    }

    public function isRestaurantCanAcceptReservation(Restaurant $restaurant) {

        // here i will add when no subscriptions
        $isMissingInfo = $this->isRestaurantMissingInformation($restaurant);
        return $restaurant->accept_reservations && $restaurant->active && !$isMissingInfo;       
    }

    public function isRestaurantCanEnablePage(Restaurant $restaurant) {
        return $restaurant->enable_page && $restaurant->active;
    }

    public function uploadFile($file, $restaurant, $type) {
        if($file) {
            if($restaurant[$type]) {
                Storage::disk('public')->delete($this->reformatFileURL($restaurant[$type]));
            }
            $path = $file->store('restaurant-' . $restaurant->id . '/' . $type, 'public');
            $url = Storage::disk('public')->url($path);
            $restaurant->update([$type => $url]);
        } 
    }

    public function uploadMedia($data, Restaurant $restaurant) {
        $files = $data['attachments'] ?? [];
        
        if (count($files) > 5) {
            $files = array_slice($files, 0, 5);
        }

        foreach($files as $file) {
            
            $path = $file->store('restaurant-' . $restaurant->id . '/' . 'media', 'public');

            $url = Storage::disk('public')->url($path);
            Media::create([
                'imageable_type' => 'App\Models\Restaurant',
                'imageable_uuid_id' => $restaurant->id,
                'name' => $file->getClientOriginalName(),
                'path' => $url,
                'mime' => $file->getMimeType(),
                'size' => $file->getSize(),
                'created_by' => auth()->id(),
            ]);
        }
    }

    public function deleteMedia($data) {
        $mediaId = $data['id'] ?? null;
       
        if($mediaId) {
            $media = Media::find($mediaId);
    
            if($media) {
                // Transformer l'URL complète en chemin relatif
                $relativePath = $this->reformatFileURL($media->path);
                Storage::disk('public')->delete($relativePath);
                $media->delete();
            }
        }
    }

    public function isRestaurantMissingInformation(Restaurant $restaurant): bool
    {
        return !$restaurant->name || !$restaurant->phone || !$restaurant->email || !$restaurant->address || !$restaurant->city || !$restaurant->zip;
    }

    public function isRestaurantAcceptMessage(Restaurant $restaurant): bool
    {
        return $restaurant->accept_messages && $restaurant->active;
    }
    
    public static function reformatFileURL(string $url) {
        $url = str_replace(url('/'), '', $url);
        $url = str_replace('/storage', '', $url);
        return $url;
    }

}
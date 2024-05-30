<?php

namespace App\Repositories;

use App\Models\NoteRestaurant;
use App\Models\RatingRestaurant;
use App\Models\Restaurant;

class RatingRepository
{

    public function averageRating($notes)
    {
        $ratings = $notes;
        $totalScore = 0;
        $totalNotes = 0;

        foreach ($ratings as $rating) {
            foreach ($rating->notes as $note) {
                $totalScore += $note->note;
                $totalNotes++;
            }
        }
        return $totalNotes ? $totalScore / $totalNotes : 0;
    }

    public function getItemRatings($notes)
    {
        $itemRatings = [];
        foreach ($notes as $rating) {
            foreach ($rating->notes as $note) {
                $itemName = $note->ratingRestaurantItem->name;
                if (!isset($itemRatings[$itemName])) {
                    $itemRatings[$itemName] = [
                        'totalScore' => 0,
                        'totalNotes' => 0,
                        'average' => 0
                    ];
                }
                $itemRatings[$itemName]['totalScore'] += $note->note;
                $itemRatings[$itemName]['totalNotes']++;
                $itemRatings[$itemName]['average'] = $itemRatings[$itemName]['totalScore'] / $itemRatings[$itemName]['totalNotes'];
            }
        }

        return $itemRatings;
    }

    public function getAverageForOneRating($noteRestaurant)  
    {
        $totalScore = $noteRestaurant->sum('note');
        $totalNotes = $noteRestaurant->count();

        return $totalNotes ? round($totalScore / $totalNotes, 1) : 0;
    }

    public function getLastAvisForARestaurant(Restaurant $restaurant) {
        return RatingRestaurant::where('restaurant_id', $restaurant->id)->paginate(5);
    }

}
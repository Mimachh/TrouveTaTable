<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteRestaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'rating_restaurant_id',
        'rating_restaurant_item_id',
        'note'
    ];

    public function ratingRestaurant()
    {
        return $this->belongsTo(RatingRestaurant::class);
    }

    public function ratingRestaurantItem()
    {
        return $this->belongsTo(RatingRestaurantItem::class);
    }
}

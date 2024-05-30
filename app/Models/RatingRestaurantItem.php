<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingRestaurantItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    // public function ratingRestaurant()
    // {
    //     return $this->belongsTo(RatingRestaurant::class);
    // }

    // public function notes() 
    // {
    //     return $this->hasMany(NoteRestaurant::class);
    // }
}

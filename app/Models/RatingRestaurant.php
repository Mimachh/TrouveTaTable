<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingRestaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'restaurant_id',
        'reservation_id',
        'comment'
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function notes() {
        return $this->hasMany(NoteRestaurant::class);
    }
}

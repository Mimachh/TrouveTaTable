<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingToken extends Model
{
    use HasFactory;

    protected $dates = ['expires_at'];
    protected $fillable = [
        'email',
        'token',
        'expires_at',
        'restaurant_id',
        'reservation_id'
    ];
}

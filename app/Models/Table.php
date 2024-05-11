<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'seats',
        'service_id',
    ];



    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}

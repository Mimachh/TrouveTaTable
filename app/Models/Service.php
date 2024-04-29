<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_time',
        'end_time',
        'restaurant_id',
        'day_id',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function day()
    {
        return $this->belongsTo(Day::class);
    }

    public function tables()
    {
        return $this->hasMany(Table::class);
    }

}

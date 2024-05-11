<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'reservation_date',
        'time',
        'table_id',
        'guests',
        'service_id',
        'status'
    ];

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}

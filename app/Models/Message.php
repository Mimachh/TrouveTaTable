<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'content',
        'email',
        'last_name',
        'first_name',
        'phone',
        'restaurant_id',
        "is_read"
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}

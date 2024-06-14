<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'content',
        'email',
        'last_name',
        'first_name',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Restaurant extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) Str::uuid();
        });
    }


    protected $fillable = [
        'name',
        'description',
        'address',
        'city',
        'zip',
        'phone',
        'email',
        'website',
        'logo',
        'cover',
        'hours',
        'active',
    ];

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}

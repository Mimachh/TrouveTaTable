<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
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
        'user_id',
        'time_before_service',
        'time_after_service',
    ];

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservations()
    {
        return $this->hasManyThrough(Reservation::class, Table::class);
    }

    public function scopeActive(Builder $query)
    {
        $query->where('active', 1);
    }
}

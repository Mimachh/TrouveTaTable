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
        'owner_id',
        'time_before_service',
        'time_after_service',
        'time_to_stop_reservation'
    ];

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function servicesWithOptions()
    {
        return $this->hasMany(Service::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    // public function working_users() {
    //     return $this->belongsToMany(User::class, 'restaurant_user');
    // }

    public function reservations()
    {
        return $this->hasManyThrough(Reservation::class, Table::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function scopeActive(Builder $query)
    {
        $query->where('active', 1);
    }
}

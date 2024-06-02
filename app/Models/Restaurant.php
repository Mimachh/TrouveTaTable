<?php

namespace App\Models;

use App\Concerns\HasSlug;
use App\Contracts\Sluggable;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Restaurant extends Model implements Sluggable
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    use HasSlug;
    public function slugAttribute(): string
    {
        return 'name';
    }

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
        'slug',
        'zip',
        'phone',
        'email',
        'website',
        'logo',
        'cover',
        'active',
        'owner_id',
        'time_before_service',
        'time_after_service',
        'time_to_stop_reservation',
        "accept_reservations",
        "accept_messages",
        "enable_page",
        "banner",
        "avatar"
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

    public function medias()
    {
        return $this->morphMany(Media::class, 'imageable', 'imageable_type', 'imageable_uuid_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function newsletter_users()
    {
        return $this->hasMany(NewsletterUser::class);
    }


    public function notes()
    {
        return $this->hasMany(RatingRestaurant::class);
    }

    public function validNotes()
    {
        return $this->hasMany(RatingRestaurant::class)->where('isValid', true);
    }

    public function scopeActive(Builder $query)
    {
        $query->where('active', 1);
    }

    public function scopeReservationOpen(Builder $query)
    {
        $query->where('accept_reservations', 1);
    }
}

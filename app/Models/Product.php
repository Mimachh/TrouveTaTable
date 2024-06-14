<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
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
        'order',
        'price',
        'stripe_product_id',
        'basic_daily_email_limit_devis'
    ];

    protected $casts = [
        'stripe_product_id' => 'array',
    ];



    public function getFormattedPrices(): array
    {
        $prices = json_decode($this->price, true);

        return [
            'monthly' => $prices['monthly'] / 100, // Prix mensuel en euros
            'annually' => $prices['annually'] / 100, // Prix annuel en euros
        ];
    }
}

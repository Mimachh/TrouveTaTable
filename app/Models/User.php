<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Observers\UserObserver;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

#[ObservedBy(UserObserver::class)]


/**
 * @method bool isAdmin()
 * @method bool isSub()
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\Auth\QueuedVerifyEmail);
    }
    
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function isSub($userPassed): bool
    {
        $sub = null;
        if($userPassed) {
            $sub = User::where('id', $userPassed->id)->with('subscriptions')->first();
        } else {
            $user = auth()->user();
            $sub = User::where('id', $user->id)->with('subscriptions')->first();
        }
      

        return $sub->subscriptions->count() > 0;
    }

    public function isRole(string $role_slug): bool
    {
        return $this->roles()->where('slug', $role_slug)->exists();
    }

    public function isAdmin(): bool
    {
        return $this->roles()->where('slug', 'admin')->exists();
    }

    public function getSubscriptionData(): array
    {
        $products = Product::all();
        $subscriptions = [];

        foreach ($this->subscriptions as $subscription) {
            $product = $products->first(function ($product) use ($subscription) {
                if ($product->stripe_product_id) {
                    return $product->stripe_product_id['monthly'] == $subscription->stripe_price
                        || $product->stripe_product_id['annually'] == $subscription->stripe_price;
                }
                return false;
            });

            if ($product) {
                $recurrence = $product->stripe_product_id['monthly'] == $subscription->stripe_price ? 'monthly' : 'annually';
                $price = json_decode($product->price, true);
                $subscriptionData = [
                    'id' => $subscription->id,
                    'name' => $product->name,
                    'recurrence' => $recurrence,
                    'price' => $price[$recurrence],
                    'price_id' => $subscription->stripe_price,
                    'isOnGracePeriod' => $subscription->onGracePeriod(),
                    'ends_at' => $subscription->ends_at,
                ];

                $subscriptions[] = $subscriptionData;
            }
        }

        return $subscriptions;
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    public function restaurants()
    {
        return $this->hasMany(Restaurant::class, 'owner_id');
    }

    // public function working_restaurants()
    // {
    //     return $this->belongsToMany(Restaurant::class, 'restaurant_user');
    // }
}

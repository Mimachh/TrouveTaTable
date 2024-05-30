<?php

declare(strict_types=1);

use App\Models\EntrepriseStatus;
use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\post;

it('can generate a slug', function () {
    $this->withoutExceptionHandling();
    $user = User::factory()->create();

    $response = actingAs($user)
        ->post(route('restaurant.store'), [
            'name' => 'Restaurant test',
            'description' => 'Description test',
            'address' => 'Address test',
            'phone' => '0666666666',
            'email' => 'mimach.dev@gmail.com'
        ]);
 

        assertDatabaseCount('restaurants', 1);

        $restaurant = Restaurant::first();
        expect($restaurant->slug)->toBe('restaurant-test');
    
});

it('can generate a slug that already exists', function () {
    $this->withoutExceptionHandling();
    $user = User::factory()->create();

    Restaurant::factory()->create([
        'name' => 'Restaurant test',
        'description' => 'Description test',
        'address' => 'Address test',
        'phone' => '0666666666',
        'email' => 'mimach.dev@gmail.com'
    ]);
    
    Restaurant::factory()->create([
        'name' => 'Restaurant test',
        'description' => 'Description test',
        'address' => 'Address test',
        'phone' => '0666666666',
        'email' => 'mimach.dev@gmail.com'
    ]);
   
    $r = actingAs($user)
        ->post(route('restaurant.store'), [
            'name' => 'Restaurant test',
            'description' => 'Description test',
            'address' => 'Address test',
            'phone' => '0666666666',
            'email' => 'mimach.dev@gmail.com'
        ]);

        assertDatabaseCount('restaurants', 3);

        $restaurant = Restaurant::skip(2)->first();
      
        
        expect($restaurant->slug)->toBe('restaurant-test-2');
    
});
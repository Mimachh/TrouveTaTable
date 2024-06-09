<?php
declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

it('can not enable a restaurant rating if not auth', function () {
    $restaurant = Restaurant::factory()->create([
        'accept_rating' => false
    ]);
    $response = put(route('dashboard.ratings.status', ['restaurant' => $restaurant->id]), [
        'accept_rating' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'accept_rating' => false,
    ]);
    $response->assertRedirect('/login');

});

it('can not enable a restaurant rating if restaurant not his and no have restaurant', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'accept_rating' => false
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.ratings.status', ['restaurant' => $restaurant->id]), [
        'accept_rating' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'accept_rating' => false,
    ]);
    $response->assertRedirect(route('restaurant.create'));
});

it('can not enable a restaurant rating if auth and restaurant not his', function () { 
    $restaurant = Restaurant::factory()->create([
        'accept_rating' => false
    ]);
 
    $user = User::factory()->create();
    $restaurantHis = Restaurant::factory()->create([
        'accept_rating' => false,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->put(route('dashboard.ratings.status', ['restaurant' => $restaurant->id]), [
        'accept_rating' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'accept_rating' => false,
    ]);
    $response->assertStatus(403);
});

it('can enable a restaurant rating if auth and restaurant is his', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'accept_rating' => false,
        'owner_id' => $user->id
    ]);
 
    $response = $this->actingAs($user)->put(route('dashboard.ratings.status', ['restaurant' => $restaurant->id]), [
        'accept_rating' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'accept_rating' => true,
    ]);
    $response->assertStatus(201);
});
<?php
declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

it('can not enable a restaurant page if not auth', function () {
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false
    ]);
    $response = put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'enable_page' => false,
    ]);
    $response->assertRedirect('/login');

});

it('can not enable a restaurant page if restaurant not his and no have restaurant', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'enable_page' => false,
    ]);
    $response->assertRedirect(route('restaurant.create'));
});

it('can not enable a restaurant page if auth and restaurant not his', function () { 
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false
    ]);
 
    $user = User::factory()->create();
    $restaurantHis = Restaurant::factory()->create([
        'enable_page' => false,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'enable_page' => false,
    ]);
    $response->assertStatus(403);
});

it('can enable a restaurant page if auth and restaurant is his', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false,
        'owner_id' => $user->id
    ]);
 
    $response = $this->actingAs($user)->put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'enable_page' => true,
    ]);
    $response->assertStatus(201);
});
<?php
declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

it('can not enable messages if not auth', function () {
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);
    $response = put(route('dashboard.messages.status', ['restaurant' => $restaurant->id]), [
        'accept_messages' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'accept_messages' => false,
    ]);
    $response->assertRedirect('/login');

});

it('can not enable a messages if restaurant not his and no have restaurant', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.messages.status', ['restaurant' => $restaurant->id]), [
        'accept_messages' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'accept_messages' => false,
    ]);
    $response->assertRedirect(route('restaurant.create'));
});

it('can not enable messages if auth and restaurant not his', function () { 
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);
 
    $user = User::factory()->create();
    $restaurantHis = Restaurant::factory()->create([
        'accept_messages' => false,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'accept_messages' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'accept_messages' => false,
    ]);
    $response->assertStatus(403);
});

it('can enable messages if auth and restaurant is his', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false,
        'owner_id' => $user->id
    ]);
 
    $response = $this->actingAs($user)->put(route('dashboard.messages.status', ['restaurant' => $restaurant->id]), [
        'accept_messages' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'accept_messages' => true,
    ]);
    $response->assertStatus(201);
});
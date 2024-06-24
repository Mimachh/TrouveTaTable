<?php 

declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

it('can not add end reservation if not auth', function () {
    $restaurant = Restaurant::factory()->create();
    $response = put(route('dashboard.hours.store.end.reservation', ['restaurant' => $restaurant->id]), [
        'time_to_stop_reservation' => '00:10:00',
    ]);
    $response->assertRedirect(route('login'));
});

it('can not add end reservation if no restaurant', function () {
    $restaurant = Restaurant::factory()->create();
    $user = User::factory()->create();

    $response = $this->actingAs($user)->put(route('dashboard.hours.store.end.reservation', ['restaurant' => $restaurant->id]), [
        'time_to_stop_reservation' => '00:10:00',
    ]);
    $response->assertRedirect(route('restaurant.create'));
});

it('can not add end reservation if not his restaurant', function () {
    $restaurant = Restaurant::factory()->create([
        'time_to_stop_reservation' => null,
    ]);
    $user = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        "owner_id" => $user->id,
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.hours.store.end.reservation', ['restaurant' => $restaurant->id]), [
        'time_to_stop_reservation' => '00:10:00',
    ]);

    $response->assertStatus(403);
    assertDatabaseHas('restaurants', [
        'id' => $restaurant->id,
        'time_to_stop_reservation' => null,
    ]);
});

it('can add end hours if owner', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'time_to_stop_reservation' => null,
        "owner_id" => $user->id,
    ]);
  

    $response = $this->actingAs($user)->put(route('dashboard.hours.store.end.reservation', ['restaurant' => $restaurant->id]), [
        'time_to_stop_reservation' => '00:10:00',
    ]);

    $response->assertStatus(201);
    assertDatabaseHas('restaurants', [
        'id' => $restaurant->id,
        'time_to_stop_reservation' => '00:10:00',
    ]);
});
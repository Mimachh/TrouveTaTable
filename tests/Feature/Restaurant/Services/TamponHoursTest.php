<?php 

declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

// 'time_before_service' => 'nullable|date_format:H:i:s',
// 'time_after_service' => 'nullable|date_format:H:i:s',

it('can not add tampon hours if not auth', function () {
    $restaurant = Restaurant::factory()->create();


    $response = put(route('dashboard.hours.store.tampon.duration', ['restaurant' => $restaurant->id]), [
        'time_before_service' => '00:10:00',
        'time_after_service' => '00:10:00',
    ]);

    $response->assertRedirect(route('login'));
});

it('can not add tampon hours if no restaurant', function () {
    $restaurant = Restaurant::factory()->create();
    $user = User::factory()->create();

    $response = $this->actingAs($user)->put(route('dashboard.hours.store.tampon.duration', ['restaurant' => $restaurant->id]), [
        'time_before_service' => '00:10:00',
        'time_after_service' => '00:10:00',
    ]);

    $response->assertRedirect(route('restaurant.create'));
});

it('can not add tampon hours if not his restaurant', function () {
    $restaurant = Restaurant::factory()->create([
        'time_before_service' => null,
        'time_after_service' => null,
    ]);
    $user = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        "owner_id" => $user->id,
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.hours.store.tampon.duration', ['restaurant' => $restaurant->id]), [
        'time_before_service' => '00:10:00',
        'time_after_service' => '00:10:00',
    ]);

    $response->assertStatus(403);
    assertDatabaseHas('restaurants', [
        'id' => $restaurant->id,
        'time_before_service' => null,
        'time_after_service' => null,
    ]);
});

it('can add tampon hours if owner', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'time_before_service' => null,
        'time_after_service' => null,
        "owner_id" => $user->id,
    ]);
  

    $response = $this->actingAs($user)->put(route('dashboard.hours.store.tampon.duration', ['restaurant' => $restaurant->id]), [
        'time_before_service' => '00:10:00',
        'time_after_service' => '00:10:00',
    ]);

    $response->assertStatus(201);
    assertDatabaseHas('restaurants', [
        'id' => $restaurant->id,
        'time_before_service' => '00:10:00',
        'time_after_service' => '00:10:00',
    ]);
});
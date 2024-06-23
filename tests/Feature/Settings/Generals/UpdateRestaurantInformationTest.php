<?php 

declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;

use function Pest\Laravel\put;


it('can not update restaurant informations if not auth', function () {
    $restaurant = Restaurant::factory()->create([
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
    ]);

    $response = put(route('dashboard.settings.update', ['restaurant' => $restaurant->id]), [
        "name" => "New Name",
        "phone" => "New Phone",
        "email" => "New Email",
        "address" => "New Address",
        "city" => "New City",
        "zip" => "New Zip",
    ])->assertRedirect(route('login'));

    $this->assertDatabaseHas('restaurants', [
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
    ]);
});

it('can not update restaurant informations if auth and no have restaurant', function () {
    $user = User::factory()->create();

    $restaurant = Restaurant::factory()->create([
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
    ]);

    $response = $this->actingAs($user)->put(route('dashboard.settings.update', ['restaurant' => $restaurant->id]), [
        "name" => "New Name",
        "phone" => "New Phone",
        "email" => "New Email",
        "address" => "New Address",
        "city" => "New City",
        "zip" => "New Zip",
    ])->assertRedirect(route('restaurant.create'));

    $this->assertDatabaseHas('restaurants', [
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
    ]);
    
});

it('can not update restaurant informations if auth and not his restaurant', function () {
    $restaurant = Restaurant::factory()->create([
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
    ]);

    $user = User::factory()->create([
        "email" => "mimach.dev@gmail.com"
    ]);
    $restaurant2 = Restaurant::factory()->create([
        'name' => 'Old Name 2',
        'phone' => 'Old Phone 2',
        'email' => 'Old Email 2',
        'address' => 'Old Address 2',
        'city' => 'Old City 2',
        'zip' => 'Old Zip 2',
        "owner_id" => $user->id
    ]);


    $response = $this->actingAs($user)->put(route('dashboard.settings.update', ['restaurant' => $restaurant->id]), [
        "name" => "New Name",
        "phone" => "New Phone",
        "email" => "New Email",
        "address" => "New Address",
        "city" => "New City",
        "zip" => "New Zip",
    ])->assertStatus(403);
    $this->assertDatabaseHas('restaurants', [
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
    ]);
});

it('can not update restaurant informations if it is his but wrong field', function () {
    $user = User::factory()->create();
    $MyRestaurant = Restaurant::factory()->create([
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
        "owner_id" => $user->id
    ]);


    $response = $this->actingAs($user)->put(route('dashboard.settings.update', ['restaurant' => $MyRestaurant->id]), [
        "name" => "New Name",
        "phone" => "New Phone",
        "email" => "New Email",
        "address" => "New Address",
        "city" => "New City",
        "zip" => "New Zip",
    ])->assertSessionHasErrors("email");
    $this->assertDatabaseHas('restaurants', [
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
    ]);
});

it('can not update restaurant informations if it is his but missing field', function () {
    $user = User::factory()->create();
    $MyRestaurant = Restaurant::factory()->create([
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
        "owner_id" => $user->id
    ]);


    $response = $this->actingAs($user)->put(route('dashboard.settings.update', ['restaurant' => $MyRestaurant->id]), [
        "name" => "New Name",
        "phone" => "New Phone",
        "address" => "New Address",
        "city" => "New City",
    ])->assertSessionHasErrors(["email", "zip"]);

    $this->assertDatabaseHas('restaurants', [
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
    ]);
});

it('can update restaurant informations if auth and his restaurant', function () {
    $user = User::factory()->create();
    $MyRestaurant = Restaurant::factory()->create([
        'name' => 'Old Name',
        'phone' => 'Old Phone',
        'email' => 'Old Email',
        'address' => 'Old Address',
        'city' => 'Old City',
        'zip' => 'Old Zip',
        "owner_id" => $user->id
    ]);


    $response = $this->actingAs($user)->put(route('dashboard.settings.update', ['restaurant' => $MyRestaurant->id]), [
        "name" => "New Name",
        "phone" => "New Phone",
        "email" => "karl.mullr@gmail.com",
        "address" => "New Address",
        "city" => "New City",
        "zip" => "New Zip",
    ])->assertSessionHasNoErrors();
    
    $this->assertDatabaseHas('restaurants', [
        "name" => "New Name",
        "phone" => "New Phone",
        "email" => "karl.mullr@gmail.com",
        "address" => "New Address",
        "city" => "New City",
        "zip" => "New Zip",
    ]);
});
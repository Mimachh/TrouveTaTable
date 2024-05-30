<?php
declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\Role;
use App\Models\User;


use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;

it('can not create a restaurant if not auth', function () {
    $response = post(route('restaurant.store', [
        'name' => 'Restaurant test',
    ]));

    assertDatabaseCount('restaurants', 0);
});

it('can create a restaurant if auth', function () {
    // Role::factory(3)->sequence(
    //     [
    //         'name' => 'Admin',
    //         'slug' => 'admin'
    //     ],
    //     [
    //         'name' => 'Super Admin',
    //         'slug' => 'super_admin'
    //     ],
    //     [
    //         'name' => 'Customer',
    //         'slug' => 'customer'
    //     ],
    //     [
    //         'name' => 'User',
    //         'slug' => 'user'
    //     ]
    // )->create();
 
    $user = User::factory()->create();

    // $adminRole = Role::where('slug', 'super_admin')->first();

    // if ($adminRole) {
    //     $user->roles()->attach($adminRole->id);
    // }

    // dd($user->roles);
    $response = $this->actingAs($user)->post(route('restaurant.store', [
        'name' => 'Test entreprise',
    ]));
    $restaurant = Restaurant::first();

    $response->assertRedirect('/dashboard/' . $restaurant->id);

    assertDatabaseHas('restaurants', [
        'name' => 'Test entreprise',
    ]);
    assertDatabaseCount('restaurants', 1);
})->only();
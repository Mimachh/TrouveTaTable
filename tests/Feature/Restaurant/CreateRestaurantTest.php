<?php
declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;


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
});


// liste des actions soumises au pack fondateur : 
// - enable newsletter + check before display the page in front + in the controller
// enable mailssss


// can and can't add hours
// can and can't add tables

// can and can't book for a client
// can and can't unsubscribe newsletter client

// can and can't delete his account and delete all in cascade.



// can and can't send rating
// can and can't book: all the possibilities : have table, not have, no hours, restaurant not activate etc
// can and can't subscribe newsletter

// if restaurant not subscribed can not be find on booking and page
// if restaurant not activate, page not found
// if message not activate, route message not open
// if rating not open, mail not sent
// if booking disable user can't find book page...

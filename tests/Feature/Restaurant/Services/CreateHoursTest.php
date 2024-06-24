<?php

declare(strict_types=1);

use App\Models\Day;
use App\Models\Restaurant;
use App\Models\User;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\post;

it('can not add hours if not auth', function () {

    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);

    Day::factory(7)->sequence(
        [
            'name' => 'Lundi',
        ],
        [
            'name' => 'Mardi',
        ],
        [
            'name' => 'Mercredi',
        ],
        [
            'name' => 'Jeudi',
        ],
        [
            'name' => 'Vendredi',
        ],
        [
            'name' => 'Samedi',
        ],
        [
            'name' => 'Dimanche',
        ]
    )->create();

    $response = post(route('dashboard.hours.store', ['restaurant' => $restaurant->id]), [
        'day_id' => 1,
        'services' => [
            [
                'name' => 'Service 1',
                'start_time' => '09:00:00',
                'end_time' => '11:00:00',
            ]
        ]
    ])->assertRedirect(route('login'));
    assertDatabaseCount('services', 0);
});

it('can not add hours if no restaurant', function () {

    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);

    Day::factory(7)->sequence(
        [
            'name' => 'Lundi',
        ],
        [
            'name' => 'Mardi',
        ],
        [
            'name' => 'Mercredi',
        ],
        [
            'name' => 'Jeudi',
        ],
        [
            'name' => 'Vendredi',
        ],
        [
            'name' => 'Samedi',
        ],
        [
            'name' => 'Dimanche',
        ]
    )->create();

    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('dashboard.hours.store', ['restaurant' => $restaurant->id]), [
        'day_id' => 1,
        'services' => [
            [
                'name' => 'Service 1',
                'start_time' => '09:00:00',
                'end_time' => '11:00:00',
            ]
        ]
    ])->assertRedirect(route('restaurant.create'));
    assertDatabaseCount('services', 0);
});

it('can not add hours if restaurant but not his', function () {

    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);

    Day::factory(7)->sequence(
        [
            'name' => 'Lundi',
        ],
        [
            'name' => 'Mardi',
        ],
        [
            'name' => 'Mercredi',
        ],
        [
            'name' => 'Jeudi',
        ],
        [
            'name' => 'Vendredi',
        ],
        [
            'name' => 'Samedi',
        ],
        [
            'name' => 'Dimanche',
        ]
    )->create();

    $user = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        'owner_id' => $user->id
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.hours.store', ['restaurant' => $restaurant->id]), [
        'day_id' => 1,
        'services' => [
            [
                'name' => 'Service 1',
                'start_time' => '09:00:00',
                'end_time' => '11:00:00',
            ]
        ]
    ])->assertStatus(403);
    assertDatabaseCount('services', 0);
});

it('can add hours if owner', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false,
        'owner_id' => $user->id
    ]);

    Day::factory(7)->sequence(
        [
            'name' => 'Lundi',
        ],
        [
            'name' => 'Mardi',
        ],
        [
            'name' => 'Mercredi',
        ],
        [
            'name' => 'Jeudi',
        ],
        [
            'name' => 'Vendredi',
        ],
        [
            'name' => 'Samedi',
        ],
        [
            'name' => 'Dimanche',
        ]
    )->create();

  
    $response = $this->actingAs($user)->post(route('dashboard.hours.store', ['restaurant' => $restaurant->id]), [
        'day_id' => 1,
        'services' => [
            [
                'name' => 'Service 1',
                'start_time' => '09:00:00',
                'end_time' => '11:00:00',
            ]
        ]
    ])->assertStatus(200);
    assertDatabaseCount('services', 1);
});

it('can add multiple hours if owner', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false,
        'owner_id' => $user->id
    ]);

    Day::factory(7)->sequence(
        [
            'name' => 'Lundi',
        ],
        [
            'name' => 'Mardi',
        ],
        [
            'name' => 'Mercredi',
        ],
        [
            'name' => 'Jeudi',
        ],
        [
            'name' => 'Vendredi',
        ],
        [
            'name' => 'Samedi',
        ],
        [
            'name' => 'Dimanche',
        ]
    )->create();

  
    $response = $this->actingAs($user)->post(route('dashboard.hours.store', ['restaurant' => $restaurant->id]), [
        'day_id' => 1,
        'services' => [
            [
                'name' => 'Service 1',
                'start_time' => '09:00:00',
                'end_time' => '11:00:00',
            ],
            [
                'name' => 'Service 2',
                'start_time' => '09:00:00',
                'end_time' => '11:00:00',
            ]
        ]
    ])->assertStatus(200);
    assertDatabaseCount('services', 2);
});
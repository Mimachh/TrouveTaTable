<?php

declare(strict_types=1);

use App\Models\Day;
use App\Models\Restaurant;
use App\Models\User;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;

it('can not update hours if not auth', function () {
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
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);
    $service = $restaurant->services()->create([
        "name" => "Service 1",
        'day_id' => 1,
        'start_time' => '09:00:00',
        'end_time' => '11:00:00',
        
    ]);


    $response = post(route('dashboard.hours.store', ['restaurant' => $restaurant->id]), [
        'day_id' => 1,
        'services' => [
            [
                'id' => $service->id,
                'name' => 'Service 1',
                'start_time' => '09:00:00',
                'end_time' => '11:00:00',
            ]
        ]
    ])->assertRedirect(route('login'));
    assertDatabaseCount('services', 1);
});

it('can not update hours if no restaurant', function () {

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
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);
    $service = $restaurant->services()->create([
        "name" => "Service 1",
        'day_id' => 1,
        'start_time' => '09:00:00',
        'end_time' => '11:00:00',
        
    ]);

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
    assertDatabaseCount('services', 1);
});

it('can not update hours if restaurant but not his', function () {

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
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false
    ]);
    $service = $restaurant->services()->create([
        "name" => "Service 1",
        'day_id' => 1,
        'start_time' => '09:00:00',
        'end_time' => '11:00:00',
        
    ]);

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
    assertDatabaseCount('services', 1);
});

it('can update hours if owner', function () {
    $user = User::factory()->create();
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
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false,
        'owner_id' => $user->id
    ]);
    $service = $restaurant->services()->create([
        "name" => "Service 1",
        'day_id' => 1,
        'start_time' => '09:00:00',
        'end_time' => '11:00:00',
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.hours.store', ['restaurant' => $restaurant->id]), [
        'day_id' => 1,
        'services' => [
            [
                'id' => $service->id,
                'name' => 'Services 1',
                'start_time' => '11:00:00',
                'end_time' => '14:00:00',
            ]
        ]
    ])->assertStatus(200);
    assertDatabaseCount('services', 1);
    assertDatabaseHas('services', [
        'name' => 'Services 1',
        'start_time' => '11:00:00',
        'end_time' => '14:00:00',
    ]);
});

it('can update multiple hours if owner', function () {
    $user = User::factory()->create();
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
    $restaurant = Restaurant::factory()->create([
        'accept_messages' => false,
        'owner_id' => $user->id
    ]);
    $service = $restaurant->services()->create([
        "name" => "Service 1",
        'day_id' => 1,
        'start_time' => '09:00:00',
        'end_time' => '11:00:00',
    ]);
    $service2 = $restaurant->services()->create([
        "name" => "Service 2",
        'day_id' => 1,
        'start_time' => '09:00:00',
        'end_time' => '11:00:00',
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.hours.store', ['restaurant' => $restaurant->id]), [
        'day_id' => 1,
        'services' => [
            [
                'id' => $service->id,
                'name' => 'Service 1',
                'start_time' => '11:00:00',
                'end_time' => '13:00:00',
            ],
            [
                'id' => $service2->id,
                'name' => 'Service 2',
                'start_time' => '18:00:00',
                'end_time' => '22:00:00',
            ]
        ]
    ])->assertStatus(200);
    assertDatabaseCount('services', 2);
    assertDatabaseHas('services', [
        'name' => 'Service 1',
        'start_time' => '11:00:00',
        'end_time' => '13:00:00',
    ]);
    assertDatabaseHas('services', [
        'name' => 'Service 2',
        'start_time' => '18:00:00',
        'end_time' => '22:00:00',
    ]);
});

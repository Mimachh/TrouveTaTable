<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RatingRestaurant>
 */
class RatingRestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => $this->faker->email,
            'comment' => $this->faker->sentence,
            'restaurant_id' => $this->faker->uuid,
            'reservation_id' => \App\Models\Reservation::factory(),
        ];
    }
}

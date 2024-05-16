<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'description' => $this->faker->sentence,
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'zip' => $this->faker->postcode,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'website' => $this->faker->url,
            'logo' => $this->faker->imageUrl,
            'cover' => $this->faker->imageUrl,
            'hours' => $this->faker->sentence,
            'active' => $this->faker->boolean,
            'time_before_service' => null,
            'time_after_service' => "00:30:00",
            'time_to_stop_reservation' => "00:30:00",
            // 'user_id' => \App\Models\User::factory(),
            'owner_id' => 1,
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "subject" => $this->faker->sentence,
            "content" => $this->faker->realText(200),
            "email" => $this->faker->unique()->safeEmail,
            "last_name" => $this->faker->lastName,
            "first_name" => $this->faker->firstName,
            "phone" => $this->faker->phoneNumber,
            "restaurant_id" => 1,
            "is_read" => false,
            "created_at" => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}

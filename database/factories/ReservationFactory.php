<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'reservation_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'time' => $this->faker->time(),
            'status' => 'accepté',
            'service_id' => \App\Models\Service::factory(),
            'table_id' => \App\Models\Table::factory(),
            'guests' => $this->faker->numberBetween(1, 10),
        ];
    }
}

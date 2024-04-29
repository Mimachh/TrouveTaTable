<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'start_time' => $this->faker->time(),
            'end_time' => $this->faker->time(),
            // 'restaurant_day_id' =>  \App\Models\Restaurant::factory(),
          
        ];
    }
}

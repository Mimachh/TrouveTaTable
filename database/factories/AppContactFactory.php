<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AppContact>
 */
class AppContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        return [
            'subject' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'email' => $this->faker->email,
            'last_name' => $this->faker->lastName,
            'first_name' => $this->faker->firstName,
        ];
    }
}

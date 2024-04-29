<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->name,

            "description" => json_encode([
                $this->faker->randomElement(['5 products', '10 products', '15 products']),
                'Up to ' . $this->faker->numberBetween(100, 1000) . ' subscribers',
                $this->faker->randomElement(['Basic analytics', 'Advanced analytics']),
                $this->faker->randomElement(['24-hour support response time', '48-hour support response time'])
            ]),

            "price" => json_encode([
                "monthly" => $this->faker->randomFloat(2, 1, 100),
                "annually" => $this->faker->randomFloat(2, 1, 100)
            ]),

            "stripe_product_id" => json_encode([
                "monthly" => $this->faker->randomFloat(2, 1, 100),
                "annually" => $this->faker->randomFloat(2, 1, 100)
            ]),

            "basic_daily_email_limit_devis" => $this->faker->numberBetween(1, 50)
        ];
    }
}

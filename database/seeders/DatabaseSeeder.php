<?php

namespace Database\Seeders;

use App\Models\Day;
use App\Models\Feature;
use App\Models\Message;
use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use App\Models\Role;
use App\Models\Service;
use App\Models\Table;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

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

    
        Role::factory(3)->sequence(
            [
                'name' => 'Admin',
                'slug' => 'admin'
            ],
            [
                'name' => 'Customer',
                'slug' => 'customer'
            ],
            [
                'name' => 'User',
                'slug' => 'user'
            ]
        )->create();

        $user = User::factory()->create(
            [
                'name' => 'Mimach',
                'email' => 'mimach.dev@gmail.com',
                'password' => bcrypt('password'),
            ]
        );

        $adminRole = Role::where('slug', 'admin')->first();

        if ($adminRole) {
            $user->roles()->attach($adminRole->id);
        }

        $restaurant = Restaurant::factory(1)->create()->first();
        $restaurant->services()->create([
            "name" => "Service 1",
            'day_id' => 1,
            'start_time' => '09:00:00',
            'end_time' => '11:00:00',
            
        ]);

        $restaurant->services()->create([
            "name" => "Service 2",
            'day_id' => 1,
            'start_time' => '14:00:00',
            'end_time' => '17:00:00',
        ]);
        $restaurant->services()->create([
            "name" => "Service 1",
            'day_id' => 2,
            'start_time' => '11:00:00',
            'end_time' => '13:00:00',
        ]);

        $restaurant->services()->create([
            "name" => "Service 2",
            'day_id' => 2,
            'start_time' => '18:00:00',
            'end_time' => '22:00:00',
        ]);


        Table::factory(10)->create([
            'restaurant_id' => $restaurant->id
        ]);
    
        Message::factory(50)->create([
            'restaurant_id' => $restaurant->id
        ]);
      
        Product::factory()->create([
            "name" => "Basique",
            "order" => 1,
            "price" => null,
            "description" => json_encode([
                '5 products',
                'Up to 1,000 subscribers',
                'Basic analytics',
                '48-hour support response time'
            ]),
            "stripe_product_id" => null,

            "basic_daily_email_limit_devis" => 5

        ]);
        Product::factory()->create([
            "name" => "Pro",
            "order" => 2,
            "price" => json_encode([
                "monthly" => 29.90,
                "annually" => 25.90
            ]),
            "stripe_product_id" => [
                "monthly" => config('stripe.status') === "test" ? "price_1P3Lj9E5Smsl5TIMCzfsUIXQ" : "",
                "annually" => config('stripe.status') === "test" ? "price_1P3MPvE5Smsl5TIMpVY1pCw4" : ""
            ],
            "description" => json_encode([
                '5 products',
                'Up to 1,000 subscribers',
                'Basic analytics',
                '48-hour support response time'
            ]),

            "basic_daily_email_limit_devis" => 50
        ]);
        Product::factory()->create([
            "name" => "Entreprise",
            "order" => 3,
            "price" => json_encode([
                "monthly" => -1,
                "annually" => -1
            ]),
            "stripe_product_id" => [
                "monthly" => "price_1P3Lj9E5Smsl5TIMKkg2LPX1",
                "annually" => "price_1P3MPvE5Smsl5TIMwRCNs61j"
            ],
            "description" => json_encode([
                '5 products',
                'Up to 1,000 subscribers',
                'Basic analytics',
                '48-hour support response time'
            ]),

            "basic_daily_email_limit_devis" => -1
        ]);



        Feature::create([
            'image' => "",
            'route_name' => "devis.index",
            "name" => "Devis",
            "description" => "Générez et envoyez vos devis en 1 click",
            "required_credits" => 1,
            "active" => true
        ]);

        Feature::create([
            'image' => "",
            'route_name' => "facture.index",
            "name" => "Facture",
            "description" => "Générez et envoyez vos factures en 1 click",
            "required_credits" => 1,
            "active" => true
        ]);

    }
}

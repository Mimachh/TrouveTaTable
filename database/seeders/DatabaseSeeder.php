<?php

namespace Database\Seeders;

use App\Models\AppNewsletter;
use App\Models\Day;
use App\Models\Feature;
use App\Models\Message;
use App\Models\NewsletterUser;
use App\Models\NoteRestaurant;
use App\Models\Product;
use App\Models\RatingRestaurant;
use App\Models\RatingRestaurantItem;
use App\Models\Reservation;
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

        
        $user2 = User::factory()->create(
            [
                'name' => 'Franck',
                'email' => 'franck@franck.com',
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
      
        NewsletterUser::factory(50)->create([
            'restaurant_id' => $restaurant->id
        ]);
        
        $services = Service::first();
        $tables = Table::first();
        // 'end_time' => $this->faker->time(),
        // 'restaurant_id' => \App\Models\Restaurant::factory(),
        // 'day_id' => \App\Models\Day::factory(),

        $reservation = Reservation::factory()->create([
            "service_id" => $services->id,
            "table_id" => $tables->id,
        ]);
   
        $quality = RatingRestaurantItem::factory()->create([
            "name" => "Qualité"
        ]);
        $accueil = RatingRestaurantItem::factory()->create([
            "name" => "Accueil"
        ]);
        $proprete = RatingRestaurantItem::factory()->create([
            "name" => "Propreté"
        ]);
        $cadre = RatingRestaurantItem::factory()->create([
            "name" => "Cadre et ambiance"
        ]);

        $ratingRestaurant = RatingRestaurant::factory()->create([
            "restaurant_id" => $restaurant->id,
            "reservation_id" => $reservation->id
        ]);


        $note1 = NoteRestaurant::factory()->create([
            "rating_restaurant_id" => $ratingRestaurant->id,
            "rating_restaurant_item_id" => $quality->id,
            "note" => 5
        ]);
        $note2 = NoteRestaurant::factory()->create([
            "rating_restaurant_id" => $ratingRestaurant->id,
            "rating_restaurant_item_id" => $accueil->id,
            "note" => 4
        ]);
        $note3 = NoteRestaurant::factory()->create([
            "rating_restaurant_id" => $ratingRestaurant->id,
            "rating_restaurant_item_id" => $proprete->id,
            "note" => 2
        ]);
        $note4 = NoteRestaurant::factory()->create([
            "rating_restaurant_id" => $ratingRestaurant->id,
            "rating_restaurant_item_id" => $cadre->id,
            "note" => 3
        ]);

        // Product::factory()->create([
        //     "name" => "Pack Fondateur",
        //     "order" => 1,
        //     "price" => null,
        //     "description" => json_encode([
        //         '5 products',
        //         'Up to 1,000 subscribers',
        //         'Basic analytics',
        //         '48-hour support response time'
        //     ]),
        //     "stripe_product_id" => null,

        //     "basic_daily_email_limit_devis" => 5

        // ]);
        Product::factory()->create([
            "name" => "Pack Fondateur",
            "order" => 1,
            "price" => json_encode([
                "monthly" => 2500,
                "annually" => 2000
            ]),
            "stripe_product_id" => [
                "monthly" => config('stripe.status') === "test" ? "price_1PQwQSF8f3TP4aCxMmi7q7YK" : "",
                "annually" => config('stripe.status') === "test" ? "price_1PQwQ8F8f3TP4aCx20ggpfLf" : ""
            ],
            "description" => "",
            "mostPopular" => true,
            "feature" => json_encode([
                "Page vitrine hébergée",
                "Sytème de notation vérifiée",
                "Système de réservation en ligne",
                "Email de notifications",
                "Email de rappel aux clients",
                "Formulaire de contact intégré",
                "Accès illimité à toutes les fonctionnalités actuelles et futures"
            ]),
        ]);
        // Product::factory()->create([
        //     "name" => "Entreprise",
        //     "order" => 3,
        //     "price" => json_encode([
        //         "monthly" => -1,
        //         "annually" => -1
        //     ]),
        //     "stripe_product_id" => [
        //         "monthly" => "price_1P3Lj9E5Smsl5TIMKkg2LPX1",
        //         "annually" => "price_1P3MPvE5Smsl5TIMwRCNs61j"
        //     ],
        //     "description" => json_encode([
        //         '5 products',
        //         'Up to 1,000 subscribers',
        //         'Basic analytics',
        //         '48-hour support response time'
        //     ]),

        //     "basic_daily_email_limit_devis" => -1
        // ]);


        AppNewsletter::factory(50)->create();

        
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

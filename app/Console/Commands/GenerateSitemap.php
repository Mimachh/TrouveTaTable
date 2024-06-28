<?php

namespace App\Console\Commands;

use App\Models\Restaurant;
use App\Repositories\UserRepository;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $restaurants = Restaurant::active()->get();

        // Créer une instance de Sitemap
        $sitemap = Sitemap::create();

        // Ajouter la page d'accueil
        $sitemap->add(Url::create('/')->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY));

        // // Ajouter les pages des restaurants
        foreach ($restaurants as $restaurant) {

            $owner = $restaurant->owner;
            if ((new UserRepository())->isFondator($owner->id)) {
                $slug = $restaurant->slug;
                if ($restaurant->enable_page) {
                    $sitemap->add(Url::create("/restaurant/{$slug}")
                        ->setPriority(0.9)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));
                }
                if ($restaurant->accept_messages) {
                    $sitemap->add(Url::create("/restaurant/{$slug}/contact")
                        ->setPriority(0.8)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));
                }
            }
        }

        // Écrire le sitemap dans un fichier
        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}

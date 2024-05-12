<?php

namespace App\Http\Controllers\Dashboard\Tables;

use App\Enums\TableStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\TableResource;
use App\Models\Restaurant;
use App\Models\Table;
use IFresh\EnumTranslations\EnumTranslatorFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class IndexTableController extends Controller
{
    /**
     * Handle the incoming request.
     */

    //  https://packagist.org/packages/ifresh/laravel-enum-translations
    public function __invoke(Restaurant $restaurant)
    {
        $tables = TableResource::collection(Table::where('restaurant_id', $restaurant->id)->get());
        $restaurantResource = new RestaurantResource($restaurant);
       
        $status = EnumTranslatorFacade::translate(TableStatus::class);

        return inertia('Dashboard/Tables/Index', [
            "tables" => $tables,
            "restaurant" => $restaurantResource,
            'status' => $status,
        ]);
    }
}

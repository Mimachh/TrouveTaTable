<?php

namespace App\Http\Controllers\Dashboard\Tables;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Tables\CreateTableRequest;
use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Http\Request;

class CreateTableController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateTableRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();

        Table::updateOrCreate(
            ['id' => $data['id'] ?? null],
            [
                'restaurant_id' => $restaurant->id,
                'name' => $data['name'],
                'seats' => $data['seats'],
                'status' => $data['status'],
            ]
        );

    }
}

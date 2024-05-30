<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('note_restaurants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rating_restaurant_id')->constrained('rating_restaurants')->cascadeOnDelete();
            $table->foreignId('rating_restaurant_item_id')->constrained('rating_restaurant_items')->cascadeOnDelete();
            $table->integer('note');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('note_restaurants');
    }
};

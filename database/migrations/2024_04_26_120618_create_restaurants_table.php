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
        Schema::create('restaurants', function (Blueprint $table) {
           
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('address')->nullable(); // must be required for prod
            $table->string('city')->nullable(); // must be required for prod
            $table->string('zip')->nullable(); // must be required for prod
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('email');
            $table->string('logo')->nullable();
            $table->string('cover')->nullable();
            $table->string('description')->nullable();
            $table->string('hours');
            $table->boolean('active')->default(true);

            // latitude and longitude
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};

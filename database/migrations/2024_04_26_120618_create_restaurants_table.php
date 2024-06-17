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
            $table->string('slug')->unique();
            $table->string('address')->nullable(); // must be required for prod
            $table->string('city')->nullable(); // must be required for prod
            $table->string('zip')->nullable(); // must be required for prod
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('logo')->nullable();
            $table->string('cover')->nullable();
            $table->string('description')->nullable();
            $table->boolean('active')->default(false);
           

            $table->string('banner', 1024)->nullable();
            $table->string('avatar', 1024)->nullable();

            $table->time('time_before_service')->nullable();
            $table->time('time_after_service')->nullable();

            // cut the reservation at
            $table->time('time_to_stop_reservation')->nullable();
            
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');

            
            $table->boolean('accept_reservations')->default(false);
            $table->boolean('accept_rating')->default(false);
            $table->boolean('accept_messages')->default(false);
            $table->boolean('enable_page')->default(false);


            $table->boolean('is_notify_client_after_booking')->default(true);
            $table->boolean('is_notify_restaurant_after_booking')->default(true);
            $table->boolean('is_notify_client_a_day_before_booking')->default(true);
            $table->boolean('is_notify_restaurant_after_contact_message')->default(true);
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

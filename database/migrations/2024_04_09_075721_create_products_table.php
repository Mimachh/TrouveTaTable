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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('order');
            $table->string('name');
            $table->json('description')->nullable();
            $table->json('price')->nullable();

            $table->integer('basic_daily_email_limit_devis')->nullable();
            $table->string('recurrence')->default('monthly');

            $table->json('stripe_product_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('imageable_type');
            $table->uuid('imageable_uuid_id')->nullable();
            $table->unsignedBigInteger('imageable_id_id')->nullable();
            $table->string('name', 255);
            $table->string('path', 255);
            $table->string('mime', 255);
            $table->unsignedBigInteger('size')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};

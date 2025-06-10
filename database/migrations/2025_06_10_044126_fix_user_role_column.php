<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'role_id')) {
                $table->unsignedBigInteger('role_id')->default(2);
                $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Xóa foreign key nếu tồn tại
            if (Schema::hasColumn('users', 'role_id')) {
                $table->dropForeign(['role_id']);
                $table->dropColumn('role_id');
            }

            // Khôi phục cột 'role' nếu muốn
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('user');
            }
        });
    }
};

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
{
    User::updateOrCreate(
        ['email' => 'admin@gmail.com'],
        [
    'name' => 'admin',
    'password' => Hash::make('123456'),
    'role_id' => 1, // ✅ Nếu bảng users có cột 'role_id'
]

    );
}
}

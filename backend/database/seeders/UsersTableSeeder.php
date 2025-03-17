<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Enrico Bergamo',
            'email' => 'enrico@teste.com',
            'password' => Hash::make('teste123'),
        ]);

        Task::create([
            'user_id' => $user->id,
            'title' => 'Lavar a louça',
            'description' => 'Lavar a louça acumulada na pia da cozinha',
            'completed' => false,
            'due_date' => now()->addDays(7),
        ]);

        Task::create([
            'user_id' => $user->id,
            'title' => 'Estudar React',
            'description' => 'Estudar a documentação do React e criar um projeto',
            'completed' => true,
            'due_date' => now()->addDays(3),
        ]);

        Task::create([
            'user_id' => $user->id,
            'title' => 'Fazer exercícios da faculdade',
            'description' => 'Realizar todos exercícios em aberto da faculdade',
            'completed' => false,
            'due_date' => now()->addDays(5),
        ]);
    }
}
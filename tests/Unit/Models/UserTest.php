<?php

use App\Models\User;

it('can create a user with factory', function () {
    $user = User::factory()->create([
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);

    expect($user)->toBeInstanceOf(User::class)
        ->and($user->name)->toBe('John Doe')
        ->and($user->email)->toBe('john@example.com')
        ->and($user->email_verified_at)->toBeNull();
});

it('hides sensitive attributes', function () {
    $user = User::factory()->create();
    $array = $user->toArray();

    expect($array)->not->toHaveKey('password')
        ->and($array)->not->toHaveKey('remember_token');
});

it('casts email_verified_at to datetime', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    expect($user->email_verified_at)->toBeInstanceOf(DateTime::class);
});

it('uses fillable attributes correctly', function () {
    $user = new User();

    expect($user->getFillable())->toContain('name', 'email', 'password');
});

it('has required traits', function () {
    $user = new User();

    expect(class_uses($user))->toContain(
        'Illuminate\Database\Eloquent\Factories\HasFactory',
        'Illuminate\Notifications\Notifiable',
        'Laravel\Fortify\TwoFactorAuthenticatable'
    );
});
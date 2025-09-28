<?php

use App\Models\User;

it('can show profile edit page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('profile.edit'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('settings/Profile')
            ->has('mustVerifyEmail')
            ->has('status')
        );
});

it('can update profile information', function () {
    $user = User::factory()->create([
        'name' => 'Old Name',
        'email' => 'old@example.com',
    ]);

    $response = $this->actingAs($user)->patch(route('profile.update'), [
        'name' => 'New Name',
        'email' => 'new@example.com',
    ]);

    $response->assertRedirect(route('profile.edit'));

    $user->refresh();

    expect($user->name)->toBe('New Name')
        ->and($user->email)->toBe('new@example.com')
        ->and($user->email_verified_at)->toBeNull();
});

it('resets email verification when email changes', function () {
    $user = User::factory()->create([
        'email' => 'old@example.com',
        'email_verified_at' => now(),
    ]);

    $this->actingAs($user)->patch(route('profile.update'), [
        'name' => $user->name,
        'email' => 'new@example.com',
    ]);

    $user->refresh();

    expect($user->email_verified_at)->toBeNull();
});

it('does not reset email verification when email stays same', function () {
    $verifiedAt = now();
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'email_verified_at' => $verifiedAt,
    ]);

    $this->actingAs($user)->patch(route('profile.update'), [
        'name' => 'New Name',
        'email' => 'test@example.com',
    ]);

    $user->refresh();

    expect($user->email_verified_at)->not->toBeNull();
});

it('can delete profile with correct password', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->delete(route('profile.destroy'), [
        'password' => 'password',
    ]);

    $response->assertRedirect('/');

    $this->assertDatabaseMissing('users', [
        'id' => $user->id,
    ]);

    $this->assertGuest();
});

it('cannot delete profile with incorrect password', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->delete(route('profile.destroy'), [
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors('password');

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
    ]);

    $this->assertAuthenticated();
});
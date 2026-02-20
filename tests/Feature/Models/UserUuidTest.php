<?php

use App\Models\User;
use Illuminate\Support\Str;

it('generates a uuid as primary key when creating a user', function () {
    $user = User::factory()->create();

    expect($user->id)
        ->toBeString()
        ->and(Str::isUuid($user->id))->toBeTrue();
});

it('does not use auto-incrementing ids', function () {
    $user = new User;

    expect($user->getIncrementing())->toBeFalse()
        ->and($user->getKeyType())->toBe('string');
});

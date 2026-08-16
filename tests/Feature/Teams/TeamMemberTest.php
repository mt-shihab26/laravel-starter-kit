<?php

use App\Enums\TeamRole;
use App\Models\Team;
use App\Models\User;

test('team member roles can be updated by owners', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($member, ['role' => TeamRole::Member->value]);

    $response = $this
        ->actingAs($owner)
        ->patch(route('teams.members.update', [$team, $member]), [
            'role' => TeamRole::Admin->value,
        ]);

    $response->assertRedirect(route('teams.edit', $team));

    expect($team->users()->where('user_id', $member->id)->first()->pivot->role->value)->toEqual(TeamRole::Admin->value);
});

test('team member roles can be updated by admins', function () {
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $member = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($admin, ['role' => TeamRole::Admin->value]);
    $team->users()->attach($member, ['role' => TeamRole::Member->value]);

    $response = $this
        ->actingAs($admin)
        ->patch(route('teams.members.update', [$team, $member]), [
            'role' => TeamRole::Admin->value,
        ]);

    $response->assertRedirect(route('teams.edit', $team));

    expect($team->users()->where('user_id', $member->id)->first()->pivot->role->value)->toEqual(TeamRole::Admin->value);
});

test('team member roles cannot be updated by members', function () {
    $owner = User::factory()->create();
    $actingMember = User::factory()->create();
    $member = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($actingMember, ['role' => TeamRole::Member->value]);
    $team->users()->attach($member, ['role' => TeamRole::Member->value]);

    $response = $this
        ->actingAs($actingMember)
        ->patch(route('teams.members.update', [$team, $member]), [
            'role' => TeamRole::Admin->value,
        ]);

    $response->assertForbidden();
});

test('team members can be removed by owners', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($member, ['role' => TeamRole::Member->value]);

    $response = $this
        ->actingAs($owner)
        ->delete(route('teams.members.destroy', [$team, $member]));

    $response->assertRedirect(route('teams.edit', $team));

    expect($member->fresh()->isBelongsToTeam($team))->toBeFalse();
});

test('team members can be removed by admins', function () {
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $member = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($admin, ['role' => TeamRole::Admin->value]);
    $team->users()->attach($member, ['role' => TeamRole::Member->value]);

    $response = $this
        ->actingAs($admin)
        ->delete(route('teams.members.destroy', [$team, $member]));

    $response->assertRedirect(route('teams.edit', $team));

    expect($member->fresh()->isBelongsToTeam($team))->toBeFalse();
});

test('team members cannot be removed by members', function () {
    $owner = User::factory()->create();
    $actingMember = User::factory()->create();
    $member = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($actingMember, ['role' => TeamRole::Member->value]);
    $team->users()->attach($member, ['role' => TeamRole::Member->value]);

    $response = $this
        ->actingAs($actingMember)
        ->delete(route('teams.members.destroy', [$team, $member]));

    $response->assertForbidden();
});

test('team owner cannot be removed', function () {
    $owner = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);

    $response = $this
        ->actingAs($owner)
        ->delete(route('teams.members.destroy', [$team, $owner]));

    $response->assertForbidden();

    expect($owner->fresh()->isBelongsToTeam($team))->toBeTrue();
});

test('team owner role cannot be changed', function () {
    $owner = User::factory()->create();
    $admin = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($admin, ['role' => TeamRole::Admin->value]);

    $response = $this
        ->actingAs($admin)
        ->patch(route('teams.members.update', [$team, $owner]), [
            'role' => TeamRole::Member->value,
        ]);

    $response->assertForbidden();

    expect($team->users()->where('user_id', $owner->id)->first()->pivot->role->value)->toEqual(TeamRole::Owner->value);
});

test('team member role cannot be set to owner', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $team = Team::factory()->create();

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($member, ['role' => TeamRole::Member->value]);

    $response = $this
        ->actingAs($owner)
        ->patch(route('teams.members.update', [$team, $member]), [
            'role' => TeamRole::Owner->value,
        ]);

    $response->assertSessionHasErrors('role');

    expect($team->users()->where('user_id', $member->id)->first()->pivot->role->value)->toEqual(TeamRole::Member->value);
});

test('removed member current team is set to fallback team', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $team = Team::factory()->create();
    $fallbackTeam = $member->getFallbackTeam($team);

    $team->users()->attach($owner, ['role' => TeamRole::Owner->value]);
    $team->users()->attach($member, ['role' => TeamRole::Member->value]);

    $member->update(['current_team_id' => $team->id]);

    $this
        ->actingAs($owner)
        ->delete(route('teams.members.destroy', [$team, $member]));

    expect($member->fresh()->current_team_id)->toEqual($fallbackTeam->id);
});

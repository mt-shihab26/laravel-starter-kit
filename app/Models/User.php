<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\TeamRole;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property int|null $current_team_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Team|null $currentTeam
 * @property-read Collection<int, Team> $ownedTeams
 * @property-read Collection<int, Team> $teams
 */
#[Fillable(['name', 'email', 'password', 'current_team_id'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Get all of the teams the user belongs to.
     *
     * @return BelongsToMany<Team, $this>
     */
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'team_members', 'user_id', 'team_id')
            ->using(TeamMember::class)
            ->withPivot(['role'])
            ->withTimestamps();
    }

    /**
     * Get the user's current team.
     *
     * @return BelongsTo<Team, $this>
     */
    public function currentTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'current_team_id');
    }

    /**
     * Switch to the given team.
     */
    public function switchCurrentTeam(Team $team): bool
    {
        if (! $this->isBelongsToTeam($team)) {
            return false;
        }

        $this->update(['current_team_id' => $team->id]);
        $this->setRelation('currentTeam', $team);

        return true;
    }

    /**
     * Get a fallback team for the user, optionally excluding a given team.
     */
    public function getFallbackTeam(?Team $excluding = null): ?Team
    {
        return $this->teams()
            ->when($excluding, fn ($query) => $query->where('teams.id', '!=', $excluding->id))
            ->orderByRaw('LOWER(teams.name)')
            ->first();
    }

    /**
     * Resolve the team the user should switch to if the given team is their current team.
     */
    public function getResolveFallbackTeam(Team $team): ?Team
    {
        return $this->isCurrentTeam($team) ? $this->getFallbackTeam($team) : null;
    }

    /**
     * Get the user's current team, falling back to another team if unset.
     */
    public function getCurrentTeam(): ?Team
    {
        $team = $this->currentTeam ?? $this->getFallbackTeam();

        return $team?->setRelation('pivot', $team->teamMemberFor($this));
    }

    /**
     * Determine if the given team is the user's current team.
     */
    public function isCurrentTeam(Team $team): bool
    {
        return $this->current_team_id === $team->id;
    }

    /**
     * Determine if the user is an owner or admin of the given team.
     */
    public function canManageTeam(?Team $team): bool
    {
        if (! $team) {
            return false;
        }

        $role = $team->teamMembers()
            ->where('user_id', $this->id)
            ->first()?->role;

        return in_array($role, [TeamRole::Owner, TeamRole::Admin], true);
    }

    /**
     * Determine if the user belongs to the given team.
     */
    public function isBelongsToTeam(Team $team): bool
    {
        return $this->teams()
            ->where('teams.id', $team->id)
            ->exists();
    }

    /**
     * Determine if the user is the owner of the given team.
     */
    public function isOwnsTeam(Team $team): bool
    {
        $role = $team->teamMembers()
            ->where('user_id', $this->id)
            ->first()?->role;

        return $role === TeamRole::Owner;
    }
}

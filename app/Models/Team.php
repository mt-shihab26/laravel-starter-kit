<?php

namespace App\Models;

use App\Enums\TeamRole;
use Database\Factories\TeamFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read Collection<int, TeamInvitation> $invitations
 * @property-read Collection<int, TeamMember> $teamMembers
 * @property-read Collection<int, User> $users
 */
#[Fillable(['name'])]
class Team extends Model
{
    /** @use HasFactory<TeamFactory> */
    use HasFactory, SoftDeletes;

    /**
     * Get all team members for this team.
     *
     * @return HasMany<TeamMember, $this>
     */
    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }

    /**
     * Get all users on this team.
     *
     * @return BelongsToMany<User, $this, TeamMember, 'pivot'>
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_members', 'team_id', 'user_id')
            ->using(TeamMember::class)
            ->withPivot(['role'])
            ->withTimestamps();
    }

    /**
     * Get all invitations for this team.
     *
     * @return HasMany<TeamInvitation, $this>
     */
    public function invitations(): HasMany
    {
        return $this->hasMany(TeamInvitation::class);
    }

    /**
     * Get the team owner.
     *
     * @return User|null
     */
    public function owner(): ?Model
    {
        return $this->users()
            ->wherePivot('role', TeamRole::Owner->value)
            ->first();
    }

    /**
     * Get the team member record for the given user.
     */
    public function teamMemberFor(?User $user): ?TeamMember
    {
        if (! $user) {
            return null;
        }

        return $this->teamMembers()
            ->where('user_id', $user->id)
            ->first();
    }
}

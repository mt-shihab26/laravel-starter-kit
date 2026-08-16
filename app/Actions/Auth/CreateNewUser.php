<?php

namespace App\Actions\Auth;

use App\Actions\Teams\CreateTeam;
use App\Concerns\ValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use ValidationRules;

    /**
     * Create a new action instance.
     */
    public function __construct(
        private CreateTeam $createTeam
    ) {}

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $rules = [
            'name' => $this->nameRules(),
            'email' => $this->emailRules(),
            'password' => $this->passwordRules(),
        ];

        Validator::make($input, $rules)->validate();

        return DB::transaction(function () use ($input) {
            $user = User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $input['password'],
            ]);

            $this->createTeam->handle($user, $user->name."'s Team");

            return $user;
        });
    }
}

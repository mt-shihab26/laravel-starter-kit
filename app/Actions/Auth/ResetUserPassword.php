<?php

namespace App\Actions\Auth;

use App\Concerns\ValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\ResetsUserPasswords;

class ResetUserPassword implements ResetsUserPasswords
{
    use ValidationRules;

    /**
     * Validate and reset the user's forgotten password.
     *
     * @param  array<string, string>  $input
     */
    public function reset(User $user, array $input): void
    {
        $rules = [
            'password' => $this->passwordRules(),
        ];

        $validated = Validator::make($input, $rules)->validate();

        $user->forceFill($validated)->save();
    }
}

<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit()
    {
        return inertia('settings/password');
    }

    /**
     * Update the user's password.
     */
    public function update(PasswordUpdateRequest $request)
    {
        $request->user()->update([
            'password' => $request->password,
        ]);

        return redirect()->back();
    }
}

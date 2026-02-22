<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Redirect to the user's profile settings page.
     */
    public function redirect()
    {
        return redirect()->route('settings.profile.edit');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request)
    {
        $user = $request->user();

        return inertia('settings/profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return redirect()
            ->route('settings.profile.edit')
            ->with('success', 'Profile updated successfully.');
    }

    /**
     * Update the user's avatar.
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image', 'max:2048'],
        ]);

        $request->user()->addMediaFromRequest('avatar')->toMediaCollection('avatar');

        return redirect()
            ->route('settings.profile.edit')
            ->with('success', 'Avatar updated successfully.');
    }

    /**
     * Delete the user's avatar.
     */
    public function destroyAvatar(Request $request)
    {
        $request->user()->clearMediaCollection('avatar');

        return redirect()
            ->route('settings.profile.edit')
            ->with('success', 'Avatar removed successfully.');
    }

    /**
     * Delete the user's profile.
     */
    public function destroy(ProfileDeleteRequest $request)
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

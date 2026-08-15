<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the welcome page.
     */
    public function index(): Response
    {
        return inertia('welcome');
    }

    /**
     * Handle the well known request.
     */
    public function wellknown(): JsonResponse
    {
        return response()->json([
            'enroll' => route('security.edit'),
            'manage' => route('security.edit'),
        ]);
    }
}

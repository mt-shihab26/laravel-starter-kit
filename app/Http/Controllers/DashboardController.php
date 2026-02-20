<?php

namespace App\Http\Controllers;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('dashboard');
    }
}

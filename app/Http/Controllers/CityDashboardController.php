<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class CityDashboardController extends Controller
{
    public function getTopDiagnoses()
    {
        return response()->json([
            ["diagnosis" => "Influenza", "count" => 120],
            ["diagnosis" => "Dengue", "count" => 95]
        ]);
    }

    public function getBarangays()
    {
        return response()->json([
            ["name" => "Barangay 1", "lat" => 8.477, "lng" => 124.645],
            ["name" => "Barangay 2", "lat" => 8.480, "lng" => 124.630]
        ]);
    }

    public function getPatients()
    {
        return response()->json([
            ["name" => "Juan Dela Cruz", "diagnosis" => "Influenza", "lat" => 8.479, "lng" => 124.642],
            ["name" => "Maria Santos", "diagnosis" => "Dengue", "lat" => 8.481, "lng" => 124.639]
        ]);
    }
}

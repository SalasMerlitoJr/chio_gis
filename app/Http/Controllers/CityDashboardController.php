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
        ["name" => "Agusan", "lat" => 8.4650, "lng" => 124.7030],
        ["name" => "Balulang", "lat" => 8.4800, "lng" => 124.6130],
        ["name" => "Bayabas", "lat" => 8.4845, "lng" => 124.6135],
        ["name" => "Bugo", "lat" => 8.5330, "lng" => 124.7120],
        ["name" => "Bulua", "lat" => 8.4850, "lng" => 124.6010],
        ["name" => "Camaman-an", "lat" => 8.4680, "lng" => 124.6510],
        ["name" => "Canitoan", "lat" => 8.4950, "lng" => 124.5900],
        ["name" => "Carmen", "lat" => 8.4822, "lng" => 124.6316],
        ["name" => "Consolacion", "lat" => 8.4842, "lng" => 124.6460],
        ["name" => "Gusa", "lat" => 8.5022, "lng" => 124.6707],
        ["name" => "Iponan", "lat" => 8.4840, "lng" => 124.5790],
        ["name" => "Kauswagan", "lat" => 8.5055, "lng" => 124.6242],
        ["name" => "Lapasan", "lat" => 8.4847, "lng" => 124.6582],
        ["name" => "Lumbia", "lat" => 8.4200, "lng" => 124.5650],
        ["name" => "Macabalan", "lat" => 8.4950, "lng" => 124.6550],
        ["name" => "Macasandig", "lat" => 8.4688, "lng" => 124.6487],
        ["name" => "Nazareth", "lat" => 8.4685, "lng" => 124.6425],
        ["name" => "Patag", "lat" => 8.4950, "lng" => 124.6240],
        ["name" => "Puntod", "lat" => 8.4955, "lng" => 124.6555],
        ["name" => "Tablon", "lat" => 8.5230, "lng" => 124.6980],
        // ...add the rest of the 80 barangays here...
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

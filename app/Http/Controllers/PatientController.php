<?php
namespace App\Http\Controllers;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller {
    public function index() {
        return Patient::with(['barangay','diagnosis'])->paginate(25);
    }
    public function store(Request $r) {
        $data = $r->validate([
            'name'=>'required',
            'barangay_id'=>'required|integer',
            'diagnosis_id'=>'nullable|integer',
            'birthdate'=>'nullable|date',
            'sex'=>'nullable|in:M,F,O',
            'age'=>'nullable|integer'
        ]);
        $data['created_by'] = auth()->id();
        $p = Patient::create($data);
        \App\Models\ActivityLog::create(['user_id'=>auth()->id(),'action'=>'create','entity'=>'patient','entity_id'=>$p->id]);
        return response()->json($p,201);
    }
    public function show($id){ return Patient::with(['barangay','diagnosis'])->findOrFail($id); }
    public function update(Request $r,$id){ $p=Patient::findOrFail($id); $p->update($r->all()); \App\Models\ActivityLog::create(['user_id'=>auth()->id(),'action'=>'update','entity'=>'patient','entity_id'=>$p->id]); return response()->json($p); }
    public function destroy($id){ $p=Patient::findOrFail($id); $p->delete(); \App\Models\ActivityLog::create(['user_id'=>auth()->id(),'action'=>'delete','entity'=>'patient','entity_id'=>$id]); return response()->json(null,204); }
}

<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Patient extends Model {
    protected $fillable = ['barangay_id','name','sex','birthdate','age','diagnosis_id','notes','created_by'];
    public function barangay(){ return $this->belongsTo(Barangay::class); }
    public function diagnosis(){ return $this->belongsTo(Diagnosis::class); }
}

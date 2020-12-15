<?php

namespace App\Http\Controllers;

use App\Models\Raid;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RaidController extends Controller
{
    public function index()
    {
        $raids = Raid::all(); 

        return response()->json([
            'raids' => $raids,
        ], 200);
    }    
    
    public function getRaidInfo($id)
    {
        $raidInfo = DB::table('raid')
        ->join('items', 'items.raid_id', '=', 'raid.id')
        ->join('members', 'members.id', '=', 'items.member_id')
        ->select('members.id', 'items.item', 'members.member')
        ->where('raid.id', '=', $id)
        ->get();

        return response()->json([
            'raidInfo' => $raidInfo,
        ], 200);  
    }

    public function addPlayer($playerName) 
    {   
        $id = DB::table('members')
            ->select('members.id')
            ->where('members.member', 'LIKE', '%' . $playerName . '%')
            ->first()->id;
        
        $details = MemberController::playerLoot($id);
    
        $member = MemberController::memberInformation($id);

        return response()->json([
            'player' => ['player' => $member, 'playerLoot' => $details],
        ], 200); 
    }
}

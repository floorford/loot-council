<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RaidController extends Controller
{
    public function index()
    {
        $raidInfo = DB::table('items')
            ->join('member', 'items.member_id', '=', 'member.id')
            ->join('raid', 'items.raid_id', '=', 'raid.id')
            ->select('members.member', 'items.item', 'raid.title')
            ->groupBy('raid.id')
            ->get();

        return response()->json([
        'raidInfo' => $raidInfo,
        ], 200);  
    }
}

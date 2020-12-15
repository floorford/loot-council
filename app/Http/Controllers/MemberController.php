<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\PlayerClass;
use App\Models\Rank;
use App\Models\Role;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MemberController extends Controller
{
  public function index()
  {
    $members = DB::table('members')
          ->join('class', 'members.class_id', '=', 'class.id')
          ->join('rank', 'members.rank_id', '=', 'rank.id')
          ->join('role', 'members.role_id', '=', 'role.id')
          ->select('members.member', 'members.prev_raids', 'members.absence', 'members.one_oh_one',
                   'members.six_months', 'members.id', 'rank.title as rank', 'role.title as role', 'class.title AS class')
          ->get();

    $classes = PlayerClass::all();
    $ranks = Rank::all();
    $roles = Role::all();

    return response()->json([
      'members' => $members,
      'classes' => $classes,
      'ranks' => $ranks,
      'roles' => $roles,
    ], 200);  
  }

  public function findPlayer($id)
  {
    $details = DB::table('items')
    ->join('raid', 'items.raid_id', '=', 'raid.id')
    ->select('raid.id', 'items.item', 'raid.title')
    ->where('items.member_id', '=', $id)
    ->get();

    $member = DB::table('members')
          ->join('class', 'members.class_id', '=', 'class.id')
          ->join('rank', 'members.rank_id', '=', 'rank.id')
          ->join('role', 'members.role_id', '=', 'role.id')
          ->select('members.member', 'members.prev_raids', 'members.absence', 'members.one_oh_one',
                   'members.six_months', 'members.id', 'rank.title as rank', 'role.title as role', 'class.title AS class')
          ->where('members.id', '=', $id)
          ->get();

    $total = DB::table('raid')->get()->count();

    return response()->json([
      'details' => $details,
      'member' => $member,
      'raid_total' => $total
    ], 200);  
  }   
}

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
          ->select('members.member', 'rank.title as rank', 'role.title as role', 'class.title AS class')
          ->get()
          ->toJson();

    $classes = PlayerClass::all()->toJson();
    $ranks = Rank::all()->toJson();
    $roles = Role::all()->toJson();

    return $members;
  }

  public function categoriseMembers($category, $id)
  {
    $members = DB::table('member')->where(function ($query) use ($category, $id) {
      $query->where($category + '_id', '=', $id);
    })->get();

    return $members->toJson();
  }   
}

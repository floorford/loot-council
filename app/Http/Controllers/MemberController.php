<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

use Config;

class MemberController extends Controller
{
    public function index()
    {
      $members = Member::all();

      return $members->toJson();
    }
}

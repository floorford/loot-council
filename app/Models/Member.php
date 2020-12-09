<?php

namespace App\Models;

use Eloquent;

class Member extends Eloquent
{
    protected $fillable = ['id', 
                           'member', 
                           'class_id', 
                           'rank_id', 
                           'role_id', 
                           'prev_raids', 
                           'absence', 
                           '101', 
                           'six_months'];
}

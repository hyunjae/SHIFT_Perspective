<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $fillable = ['email', 'results', 'breakdown'];

    protected $casts = [
        'breakdown' => 'array'
    ];
}

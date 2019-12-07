<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Result;
use App\Helper\MBTI;
use Illuminate\Support\Facades\Log;

class QuestionController extends Controller
{
    public function getQuestions()
    {
        $questions = MBTI::getQuestions();
        return $questions;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(['email' => 'required']);
        $email = $validatedData['email']; //validate email
        $answers = $request->answers;

        $data = MBTI::calculateMBTI($answers);
        $results = $data['results'];
        $breakdown = $data['breakdown'];

        //remove any stored data for that email if it already exists
        if (Result::where('email', $email)->first()){
            Result::where('email', $email)->delete(); 
        }
        
        Result::create([
            'email' => $email,
            'results' => $results,
            'breakdown' => $breakdown
        ]);

        return response()->json('Questions Submitted!');
    }

    public function getResult($email)
    {
        $result = Result::where('email', $email)->first()->toJson();
        Log::info("result: " .$result);
        return $result;
    }
}

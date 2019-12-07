<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Helper\MBTI;

class QuestionController extends Controller
{
    public function show()
    {
        $questions = MBTI::getQuestions();
        return $questions;
    }

    public function store(Request $request)
    {
        Question::table()->delete();

        foreach ($request as $data) {
            $validatedData = $data->validate([
                'question_id' => 'required',
                'value' => 'required',
            ]);

            Question::create([
                'question_id' => $validatedData['question_id'],
                'value' => $validatedData['value'],
            ]);
        }

        return response()->json('Queations Submitted!');
    }

    public function results()
    {
        $answers = Question::orderBy('created_at', 'desc')->get();
        $result = MBTI::calculateMBTI($answers);

        return $result->toJson();
    }
}

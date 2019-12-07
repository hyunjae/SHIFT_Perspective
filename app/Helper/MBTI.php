<?php

namespace App\Helper;

class MBTI {
	const QUESTIONS = [
		1 => [
			"text" => "You find it takes effort to introduce yourself to other people.",
			"dimension" => "EI",
			"direction" => 1,
		],

		2 => [
			"text" => "You consider yourself more practical than creative.",
			"dimension" => "SN",
			"direction" => -1,
		],
		
		3 => [
			"text" => "Winning a debate matters less to you than making sure no one gets upset.",
			"dimension" => "TF",
			"direction" => 1,
		],
		
		4 => [
			"text" => "You get energized going to social events that involve many interactions.",
			"dimension" => "EI",
			"direction" => -1,
		],
		
		5 => [
			"text" => "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
			"dimension" => "SN",
			"direction" => 1,
		],
		
		6 => [
			"text" => "Deadlines seem to you to be of relative rather than absolute importance.",
			"dimension" => "JP",
			"direction" => 1,
		],
		
		7 => [
			"text" => "Logic is usually more important than heart when it comes to making important decisions.",
			"dimension" => "TF",
			"direction" => -1,
		],
		
		8 => [
			"text" => "Your home and work environments are quite tidy.",
			"dimension" => "JP",
			"direction" => -1,
		],
		
		9 => [
			"text" => "You do not mind being at the center of attention.",
			"dimension" => "EI",
			"direction" => -1,
		],
		
		10 => [
			"text" => "Keeping your options open is more important than having a to-do list.",
			"dimension" => "JP",
			"direction" => 1,
		],
	];
	
	static function debug_to_console($data) {
		$output = $data;
		if (is_array($output))
			$output = implode(',', $output);
	
		echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
	}
    
    static function getQuestions(){
		$list = [];
        foreach(self::QUESTIONS as $question) {
            $text = $question["text"];
            array_push($list, $text);
        }

        return $list;
    }

	static function calculateMBTI($answers) {
		$dimensions = [
			"EI" => ["value" => 0.0, "questions_count" => 0],
			"SN" => ["value" => 0.0, "questions_count" => 0],
			"TF" => ["value" => 0.0, "questions_count" => 0],
			"JP" => ["value" => 0.0, "questions_count" => 0],
		];
	
		foreach($answers as $answer) {
			$questionID = $answer['question_id'];
			$value = $answer['value'];
			
			$question = self::QUESTIONS[$questionID];
			$direction = $question['direction'];
			$dimension = $question['dimension'];
			
			$answerShift = $value - 4.0;
			$value = $answerShift * $direction;
			
			$dimensions[$dimension]['value'] += $value;
			$dimensions[$dimension]['questions_count'] += 1;
		}
		
		$results = [];
		$breakdown = [];

		foreach($dimensions as $dimensionKey => $dimension) {
			$value = $dimension['value'];
			$questionsCount = $dimension['questions_count'];
			
			$results[$dimensionKey] = $dimensionKey[$value <= 0 ? 0 : 1];
			
			$maxPoints = $questionsCount * 3.0;
			$maxRange = $maxPoints * 2.0;
			
			$breakdown[$dimensionKey] = (int)((($value + $maxPoints) / $maxRange) * 100.0);
		}

		return [
			'results' => implode($results, ''),
			'breakdown' => $breakdown
		];
	}	
}

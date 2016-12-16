$(document).ready(function() {



var state = {
	questions: [
		{
			text: "If Johnny were to get a sticker everytime he gave the correct answer in class, you could say his behavior for answering questions correctly was being:",
			answers: ["Positively punished", "Positively reinforced", "Negatively punished", "Negatively reinforced"],
			correct: "Positively reinforced"
		},
		{
			text: "What famous psychologist was know for his experiments in training dogs to drool at the sound of a buzzer?",
			answers: ["Watson", "Skinner", "Pavlov", "Nixon"],
			correct: "Pavlov"
		},
		{
			text: "If Johnny were to scream every time his parents served him carrots, and his parents always took away the carrots when he screamed, you could say Johnny's behavior of screaming was being:",
			answers: ["Positively punished", "Negatively punished", "Positively reinforced", "Negatively reinforced"],
			correct: "Negatively reinforced"
		},
		{
			text: "Sally likes to eat chocolate. When she sees a candy store in the mall, she asks her mom if she can go get chocolate. Her mother reponds saying that they can go get chocolate. If this situation, what is the antecedent?",
			answers: ["The presence of the candy store", "Asking her mother for chocolate", "The chocolate", "Going to the mall"],
			correct: "The presence of the candy store"
		},
		{
			text: "When Timmy hits his sister, his mother scolds him, giving him a long talk about hitting. After the scolding, his mother ignores him for most of the day. Then, when he hits his sister again, his mother scolds him. What would most likely be the primary function of Timmy hitting his mother?",
			answers: ["Seeking access to materials", "Sensory stimulation", "Escape", "Attention"],
			correct: "Attention"
		}
	],
	score: 0,
	questionNumber: 0
};

//Starting quiz, displaying questions
function showQuestion(state, questionNumber) {
	if (questionNumber > 4) {
		$(".questionbox, #correctindicator, #incorrectindicator, #scoretext, #questionheader").addClass('hidden');
		if (state.score < 3) {
			$('#congratz').text("Whoops! Maybe you don't know as much as you think you do. Try again?");
		}
		if (state.score == 3 || state.score == 4) {
			$('#congratz').text("Nice! You know a lot! Wanna try for a higher score?");
		}
		if (state.score == 5) {
			$('#congratz').text("Whoa! You got every one right! Great job!");
		}
	}
	else {

	var question = state.questions[questionNumber].text;
	var answers = state.questions[questionNumber].answers;
	$('.question').html(question);
	var html = '<ul class="nodots">';
	for (var i = 0; i < answers.length; i++) {
		html += '<li><input id="option" type="radio" name="a" required><label for="option"><span><span></span></span>' + answers[i] + '</label></li>';
	}
	html += '</ul>';
	$('#answers').html(html);

	}
}


//Correct or Incorrect display
function showAnswer(state, questionNumber) {
	var answer = state.questions[questionNumber].correct;
	var selected = $('input[name=a]:checked', '#answers').closest('li').text();
	if (selected == answer) {
		$("#correctindicator").removeClass('hidden');
	}
	else {
		$("#incorrectindicator").removeClass('hidden');
	}
	$("#qsubmit").addClass('hidden');
	$("#cont").removeClass('hidden');
}


//Question title updater
function updateQuestionTitle(state, questionNumber) {
	$('#questionnumbertitle').text(state.questionNumber + 1);

}

//Question number in score line updater
function updateQuestionCounter(state, questionNumber) {
	$('#questionnumbercounter').text(state.questionNumber + 1);
}


//score updater
function updateScore(state, score) {
	var currentNumber = state.questionNumber;
	if ($('input[name="a"]:checked').closest('li').text() == state.questions[currentNumber].correct) {
		$('#score').text(state.score += 1);
	}
}


//Start button event listener
$('#startbutton').click(function(event) {
	showQuestion(state, 0);
	$('.startover, #qsubmit, #questionheader, #scoretext').removeClass('hidden');
	$('#introduction, .welcome').addClass('hidden');
	
});

//Submit button event listener
$('.questionform').submit(function(event) {
	event.preventDefault();
	var selected = $('input[name=a]:checked').val();
	var currentNumber = state.questionNumber;
	showAnswer(state, currentNumber);
	updateQuestionCounter(state, currentNumber);
	updateScore(state, state.score);

});

//Continue button event listener
$('#cont').click(function(event) {
	state.questionNumber += 1;
	event.preventDefault();
	showQuestion(state, state.questionNumber);
	$('#qsubmit').removeClass('hidden');
	$('#cont, #correctindicator, #incorrectindicator').addClass('hidden');
	updateQuestionTitle(state, state.questionNumber);

});













$('.startover').click(function(event) {
	window.location.reload();
});

});
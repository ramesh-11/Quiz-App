let a, time, date;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
setInterval(() => {
    a = new Date();
    date = a.toLocaleDateString(undefined, options);
    if (a.getHours() < 12) {
        var hour = ('0' + a.getHours()).slice(-2);
        var minute = ('0' + a.getMinutes()).slice(-2);
        var second = ('0' + a.getSeconds()).slice(-2);
        time = hour + ':' + minute + ':' + second + " AM";
    }
    else {
        var hour = a.getHours() - 12;
        hour = ('0' + hour).slice(-2);
        var minute = ('0' + a.getMinutes()).slice(-2);
        var second = ('0' + a.getSeconds()).slice(-2);
        time = hour + ':' + minute + ':' + second + " PM";
    }
    document.getElementById("time").innerHTML = time;
    document.getElementById("date").innerHTML = date.split(',')[1] + ', ' + date.split(',')[2] + ', ' + date.split(',')[0];
}, 1000);

var questions=[{
	question:"1. Which cricketer had scored highest individual score in first-class cricket?",
	choices:["Don Bradman","Brian Lara","Lane Hutton","Gary Sobers"],
	correctAnswer: 1
}, {
	question: "2. Which cricketer had scored highest individual score in ODI cricket?",
	choices: ["Virender Sehwag","Chris Gayle","Martin Guptill","Rohit Sharma"],
	correctAnswer: 3
}, {
	question: "3. Which cricketer had scored most centuries in first-class cricket?",
	choices: ["Lane Hutton","Wally Hammond","Jack Hobbs","Sachin Tendulkar"],
	correctAnswer: 2
}, {
	question: "4. Which cricketer had scored fastest century in ODI cricket?",
	choices: ["Vivian Richards","Corey Anderson","Shahid Afridi","AB de Villiers"],
	correctAnswer: 3
}, {
	question: "5. Which cricketer has taken most catches in ODI cricket?",
	choices: ["Ricky Ponting","Mahela Jayawardene","Jacques Kallis","Mark Waugh"],
	correctAnswer: 1
}, {
	question: "6. Which cricketer had scored highest individual score in Test cricket?",
	choices: ["Sanath Jayasuriya","Matthew Hayden","Brian Lara","Sachin Tendulkar"],
	correctAnswer: 2
}, {
	question: "7. Which cricketer had scored fastest century in Test cricket?",
	choices: ["Vivian Richards","Brendon McCullum","Misbah-ul-Haq","Adam Gilchrist"],
	correctAnswer: 1
}, {
	question: "8. Which cricketer had scored most runs in a Test match?",
	choices: ["Graham Gooch","Sunil Gavaskar","Don Bradman","Brian Lara"],
	correctAnswer: 0
}, {
	question: "9. Which cricketer had scored most runs in a Test series?",
	choices: ["Sunil Gavaskar","Don Bradman","Kumar Sangakkara","Hanif Mohammad"],
	correctAnswer: 1
}, {
	question: "10. Which cricketer had scored most test runs in a calendar year?",
	choices: ["V. V. S. Laxman","Mohamed Yusuf","Rahul Dravid","Steve Waugh"],
	correctAnswer: 1
}];

var curretQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function(){
	displayCurrentQuestion();
	$(this).find(".quizMessage").hide();
	$(this).find(".nextButton").on("click",function(){
		if(!quizOver){
			value = $("input[type='radio']:checked").val();
			if(value == undefined){
				$(document).find(".quizMessage").text("Please select an answer");
				$(document).find(".quizMessage").show();
			}else{
				$(document).find(".quizMessage").hide();
				if(value == questions[curretQuestion].correctAnswer){
					correctAnswers++;
				}
				curretQuestion++;
				if(curretQuestion < questions.length){
					displayCurrentQuestion();
				}else{
					displayScore();
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
				}
			}
		}else{
			quizOver = false;
			$(document).find(".nextButton").text("Next Question");
			resetQuiz();
			displayCurrentQuestion();
			hideScore();
		}
	});
});
function displayCurrentQuestion(){
	console.log("In display current Question");

	var question = questions[curretQuestion].question;
	var questionClass = $(document).find(".quizContainer > .question");
	var choiceList = $(document).find(".quizContainer > .choiceList");

	$(questionClass).text(question);
	$(choiceList).find("li").remove();

	var numChoice = questions[curretQuestion].choices.length;
	var choice;
	for(var i=0; i<numChoice; i++){
		choice = questions[curretQuestion].choices[i];
		$('<li><input type="radio" value='+ i +' name="dynradio" />' + choice + '</li>').appendTo(choiceList); 
	}
}
function resetQuiz(){
	curretQuestion = 0;
	correctAnswers = 0;
	hideScore();
}
function displayScore(){
	$(document).find(".quizContainer > .result").text("You scored: "+ correctAnswers+ " out of: " + questions.length);
	$(document).find(".quizContainer > .result").show();
}
function hideScore(){
	$(document).find(".result").hide();
}

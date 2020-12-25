var buttonColours = ["red", "blue", "green", "yellow"], gamePattern = [], userClickedPattern = [], level=0, started=true;

// game starts by pressing the button once...
function game_start () {
	if(started === true)
		nextSequence(), started=false;
}

//game_start();

// button clicks to play the game and promote to next levels...
$(".btn").on("click", function () {
	var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(this.id);
	animatePress(this.id);

	generateSequence(userClickedPattern.length-1);
});

// here the mapping of the user selected button color with the color selected by the system and if it matches then level increases else error...
function generateSequence (currentLevel) {
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
	{
		if(userClickedPattern.length === gamePattern.length)
		{
			console.log("correct");
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	}
	else
	{
		console.log("wrong");
	 	$("body").addClass("game-over");
	 	setTimeout(function () {
	 		$("body").removeClass("game-over");
	 	}, 200);
	 	playSound("wrong");
	 	$("h1#level-title").text("Game Over, Press the button to Restart");
	 	startOver();
	}
}

// here the game will start only after the user loses the game...
function startOver () {
	level=0;
	gamePattern=[];
	started=true; 
}

// here the game level will be increased...
function nextSequence () {
	userClickedPattern=[];
	level += 1;
	$("h1#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColours[randomNumber];
	gamePattern.push(randomChosenColor);

	playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

// sounds will be played on button clicks and key press...
function playSound (Colorname) {
    var a = new Audio("sounds/" + Colorname + ".mp3");
    a.play();
}

// background effect will take place on button clicks and key press...
function animatePress (currentColor) {
	$("#"+currentColor).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	},100);
}

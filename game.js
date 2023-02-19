var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function startOver()
{
  level=0;
  started=false;
  gamePattern=[];
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart" );
    startOver();
  }
}

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  //generating random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  //getting the color using that random number
  var randomChosenColour = buttonColours[randomNumber];
  //putting the random choosen color into the gamePatten array
  gamePattern.push(randomChosenColour);
  var x = $("#" + randomChosenColour);
  //fading property
  x.fadeIn(100).fadeOut(100).fadeIn(100);
  //playing sound
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
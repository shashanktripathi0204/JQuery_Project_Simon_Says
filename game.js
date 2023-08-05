// Game pattern
var gamePattern = [];
// colors
var buttonColours = ["red", "blue", "green", "yellow"];
// Gamie staring for the first time
var gameStarted = false;
// game starting for the second time
var gameStarted_again = false;
// user clicked pattern
var userClickedPattern = [];
// level of game
var level = 0;
// how many clicks has the user completed
var clickcount = 0;
// flag to check if the user has pressed a wrong color
var gameover = false;


// Starting the game for the first time and then restarting the game once the user has mismatched the color
$(document).keydown(function(event){
    if(gameStarted == false){
        // Game pattern after restarting
        gamePattern = [];
        // Gamie staring for the first time
        gameStarted = true;
        // game starting for the second time
        gameStarted_again = false;
        // user clicked pattern
        userClickedPattern = [];
        // level of game
        level = 0;
        // how many clicks has the user completed
        clickcount = 0;
        // flag to check if the user has pressed a wrong color
        gameover = false;
        // console.log("game start  by pressing key :- "+event.key);
        gameStarted = true;
        nextSequence();
        $("h1").text("Level 1");
        // console.log("latest function level is "+level);
    }
});



// generateing random number between 0 to 3
// also flashing the first colour for the game to start --> this will call the flashMe and playSound function
// once this function is executed a new level will start
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    clickcount = 0;
    flashMe(randomChosenColour);
    // $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    userClickedPattern = [];
    level+=1;
    $("h1").text("Level "+level); // as soon as the fuction is triggered the heading will change.
    
}

// this function will capture the button that is clicked using the mouse 
$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    flashMe(userChosenColour);
    // var userChosenColour = event.target.id; // this line will capture the id of the button clicked
    userClickedPattern.push(userChosenColour);   
    // This gameover variable will check if the user has used a wrong color sequence once set to true it will be direct the code to else block
    if (gameover == false){
        if((userChosenColour === gamePattern[clickcount]) && (clickcount<level)){
            clickcount += 1;
            if (clickcount>=level){
                // nextSequence();
                var delayInMilliseconds = 1000; //1 second
                setTimeout(function() {
                //your code to be executed after 1 second
                nextSequence();
                }, delayInMilliseconds);
            }
        }
        else if(userChosenColour !== gamePattern[clickcount-1]){
            // this is for visually indicating that the game is over
            mistake();
            gameover = true;
        }
    }
    // in this block we will let the user restart the game
    else{
        // once the game is over until the user restarts the game, he will not be able to click anything
        // this is for visually indicating that the game is over
        mistake();
    }

});

// FUNCTION WILL BECOME ACTIVE WHEN USER MAKES A MISTAKE
function mistake(){
    $('body').addClass('change-color');
    $('h1').text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    var delayInMilliseconds = 100; //1 second
    setTimeout(function() {
    // your code to be executed after 1 second
    $('body').removeClass('change-color');
    $('body').addClass('backgroundcolor');
    }, delayInMilliseconds);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    clickcount = 0
    // gameStarted_again = true;
    gameStarted = false;
}

// this function is used to playsound on button press
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// this function is used to add click effect to the buttons
function flashMe(color){
    $("#" + color).fadeIn(150).fadeOut(150).fadeIn(150);
    $("#" + color).addClass("pressed");
    var delayInMilliseconds = 20; //1 second
    setTimeout(function() {
    //your code to be executed after 1 second
    $("#" + color).removeClass("pressed");
    }, delayInMilliseconds);
}


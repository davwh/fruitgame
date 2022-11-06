var playing = false;  
var score ; 
var trialsLeft;
var step;
var action; 
var fruits = ['apple','mango', 'banana', 'cherries', 'avocado', 'orange', 'peach', 'pear', 'watermelon', 'strawberry'];



$(function(){
    $("#startreset").click(function(){
    //We are playing
    if(playing == true){
        location.reload(); 
    }else{
        //We are not playing. Game initiated
        playing = true; 

        setTimeout(function(){
            score = 0; //Set score to 0
            $("#scorevalue").html(score);
            //Show hearts left 
            $("#trialsLeft").show();
            trialsLeft = 3; //Set numbers of trials/hearts
            addHearts(); 

            //Hide Gameover box
            $("#gameOver").hide();

            //Change button text to reset game
            $("#startreset").html("RESET GAME");

            //Start sending fruits
            startAction();
       }, 1500)
    }});

    //Slice a fruit
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); //update score
        $("#slicesound")[0].play();// Plays sound. 0 to access the first element of the array
        
        //stop fruit
        clearInterval(action);
        
        //hide fruit
        $("#fruit1").hide("explode" , {pieces: 30 }, 500); //slice fruit
        
        //send new fruit
        setTimeout(startAction, 800);
    });
 
    
    //Fill the "trialLeft box" with hearts
    function addHearts(){
        $("#trialsLeft").empty();
        for(i = 0; i < trialsLeft; i++){
            $("#trialsLeft").append('<img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Heart-image.png" class="life">');
        }
    }
    
    // Generate a random fruit from the array "fruits"
    function chooseFruit(){
        $("#fruit1").attr('src' , 'images/' + fruits[Math.round(9*Math.random())] +'.png'); 
    }

    //Show a fruit with a random position
    function showFruit(){
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -5}); //Create random position for the fruit.
    }

    //Start showing fruits
    function startAction(){
        //generate a fruit
        showFruit();

        //Generate a random speed
        step = 1+ Math.round(5*Math.random());
               
        action = setInterval(function(){
            //move fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + step);                              
        
            //Check if the fruit's position is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //Check if we have hearts left
                if(trialsLeft > 1 ){
                    //generate a fruit
                    showFruit();

                    //generate a random step
                    step = 1+ Math.round(5*Math.random()); // change step
                    
                    //reduce trials by one
                    trialsLeft --;
                    
                    //populate trialsLeft box
                    addHearts();
                    
                } else { // game over
                    playing = false; //we are not playing anymore
                    $("#startreset").html("START GAME"); // change button to Start Game
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is <span>'+ score +'</span> </p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 5);
    }

    //Stop dropping fruits
    function stopAction(){
        clearInterval(action); 
        $("#fruit1").hide();
    }

});
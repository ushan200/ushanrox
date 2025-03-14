function controller(event){
    if(event.key == "Enter"){
        if(runWorker == 0){
            run();
            runSound.play();
            moveBackground();
            updateScore();
            flameMarginLeft.forEach(createFlame);
        }
    }
    if(event.key == " "){
        if(jumpWorker == 0){
            if(runWorker != 0){
                clearInterval(runWorker);
                jump();
                jumpSound.play();
                runSound.pause();
            }
        }
    }
}

var runImageNumber = 1;
var runWorker = 0;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run(){
    runWorker = setInterval(()=>{
    runImageNumber = runImageNumber + 1;

    if(runImageNumber == 6){
        runImageNumber = 1 ;    
    }

    document.getElementById("boy").src = "run"+ runImageNumber +".png";
    },150);
    
}
var jumpImageNumber = 1;
var jumpWorker = 0;
var boyMarginTop = 360;
var jumpSound = new Audio("jump.mp3");
function jump(){

    jumpWorker = setInterval(()=>{

    if(jumpImageNumber < 7){
        boyMarginTop = boyMarginTop -10;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }
    if(jumpImageNumber >6){
        boyMarginTop = boyMarginTop +10;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

        jumpImageNumber = jumpImageNumber + 1;
    if(jumpImageNumber == 13){
        jumpImageNumber = 1;
        clearInterval(jumpWorker);
        jumpWorker=0;
        run();
        runSound.play();
    }
    document.getElementById("boy").src = "jump" + jumpImageNumber + ".png";
    },150);
}

var backgroundPosition = 0;
var backgroundWorker = 0;
function moveBackground(){
    backgroundWorker = setInterval(()=>{
        backgroundPosition = backgroundPosition -10;
    document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";

    },100);

}
var score = 0;
var scoreWorker = 0;

function updateScore(){
    scoreWorker = setInterval(()=>{
        score = score + 10;
        if(score == 1010){
            alert("You are win...");
            window.location.reload();
        }
    document.getElementById("score").innerHTML = score;
    },100);
}

var flameMarginLeft= [400,800,1200,1500,1800];

function createFlame(x){
    var i = document.createElement("img");
    i.src = "Flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(i);

    flameworker=setInterval(()=>{
        x= x-10;

if(x== 150){
    if(jumpWorker== 0){
    clearInterval(runWorker);
      clearInterval(backgroundWorker);
    clearInterval(scoreWorker);
    clearInterval(flameworker);
  
    jumpWorker=1;

    dead();
    deadSound.play();
    runSound.pause();
}
}


        i.style.marginLeft = x + "px";
    },100);
}

var deadImageNumber = 1;
var deadWorker = 0;
var deadSound = new Audio("dead.mp3");

function dead(){

    deadWorker = setInterval(()=>{
        deadImageNumber = deadImageNumber + 1;
        if(deadImageNumber == 11){
            deadImageNumber = 10;
            clearInterval(deadWorker);
            alert("Game Over");
            window.location.reload();
            
        }

        document.getElementById("boy").src = "dead" + deadImageNumber + ".png"
    },150);
}
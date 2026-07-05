let userScore = 0;
let computerScore = 0;

function play(userChoice){

const choices=["Rock","Paper","Scissors"];

const computerChoice=choices[Math.floor(Math.random()*3)];

document.getElementById("player").innerHTML="You : "+userChoice;

document.getElementById("computer").innerHTML="Computer : "+computerChoice;

let result="";

if(userChoice===computerChoice){

result="It's a Draw!";

}
else if(

(userChoice==="Rock" && computerChoice==="Scissors")||

(userChoice==="Paper" && computerChoice==="Rock")||

(userChoice==="Scissors" && computerChoice==="Paper")

){

result="🎉 You Win!";

userScore++;

}
else{

result="😢 Computer Wins!";

computerScore++;

}

document.getElementById("winner").innerHTML=result;

document.getElementById("userScore").innerHTML=userScore;

document.getElementById("computerScore").innerHTML=computerScore;

}

function resetGame(){

userScore=0;

computerScore=0;

document.getElementById("userScore").innerHTML=0;

document.getElementById("computerScore").innerHTML=0;

document.getElementById("winner").innerHTML="Choose your move!";

document.getElementById("player").innerHTML="You :";

document.getElementById("computer").innerHTML="Computer :";

}
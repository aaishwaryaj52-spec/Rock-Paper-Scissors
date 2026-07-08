
// =========================================
// Rock Paper Scissors Pro
// =========================================

const choices = ["Rock", "Paper", "Scissors"];

let stats = {
    wins: Number(localStorage.getItem("wins")) || 0,
    losses: Number(localStorage.getItem("losses")) || 0,
    draws: Number(localStorage.getItem("draws")) || 0,
    streak: Number(localStorage.getItem("streak")) || 0,
    round: Number(localStorage.getItem("round")) || 1
};

// DOM
const userScore = document.getElementById("userScore");
const computerScore = document.getElementById("computerScore");
const drawScore = document.getElementById("drawScore");

const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");

const winner = document.getElementById("winner");
const historyList = document.getElementById("historyList");

updateScore();

// =========================================
// Play Game
// =========================================

function play(userMove){

    computerChoice.innerHTML = "🤔";

    winner.innerHTML = "Computer is thinking...";

    setTimeout(()=>{

        const computerMove = getComputerMove(userMove);

        playerChoice.innerHTML = emoji(userMove);
        computerChoice.innerHTML = emoji(computerMove);

        checkWinner(userMove, computerMove);

    },700);

}

// =========================================
// Computer AI
// =========================================

function getComputerMove(userMove){

    const difficulty =
    document.getElementById("difficulty")?.value || "Medium";

    if(difficulty==="Easy"){

        return choices[Math.floor(Math.random()*3)];

    }

    if(difficulty==="Hard"){

        // 70% chance computer wins

        if(Math.random()<0.7){

            if(userMove==="Rock") return "Paper";
            if(userMove==="Paper") return "Scissors";
            if(userMove==="Scissors") return "Rock";

        }

    }

    return choices[Math.floor(Math.random()*3)];

}

// =========================================
// Winner
// =========================================

function checkWinner(user, computer){

    let result="";

    if(user===computer){

        stats.draws++;

        result="🤝 Draw!";

        drawScore.textContent=stats.draws;

        stats.streak=0;

    }

    else if(

        (user==="Rock"&&computer==="Scissors")||

        (user==="Paper"&&computer==="Rock")||

        (user==="Scissors"&&computer==="Paper")

    ){

        stats.wins++;

        stats.streak++;

        userScore.textContent=stats.wins;

        result="🎉 You Win!";

    }

    else{

        stats.losses++;

        stats.streak=0;

        computerScore.textContent=stats.losses;

        result="😢 Computer Wins!";

    }

    winner.innerHTML=result;

    stats.round++;

    save();

    addHistory(user,computer,result);

}

// =========================================
// History
// =========================================

function addHistory(user,computer,result){

    if(!historyList) return;

    const item=document.createElement("li");

    item.innerHTML=

    `${emoji(user)} ${user}
     vs
     ${emoji(computer)} ${computer}
     ➜ ${result}`;

    historyList.prepend(item);

    while(historyList.children.length>15){

        historyList.removeChild(historyList.lastChild);

    }

}

// =========================================
// Emoji
// =========================================

function emoji(move){

    if(move==="Rock") return "🪨";

    if(move==="Paper") return "📄";

    return "✂️";

}

// =========================================
// Update
// =========================================

function updateScore(){

    userScore.textContent=stats.wins;

    computerScore.textContent=stats.losses;

    if(drawScore)
        drawScore.textContent=stats.draws;

}

// =========================================
// Save
// =========================================

function save(){

    Object.keys(stats).forEach(key=>{

        localStorage.setItem(key,stats[key]);

    });

}

// =========================================
// Reset
// =========================================

function resetGame(){

    localStorage.clear();

    stats={
        wins:0,
        losses:0,
        draws:0,
        streak:0,
        round:1
    };

    updateScore();

    if(historyList)
        historyList.innerHTML="";

    playerChoice.innerHTML="❔";

    computerChoice.innerHTML="❔";

    winner.innerHTML="Choose Your Move!";

}

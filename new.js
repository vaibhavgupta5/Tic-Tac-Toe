let boxes = document.querySelectorAll(".box");
let resBtn = document.querySelector(".res-btn");
let mesContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");

    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
      curTurn("X");
    } else {
      box.innerHTML = "X";
      turnO = true;
      curTurn("O");
    }
    box.disabled = true;
    count++;
    console.log(count);
    
    let isWinner = checkWinner();


    if(count === 9  && !isWinner){
      drawWinner();
    }
    else{
      checkWinner();
    }
    
  });
});


const curTurn = (pos) => {
  msg.innerText = `Cuurent Turn is of ${pos}`;
  mesContainer.classList.remove("hide");
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  mesContainer.classList.remove("hide");
};


const drawWinner = (_winner) => {
  msg.innerText = `Match Draw!!`;
  mesContainer.classList.remove("hide");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    mesContainer.classList.add("hide");
  }
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
};

const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("Winner is ", pos1);
        
          showWinner(pos1);
        
        
        disableBoxes();
        return true;
        
      }
    }
  }
};

resBtn.addEventListener("click", resetGame);

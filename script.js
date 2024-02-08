let w_ct = 0;
let t_ct = 0;
let l_ct = 0;
setTimeout( function(){
  document.getElementsByClassName("thanks")[0].style.display = "none";
}, 4000);
function removeIntro(){
  document.getElementById("intro").style.display = "none";
}
// let random = changeRandom();
// let turn = changeTurn();
// var wLine2;
// function changeRandom(){
var random = Math.floor(Math.random() * 2);
// console.log(random);
if (random) {
  var you = document.getElementById("you");
  you.innerHTML = "O";
  document.getElementById("bot").innerHTML = "&#10006;";
} else {
  document.getElementById("you").innerHTML = "&#10006;";
  document.getElementById("bot").innerHTML = "O";
}
//   return random;
// }
// function changeTurn(){
var turn = Math.floor(Math.random() * 2);
// console.log(turn);
if (turn) {
  document.getElementById("arrow").innerHTML = "&#8593;";
  document.getElementById("arrow_name").innerHTML = "YOUR TURN";
} else {
  document.getElementById("arrow").innerHTML = "&#8593;";
  document.getElementById("arrow_name").innerHTML = "YOUR TURN";
}
//   return turn;
// }

function NewGame() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  // $("td").css("background-color", "transparent");
  for (i = 0; i < 9; i++) {
    document.getElementsByClassName("btn")[i].innerHTML = "&#x200B;";
  }
  for(i=0; i<8; i++){
    document.getElementsByClassName("endgame")[i].style.display = "none";
  }
  document.getElementsByClassName("none")[0].style.display = "none";
  document.getElementsByClassName("none")[1].style.display = "none";
  
  // changeRandom();
  // changeTurn();

  var random1 = Math.floor(Math.random() * 2);
  console.log(random1);
  if (random1) {
    var you = document.getElementById("you");
    you.innerHTML = "O";
    document.getElementById("bot").innerHTML = "&#10006;";
  } else {
    document.getElementById("you").innerHTML = "&#10006;";
    document.getElementById("bot").innerHTML = "O";
  }
  //   return random;
  // }
  // function changeTurn(){
  var turn1 = Math.floor(Math.random() * 2);
  console.log(turn1);
  if (turn1) {
    document.getElementById("arrow").innerHTML = "&#8593;";
    document.getElementById("arrow_name").innerHTML = "YOUR TURN";
  } else {
    document.getElementById("arrow").innerHTML = "&#8593;";
    document.getElementById("arrow_name").innerHTML = "YOUR TURN";
  }
  random = random1;
  console.log(random);
  turn = turn1;
  console.log(turn);
}
console.log(random);
console.log(turn);
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
if (!turn) {
  var firstPos = Math.floor(Math.random() * 5);
  if (random) {
    document.getElementById(2 * firstPos).innerHTML = "&#10060;";
  } else {
    document.getElementById(2 * firstPos).innerHTML = "&#11093;";
  }
  round++;
  board[2 * firstPos] = aiPlayer;
  console.log(board);
}
// else{
function move(element, player) {
  console.log("element" + element.id);
  if (board[element.id] != "P" && board[element.id] != "C") {
    round++;
    // $(element).css("background-color", color);
    console.log(element.id);
    if (random) {
      document.getElementById(element.id).innerHTML = "&#11093;";
    } else {
      document.getElementById(element.id).innerHTML = "&#10060;";
    }
    board[element.id] = player;
    console.log(board);

    if (winning(board, player)) {
      //winning line
      setTimeout(function () {
        // alert("YOU WIN");
        w_ct++;
        var wLine1 = winningLine(board, aiPlayer);
        document.getElementById(wLine1).style.display = "block";
        document.getElementsByClassName("none")[0].style.display = "block";
        document.getElementsByClassName("none")[1].style.display = "block";
        document.getElementById("winner").innerHTML = "You wins";
        document.getElementsByClassName("win_cnt")[0].innerHTML = w_ct;
        // reset();
      }, 800);
      return;
    } else if (round > 8) {
      setTimeout(function () {
        // alert("TIE");
        t_ct++;
        document.getElementsByClassName("none")[0].style.display = "block";
        document.getElementsByClassName("none")[1].style.display = "block";
        document.getElementById("winner").innerHTML = "Game TIE";
        document.getElementsByClassName("tie_cnt")[0].innerHTML = t_ct;
        // reset();
      }, 800);
      return;
    } else {
      round++;
      var index = minimax(board, aiPlayer).index;
      var selector = "#" + index;
      console.log(selector);
      // $(selector).css("background-color", aiCo);
      if (random) {
        document.getElementById(index).innerHTML = "&#10060;";
      } else {
        document.getElementById(index).innerHTML = "&#11093;";
      }
      board[index] = aiPlayer;
      console.log(board);
      console.log(index);
      if (winning(board, aiPlayer)) {
        setTimeout(function () {
          // alert("YOU LOSE");
          l_ct++;
          var wLine = winningLine(board, aiPlayer);
          document.getElementById(wLine).style.display = "block";
          document.getElementsByClassName("none")[0].style.display = "block";
          document.getElementsByClassName("none")[1].style.display = "block";
          document.getElementById("winner").innerHTML = "Bot wins";
          document.getElementsByClassName("loss_cnt")[0].innerHTML = l_ct;
          // reset();
        }, 800);
        return;
      } else if (round === 0) {
        setTimeout(function () {
          // alert("tie");
          document.getElementsByClassName("none")[0].style.display = "block";
          document.getElementsByClassName("none")[1].style.display = "block";
          document.getElementById("winner").innerHTML = "Game TIE";
          // reset();
        }, 800);
        return;
      }
    }
  }
}
// }
function minimax(reboard, player) {
  iter++;
  let array = avail(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10,
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10,
    };
  } else if (array.length === 0) {
    return {
      score: 0,
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

//available spots
function avail(reboard) {
  return reboard.filter((s) => s != "P" && s != "C");
}

// winning combinations
function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
function winningLine(board, player) {
  // if (
  if (board[0] == player && board[3] == player && board[6] == player) return 11;
  else if (board[1] == player && board[4] == player && board[7] == player)
    return 22;
  else if (board[2] == player && board[5] == player && board[8] == player)
    return 33;
  else if (board[0] == player && board[1] == player && board[2] == player)
    return 44;
  else if (board[3] == player && board[4] == player && board[5] == player)
    return 55;
  else if (board[6] == player && board[7] == player && board[8] == player)
    return 66;
  else if (board[0] == player && board[4] == player && board[8] == player)
    return 77;
  else if (board[2] == player && board[4] == player && board[6] == player)
    return 88;
  // ) {
  //   return true;
  // } else {
  //   return false;
  // }
}

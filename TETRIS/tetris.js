const canvas = document.getElementById("Mycanvas");
const ctx = canvas.getContext("2d");

const BLOCKSIZE = 20;
const boardWidth = 14;
const boardHeight = 30;

canvas.width = boardWidth*BLOCKSIZE;
canvas.height = boardHeight*BLOCKSIZE;
console.log(canvas);

ctx.scale(BLOCKSIZE, BLOCKSIZE);
const board = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,0,0,1,1,1,1]
]

const player = {
  position: {x: 5, y: 5},
  shape: [[1, 1,],
          [1, 1]]
}
const pieces = [
  [[1,1],
   [1,1]],

  [[1,1,1,1]],

  [[0,1,0],
   [1,1,1]],

   [[1,1,0],
    [0,1,1]],

    [[1,0],
    [1,0],
    [1,1]]

  
]
let dropCounter = 0;
let lastTime = 0;
function Upload(time = 0){
  let deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if(dropCounter > 1000){
    player.position.y++;
    if(checkColision()) {
      player.position.y--;
      solidPiece();
      RemoveRows();
    }
    dropCounter = 0;
  }
  draw();
  window.requestAnimationFrame(Upload);
}

function draw(){
   ctx.fillStyle = "#000";
   ctx.fillRect(0,0,canvas.width, canvas.height);
   board.forEach((row , y) => {
          row.forEach((col, x) => {
            if(col == 1){
              ctx.fillStyle = "#c4fa00"
              ctx.fillRect(x, y, 1, 1)
            }
          })
   });
   player.shape.forEach((row, y) => {
      row.forEach((col, x) => {
        if(col == 1 ){
          ctx.fillStyle = "#dd0000"
          ctx.fillRect(x + player.position.x , y + player.position.y, 1, 1)
        }
      })
   })
}
document.addEventListener("keydown", (e) => {
    
    if(e.key == "ArrowLeft") {player.position.x--
      if(checkColision()) {player.position.x++}
    }
    if(e.key == "ArrowRight") {player.position.x++
       if(checkColision()) { player.position.x--}
    }
    if(e.key == "ArrowDown") {player.position.y++
      if(checkColision()) { 
        player.position.y--
        solidPiece();
        RemoveRows();
      }
    
    }
    if(e.key == "ArrowUp") {
      const rotated = [];
      for(let i = 0; i < player.shape[0].length; i++){
        const row = [];
        for(let j = player.shape.length-1; j >= 0; j--){
          row.push(player.shape[j][i])
        }
        rotated.push(row);
    }
     const prevShape = player.shape;
      player.shape = rotated;
   if(checkColision()) {
    player.shape = prevShape;
    }
    }
   
    
})

function checkColision() {
  return player.shape.find((row, y) => {
    return row.find((col, x ) => {
      return (col != 0 && board[y+player.position.y]?.[x+player.position.x] != 0)
    })
  })
}
function solidPiece(){
  player.shape.forEach((row, y) => {
    row.forEach((col, x) => {
            console.log(y + player.position.y, x + player.position.x);
            if(col == 1){
              board[y + player.position.y][ x + player.position.x] = 1
            }
    }) 
  })

   player.shape = pieces[Math.floor(Math.random() * pieces.length)];
  player.position.x = Math.floor(Math.random() * boardWidth/2);
  player.position.y = 0;
   if(checkColision()){
    alert("Game Over")
    board.forEach(row => row.fill(0));
   }
}
function RemoveRows(){
   const rowsToRemove = [];
   board.forEach((row, y) => {
    if(row.every(col => col == 1)){
      rowsToRemove.push(y);
    }
    })
    rowsToRemove.forEach((row) => {
       board.splice(row, 1);
       const newRow = new Array(boardWidth).fill(0);
       board.unshift(newRow);
    })
}
Upload();

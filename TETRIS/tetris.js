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
    [1,1,1,1,1,1,1,1,0,0,1,1,1,1]
]

const player = {
  position: {x: 5, y: 5},
  shape: [[1, 1,],
          [1, 1]]
}
function Upload(){
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
        if(col = 1 ){
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
            if(col == 1){
              board[y + player.position.y][ x + player.position.x] = 1
            }
    }) 
  })
  player.position.x = 5;
  player.position.y = 5;
}
Upload();

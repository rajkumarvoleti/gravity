var canvas = document.querySelector("canvas");
const pi = Math.PI;

var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

window.addEventListener("click",function() {
  init();
})

const colors = ["#73EEDC","#D9BBF9","#E6AF2E","#23395B","#CE4760"];

function generateRandomColor() {
  var index = Math.floor(Math.random()*colors.length);
  return colors[index];
}

function generateRandomInt(x, y){
  return Math.floor(Math.random()*(y-x+1)) + x;
}

const gravity = 0.9;
const frictionY = 0.8;
const frictionX = 0.8;

function Ball(x, y, r, dx, dy){
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.color = generateRandomColor();

  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,2*pi,false);
    c.fillStyle = this.color;
    c.stroke();
    c.fill();
  }

  this.update = function(){

    // update position
    if(this.x + this.dx + this.r > innerWidth || this.x - this.r < 0)
      this.dx = -this.dx*frictionX;
    if(this.y + this.dy + this.r > innerHeight)
      this.dy = -this.dy*frictionY;
    else
      this.dy += gravity;
    console.log(dy);
    this.x += this.dx;
    this.y += this.dy;

  }
}

var balls = [];
function init(){
  balls = [];
  var numberOfBalls = (innerWidth*innerHeight)/2000;
  for (let i = 0; i < numberOfBalls; i++) {
    var r = generateRandomInt(5,20);
    var x = generateRandomInt(r,innerWidth-r);
    var y = generateRandomInt(r,innerHeight-r);
    var dx= generateRandomInt(-3,3);
    var dy = generateRandomInt(-3,3);
    balls.push(new Ball(x,y,r,dx,dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);

  balls.forEach(ball => {
    ball.draw();
    ball.update();
  });

}

init();
animate();
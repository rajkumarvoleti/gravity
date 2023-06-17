var canvas = document.querySelector("canvas");
const pi = Math.PI;

var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c.fillStyle = 'red';
// c.fillRect(100,100,100,100);

// c.beginPath();
// c.moveTo(300,300);
// c.lineTo(300,600);
// c.lineTo(600,300);
// c.strokeStyle = "blue";
// c.stroke();


// for (let i = 0; i < 10; i++) {
//   var x = Math.random()*innerWidth;
//   var y = Math.random()*innerHeight;
//   c.beginPath();
//   c.strokeStyle = "green";
//   c.arc(x,y,100,0,2*pi,false);
//   c.stroke();
// }

// var x = Math.random()*innerWidth;
// var y = Math.random()*innerHeight;
// var dx= (Math.random()-0.5)*10;
// var dy = (Math.random()-0.5)*10;
// var r = 30;

// function animate() {
//   requestAnimationFrame(animate);

//   // draw circle
//   c.clearRect(0,0,innerWidth,innerHeight);
//   c.beginPath();
//   c.arc(x,y,r,0,2*pi,false);
//   c.strokeStyle = "green";
//   c.stroke();

//   // changing direction
//   if(x + r > innerWidth || x - r < 0)
//     dx = -dx;
//   if(y + r > innerHeight || y - r < 0)
//     dy = -dy;

//   // updating x,y values
//   x += dx;
//   y += dy
// }

// animate();

var mouse = {
  x:undefined,
  y:undefined
};

window.addEventListener('resize',function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

window.addEventListener('mousemove',function(e){
  mouse.x = e.x;
  mouse.y = e.y;
})

window.addEventListener('mouseout',function(e){
  mouse.x = undefined;
  mouse.y = undefined;
})

const colors = ["#73EEDC","#D9BBF9","#E6AF2E","#23395B","#CE4760"];

function generateRandomColor() {
  var index = Math.floor(Math.random()*colors.length);
  return colors[index];
}

function Circle(x, y, r, dx, dy){
  this.x = x;
  this.y = y;
  this.r = r;
  this.minRadius = r;
  this.dx = dx;
  this.dy = dy;
  this.color = generateRandomColor();

  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,2*pi,false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function(){

    // update position
    if(this.x + this.r > innerWidth || this.x - this.r < 0)
      this.dx = -this.dx;
    if(this.y + this.r > innerHeight || this.y - this.r < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;

    // update radius (interaction)
    if(Math.abs(mouse.x-this.x) < 50 && Math.abs(mouse.y-this.y) < 50)
      this.r = Math.min(maxRadius,this.r+1);
    else
      this.r = Math.max(this.minRadius,this.r-1);

  }
}

var circles = [];
var maxRadius = 50;
function init(){
  circles = [];
  var numberOfCircles = (innerWidth*innerHeight)/500;
  for (let i = 0; i < numberOfCircles; i++) {
    var x = Math.random()*(innerWidth - 2*r) + r;
    var y = Math.random()*(innerHeight - 2*r) + r;
    var r = Math.random()*4 + 1;
    var dx= (Math.random()-0.5)*4;
    var dy = (Math.random()-0.5)*4;
    circles.push(new Circle(x,y,r,dx,dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);

  circles.forEach(circle => {
    circle.draw();
    circle.update();
  });

}

init();
animate();
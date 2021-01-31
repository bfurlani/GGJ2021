var context, controller, sprite, loop;
var count = 1;
var random = Math.round(Math.random() * 10);
var hasInit = false;
var blocks = [];


context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 900;
context.canvas.width = 1650;
context.fillRect(100,100,100,100);

block = {
    width:150,
    height:50,
    x_pos:RandInt(1550),
    y_pos:RandInt(850),
    color:"#003F5F"
}

sprite = {

  height:100,
  jumping:true,
  width:100,
  x:400, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        count++
        if(count > 7){
          count = 2
        }
        controller.left = key_state;
      
      break;
      case 38:// up key
      count++;
              if(count > 8){
          count = 1
        }
        controller.up = key_state;
      break;
      case 39:// right key
                    count++
        if(count > 7){
          count = 1
        }
        controller.right = key_state;
      break;

    }

  }

};

CreateBlocks();

loop = function() {
    var img = new Image();
  img.src = `./assets/png/Run (${count}).png`;
  if (controller.up && sprite.jumping == false) {
      var img = new Image();
  img.src = `./assets/png/Jump (${count -1}).png`;
    sprite.y_velocity -= 20;
    sprite.jumping = true;

  }

  if (controller.left) {
  var img = new Image();
  img.src = `./assets/png/running_flipped/Run (${count}).png`;
  sprite.x_velocity -= 0.5;

  }

  if (controller.right) {
  var img = new Image();
  img.src = `./assets/png/Run (${count}).png`;
  sprite.x_velocity += 0.5;

  }

  sprite.y_velocity += 1.5;// gravity
  sprite.x += sprite.x_velocity;
  sprite.y += sprite.y_velocity;
  sprite.x_velocity *= 0.9;// friction
  sprite.y_velocity *= 0.9;// friction

  // if sprite is falling below floor line
  if (sprite.y > 900 - 100) {

    sprite.jumping = false;
    sprite.y = 900 - 100;
    sprite.y_velocity = 0;

  }

  // if sprite is going off the left of the screen
  if (sprite.x < -100) {

    sprite.x = 800;

  } else if (sprite.x > 1650) {// if sprite goes past right boundary

    sprite.x = -100;

  }

  context.fillStyle = "#6EB8C1";
  context.fillRect(0, 0, 1650, 900);// x, y, width, height
  context.beginPath();
  context.drawImage(img ,sprite.x, sprite.y, sprite.width, sprite.height);
  context.beginPath();
  context.rect(900, 850, 150, 50);
  context.stroke();
  context.fillStyle = "#003F5F";
  context.fill();
  DrawBlocks(context);

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

function RandInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function CreateBlocks(){
    var x_max = 1550;
    var y_max = 850;

    for (let i = 0; i < random; i++){
        blocks.push([RandInt(x_max), RandInt(y_max)])
    }
}

function DrawBlocks(ctx){

    blocks.map((set) => {
        x = set[0]
        y = set[1]

        ctx.beginPath();
        ctx.rect(x, y, 150, 50);
        ctx.stroke();
        ctx.fillStyle = "#003F5F";
        ctx.fill();
        
    })
    

}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);


/*
let gravity = 9.8
let down = false;
let count = 0;
let onSurface = true;
let currentlyJumping = false;
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 68) {
    let elm = document.getElementById("sprite");
    down = true;
    count++;
    count++;
    elm.src = `./assets/png/Run (${count / 2}).png`;
    elm.style.transform = "scaleX(1)";
    let x = elm.offsetLeft;
    moveRight(x);
    if (count > 14) {
      count = 0;
    }
  }
  if (e.keyCode === 65) {
    let elm = document.getElementById("sprite");
    elm.style.transform = "scaleX(-1)";
    down = true;
    count++;
    count++;
    elm.src = `./assets/png/Run (${count / 2}).png`;
    let x = elm.offsetLeft;
    moveLeft(x);
    if (count > 14) {
      count = 0;
    }
  }

  if (e.keyCode == 32){
    let elm = document.getElementById("sprite");
    elm.style.transform  = "scaleY(-1)";
    down = true;
    count += 2;
    elm.src = `./assets/png/Jump (${count / 2}).png`;
    let y = elm.offsetTop;
    jump(y)
    if (count > 12){
      count = 0
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 68) {
    down = false;
    let elm = document.getElementById("sprite");
    elm.src = "./assets/png/Idle (1).png";
    elm.style.transform = "scaleX(1)";
  }
  if (e.keyCode == 65) {
    let elm = document.getElementById("sprite");
    elm.src = "./assets/png/Idle (1).png";
    elm.style.transform = "scaleX(-1)";
  }
});

function moveRight(x) {
  let elm = document.getElementById("sprite");
  let newOffset = x + 20;
  elm.style.left = newOffset + "px";
  //alert(x);
}

function moveLeft(x) {
  let elm = document.getElementById("sprite");
  let newOffset = x - 20;
  elm.style.left = newOffset + "px";
  //alert(x);
}

function jump(x) {
  if (onSurface == true) {
    let elm = document.getElementById("sprite");
    let jumpOffset = x - 3;
    elm.style.transform = `translateY(${jumpOffset}px)`;
    onSurface = false;
    while (onSurface === false) {
      jumpOffset = jumpOffset + 9.8;
      elm.style.transform = `translateY(${jumpOffset}px)`;
      if (jumpOffset > 100) {
        onSurface = true;
        currentlyJumping = false;
      }
    }
  } else {
    return;
  }
}
*/
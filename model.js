var context, controller, sprite, loop, correctNPC;
var count = 1;
var random = RandInt(30);
var hasInit = false;
var blocks = [];
var npcs = ["./assets/png/npcs (skin_hair_overalls_hat)/blue_green.png", "./assets/png/npcs (skin_hair_overalls_hat)/blue_blue.png", "./assets/png/npcs (skin_hair_overalls_hat)/red_red.png", "./assets/png/npcs (skin_hair_overalls_hat)/yellow_red.png", "./assets/png/npcs (skin_hair_overalls_hat)/yellow_yellow.png"]
var lostItems = ["wallet", "watch", "100 dollar bill", "necklace", "purse"]
var lostItem = lostItems[RandInt(lostItems.length)];
var dialog = "Help! I lost a " + lostItem + "! I heard you found it, can I have it back please?\n\nSearch the map for clues to return the " + lostItem + " to the correct owner. Once you're sure who the owner is, just click on their respective button to give them their " + lostItem +".";
var collided_right = false;
var collided_left = false;
var collided_top = false;
var collided_bottom = false;


context = document.querySelector("canvas").getContext("2d");
var max_height = 900;
var max_width = 1650;
context.canvas.height = max_height;
context.canvas.width = max_width;
context.fillRect(100,100,100,100);
//window.scrollBy(0,0);

block = {
    width:150,
    height:50,
    x_pos:RandInt(1550),
    y_pos:RandInt(850),
    color:"#003F5F"
}

npcSprites = {
  height:100,
  width:300,
  x:50,
  y:812
}

sprite = {

  height:100,
  jumping:true,
  width:100,
  x:400, // center of the canvas
  x_velocity:0,
  y:812,
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
        //window.scrollTo(sprite.x,0);
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
        //window.scrollTo(sprite.x,0);
        controller.right = key_state;
      break;

    }

  }

};

CreateBlocks();

randNPC1 = RandInt(npcs.length)
randNPC2 = RandInt(npcs.length)
randNPC3 = RandInt(npcs.length)

// npc order on screen will always be 1-3, left-right

correctNPC = RandInt(3)

alert("Winner is NPC " + correctNPC)

while (randNPC2 == randNPC1){
  randNPC2 = RandInt(npcs.length)
}

while (randNPC3 == randNPC1 || randNPC3 == randNPC2){
  randNPC3 = RandInt(npcs.length)
}

alert(dialog)

loop = function() {
    var img = new Image();
  img.src = `./assets/png/Run (${count}).png`;

  var npcImg1 = new Image();
  npcImg1.src = npcs[randNPC1];
  var npcImg2 = new Image();
  npcImg2.src = npcs[randNPC2];
  var npcImg3 = new Image();
  npcImg3.src = npcs[randNPC3];
  if (controller.up && sprite.jumping == false) {
      //var img = new Image();
  //img.src = `./assets/png/Jump (${count -1}).png`;
    sprite.y_velocity -= 40;
    sprite.jumping = true;

  }

  if (controller.left) {
    if (!collided_right){
        var img = new Image();
        img.src = `./assets/png/running_flipped/Run (${count}).png`;
        sprite.x_velocity -= 0.5;
    }

  }

  if (controller.right) {
      if (!collided_left){
        var img = new Image();
        img.src = `./assets/png/Run (${count}).png`;
        sprite.x_velocity += 0.5;
      }

  }

  sprite.y_velocity += 1.5;// gravity
  sprite.x += sprite.x_velocity;
  sprite.y += sprite.y_velocity;
  sprite.x_velocity *= 0.9;// friction
  sprite.y_velocity *= 0.9;// friction

  // if sprite is falling below floor line
  if (sprite.y > max_height - 100) {

    sprite.jumping = false;
    sprite.y = 900 - 88;
    sprite.y_velocity = 0;

  }

  // if sprite is going off the left of the screen
  if (sprite.x < -100) {
    
    sprite.x = max_width-100;



  } else if (sprite.x > max_width-50) {// if sprite goes past right boundary
    
    sprite.x = -100;

  }

  for (set in blocks){
      if ((sprite.x + 25 >= blocks[set][0] && sprite.x + 25 <= blocks[set][0] + 150 && sprite.y + 10 >= blocks[set][1] && sprite.y + 10 <= blocks[set][1] + 50) || 
            (sprite.x + 25 >= blocks[set][0] && sprite.x + 25 <= blocks[set][0] + 150 && sprite.y + 90 >= blocks[set][1] && sprite.y + 90 <= blocks[set][1] + 50) || 
            (sprite.x + 25 >= blocks[set][0] && sprite.x + 25 <= blocks[set][0] + 150 && sprite.y + 50 >= blocks[set][1] && sprite.y + 50 <= blocks[set][1] + 50)){
          // collide from right
          if (sprite.y + 50 < blocks[set][1]){
              sprite.y_velocity = 0;
              sprite.y = blocks[set][1] - 100;
              sprite.jumping = false;
          } else if (sprite.y + 25 > blocks[set][1]){
              sprite.y_velocity = 0;
              sprite.y = blocks[set][1] + 50;
          } else {
              sprite.x_velocity = 0;
              sprite.x = blocks[set][0] + 120;
          }
      }

      if ((sprite.x + 75 >= blocks[set][0] && sprite.x + 75 <= blocks[set][0] + 150 && sprite.y + 20 >= blocks[set][1] && sprite.y + 20 <= blocks[set][1] + 50) || 
            (sprite.x + 75 >= blocks[set][0] && sprite.x + 75 <= blocks[set][0] + 150 && sprite.y + 100 >= blocks[set][1] && sprite.y + 100 <= blocks[set][1] + 50) || 
            (sprite.x + 75 >= blocks[set][0] && sprite.x + 75 <= blocks[set][0] + 150 && sprite.y + 50 >= blocks[set][1] && sprite.y + 50 <= blocks[set][1] + 50)){
          // collide from left
          if (sprite.y + 50 < blocks[set][1]){
              sprite.y_velocity = 0;
              sprite.y = blocks[set][1] - 90;
              sprite.jumping = false;
          } else if (sprite.y + 25 > blocks[set][1]){
              sprite.y_velocity = 0;
              sprite.y = blocks[set][1] + 50;
          } else {
              sprite.x_velocity = 0;
              sprite.x = blocks[set][0] - 80;
          }
      }

      /*
      if (sprite.x >= blocks[set][0] && sprite.x <= blocks[set][0] + 150 && sprite.y >= blocks[set][1] && sprite.y <= blocks[set][1] + 50){
          sprite.x_velocity = 0;
          sprite.y_velocity = 0;

          if (sprite.x > (blocks[set][0] + blocks[set][0] + 150) / 2){
            sprite.x = blocks[set][0] + 150;
          } else {
              sprite.x = blocks[set][0];
          }

          if (sprite.y > (blocks[set][1] + blocks[set][1] + 50) / 2){
            sprite.y = blocks[set][1] + 50;
          } else {
            sprite.x = blocks[set][0];
          }
      }
      */
        
  }

  // win condition

  context.fillStyle = "#6EB8C1";
  context.fillRect(0, 0, max_width, max_width);// x, y, width, height
  context.beginPath();
  context.drawImage(img ,sprite.x, sprite.y, sprite.width, sprite.height);

  //draw npcs
  context.beginPath();
  context.drawImage(npcImg1, npcSprites.x - 80, npcSprites.y, sprite.width, sprite.height);
  context.beginPath();
  context.drawImage(npcImg2, npcSprites.x - 15, npcSprites.y, sprite.width, sprite.height);
  context.beginPath();
  context.drawImage(npcImg3, npcSprites.x + 48, npcSprites.y, sprite.width, sprite.height);

  DrawBlocks(context);

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

function RandInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function CreateBlocks(){
    //var x_max = 1550;
    //var y_max = 850;

    for (let i = 0; i < random; i++){
      var x_rand = RandInt(max_width -50);
      var y_rand = RandInt(max_height -50);
     
        addBlockToList(x_rand,y_rand);

    }
 
}

function addBlockToList(x,y){
 if(!docheck(x,y))
 {
    blocks.push([x,y]);
  }else{
        x += 170;
        y += 70;
       addBlockToList(x,y);
  }
}

function docheck(x,y){
  var same  = false;
  blocks.forEach(element => {
      if(x === element[0] && y === element[1])
      {
       return true;
      }
  });
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

function CheckWinner(int){
  if (int == correctNPC){
    alert("Congrats! You win! The game will now reset!")
    location.reload();
  } else {
    alert("Sorry, that was not the correct person. You lose. The game will reset.")
    location.reload();
  }
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
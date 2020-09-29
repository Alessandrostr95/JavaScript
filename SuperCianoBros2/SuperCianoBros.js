const {
    Engine,
    World,
    Bodies,
    Body,
    Mouse,
    MouseConstraint
} = Matter;
let confini;
//let floor;
let SuperCiano;
let engine, world;
let vincoliMouse;

let walls = [];
let coins = [];

function setup() {
    const tela = createCanvas(600, 400);
    engine = Matter.Engine.create();
    //Matter.Engine.run(engine);
    world = engine.world;

    confini = {
        floor: new Box(world, width/2, height-10, width, 20, true),
        left: new Box(world, -10, height/2, 20, height, true),
        right: new Box(world, width+10, height/2, 20, height, true),
        top: new Box(world, width/2, -10, width, 20, true)
    };
    SuperCiano = new Character(world, 300, 275, 25);

    const mouse = Mouse.create(tela.elt);
    const options = {
      mouse: mouse
    };
  
    // A fix for HiDPI displays
    mouse.pixelRatio = pixelDensity();
    vincoliMouse = MouseConstraint.create(engine, options);
    World.add(world, vincoliMouse);


    walls[0] = new Box(world, 430, 300, 30, 30, true);
    walls[1] = new Box(world, 400, 300, 30, 30);


    for(let i = 0; i < 10; i++) {
        coins[i] = new Coin(floor(random(width)), floor(random(100, 350)));
    }
}

function draw() {
    background(150);
    Matter.Engine.update(engine);
    confini.floor.show();
    SuperCiano.show();
    SuperCiano.moove();

    for(wall of walls){
        wall.show();

        if(SuperCiano.onTop(wall)) {
            SuperCiano.status.isJumping = false;
            SuperCiano.status.isOnFloor = true;
        }
    }

    toRemove = [];
    for(let i = 0; i < coins.length; i++) {
        let coin = coins[i];
        coin.show();
        if(coin.collide(SuperCiano)){
            //Matter.World.remove(world, coin.body);
            //Matter.Composite.remove(world, coin.body)
            SuperCiano.score += coin.value;
            toRemove.push(i);
        }
    }
    for(i of toRemove){
        coins.splice(i,1);
    }

}


function keyPressed() {
    if(key === ' ' && !SuperCiano.status.isJumping) {
        //console.log('jump');
        SuperCiano.jump();
    }
}

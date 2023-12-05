class SnowDown{

    constructor(){
        this.x = random(width);
        this.y = -10;
        this.r = random(5,10);
        this.speed = random(1,4);
    }

    fall(){
        this.y += this.speed;// the snow move
    }

    draw(){
        fill(255,255,255,random(80,99));
        noStroke();
        ellipse(this.x,this.y,this.r,this.r);
    }
    outscreen(){
        return this.y>height +this.r;
    }
}

let snows = [];
let bg1,bd2,oldMan;//image
let manX; //make man move
let A = "Merry Christmas !";
let myFont;

function preload(){
    bg1 = loadImage("assets/bg1.jpg");
    oldMan = loadImage("assets/old man.png");
    bg2 = loadImage("assets/bg 2.jpg");
    myFont = loadFont("assets/new font .ttf")
}
function setup(){
    createCanvas(600,600);
    noStroke();
    imageMode(CENTER);
    manX = random(30,width-30); //oldman 随机出现
}

function draw(){
    image(bg1,width/2,height/2,width,height);
    image(oldMan,manX,560,60,80); 
    manX -= 1.5; 
    if(manX +300 <= 0){
        manX = 600;
    }
    fill(250,242,209);
    stroke(248,173,30);
    strokeWeight(4);
    textSize(50);
    textFont(myFont);
    textAlign(LEFT,CENTER);
    text(A,manX+60,560);


    let snowDown = new SnowDown();
    snows.push(snowDown);

    for(let i = snows.length-1;i>=0;i--){
        snows[i].fall();
        snows[i].draw();
    

     if(snows[i].outscreen()){
        snows.splice(i,1);
     }
    }

    image(bg2,width/2,height/2,500,400);//blackboard

    
}
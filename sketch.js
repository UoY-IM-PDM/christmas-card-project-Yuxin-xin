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
let manDirection = 1;

function preload(){
    bg1 = loadImage("assets/bg1.jpg");
    oldMan = loadImage("assets/old man.png");
    bg2 = loadImage("assets/bg 2.jpg");
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
    manX -= manDirection; 
    if(manX <= 30 || manX > width-30){
        manDirection *=-1;
    }
    
    

    let snowDown = new SnowDown();
    snows.push(snowDown);

    for(let i = snows.length-1;i>=0;i--){
        snows[i].fall();
        snows[i].draw();
    

     if(snows[i].outscreen()){
        snows.splice(i,1);
     }
    }

    image(bg2,width/2,height/2,500,400);


}
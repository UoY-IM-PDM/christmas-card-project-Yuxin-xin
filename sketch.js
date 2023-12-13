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
let W = "Draw you own Christmas tree !";
let wordX;
let myFont,mySound;
let penPicker,sizeSlider,clearButton;
// NEW: Added variables to save the brush strokes
let brushX = [];
let brushY = [];
let brushW = [];
let brushColour = [];

function preload(){
    bg1 = loadImage("assets/bg1.jpg");
    oldMan = loadImage("assets/old man.png");
    bg2 = loadImage("assets/bg 2.jpg");
    myFont = loadFont("assets/new font .ttf");
    
}
function setup(){
    createCanvas(600,600);
    imageMode(CENTER);
    manX = random(30,width-30); //oldman 随机出现
    wordX = random(50,width-50);

    clearButton = createButton("clear");//draw christmas tree
    penPicker = createColorPicker(0);
    sizeSlider = createSlider(5,50,20);

    const Container = select("main");

    clearButton.parent(Container);
    penPicker.parent(Container);
    sizeSlider.parent(Container);

    penPicker.position(70,490);
    
    sizeSlider.size(150,50)
    sizeSlider.position(250,480);

    clearButton.size(width/8,30)
    clearButton.position(480,490);
    clearButton.mousePressed(clearDrawing);
    noStroke();
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
    
    fill(250,242,209);
    stroke(248,173,30);
    strokeWeight(4);
    textSize(30);
    textFont(myFont);
    textAlign(LEFT,CENTER);
    text(W,wordX,75);
    wordX -= 1.5;
    if(wordX+200<=0){
        wordX = 600;
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
    
    //image(bg2,width/2,height/2,500,400);//blackboard
    fill(255);
    rectMode(CENTER);
    rect(width/2,height/2,500,400);
    if (mouseIsPressed) {
        if (mouseX > width/2 - 250/2 && mouseX < width/2 + 250/2 &&
            mouseY > height/2 - 400/2 && mouseY < height/2 + 400/2) {
            // EDITED: The circles are now drawn in the for loop after this if statement, using the new arrays
            // fill(penPicker.value());
            // circle(mouseX, mouseY, sizeSlider.value());
            // NEW: Save the details of the brush stroke to draw on the canvas
            brushX.push(mouseX);
            brushY.push(mouseY);
            brushW.push(sizeSlider.value());
            brushColour.push(penPicker.value());
        }
    }

    // NEW: Draw the saved brush strokes
    for (let i = 0; i < brushX.length; i++) {
        fill(brushColour[i]);
        circle(brushX[i], brushY[i], brushW[i]);
    }

}

/**
 * NEW: This function will clear the drawing by making the arrays empty
 */
function clearDrawing() {
    brushX = [];
    brushY = [];
    brushW = [];
    brushColour = [];
}
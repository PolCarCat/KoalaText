
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Setup

ctx.font = " 20px Arial";
ctx.textAlign = "center";


//Test Image
var bgTest = new Image();
bgTest.src = "bg1.png"


//INPUT________________________________________________


function handleMouseDown(event){

    
    for( var i = 0; i < nodes.length; i++){ 
        if (CheckCollsion(nodes[i], event.clientX, event.clientY) && CheckWord(nodes[i].text)) {
            console.log("Mouse down");
            nodes.splice(i, 1); 
        }
     }

}



cvs.onmousedown = handleMouseDown;

//NODES________________________________________________
var nodes = [];
//Node has bgImage, image, color, text, x, y

function CreateNode(_bgImage, _x, _y, _scale, _text){

    nodes.push({
        bgImage : _bgImage,
        x : _x,
        y : _y,
        scale : _scale,
        text : _text })

}

function CheckCollsion(node, x, y){
    var ret = 0;

    var imgX = node.x - (node.bgImage.width / 2);
    var imgY = node.y - (node.bgImage.height / 2);
    var imgW = node.bgImage.width;
    var imgH = node.bgImage.height;

    if (x > imgX && x <= imgX + imgW && y > imgY && y <= imgY + imgH )
    {
        ret = 1;
    }

    return ret;
}

function DeleteNode(node){

    for( var i = 0; i < nodes.length; i++){ 
        if ( nodes[i] === node) {

          nodes.splice(i, 1); 
        }
     }

}

function DrawNode(value){

    
    var x = value.x - (value.bgImage.width / 2);
    var y = value.y - (value.bgImage.height / 2);

    ctx.drawImage(value.bgImage, x , y );


    ctx.fillText(value.text, value.x, value.y);

    //console.log(value.bgImage);
}
//GAME_____________________________________________

var words;
var correctWords;
var wordIndex = 0;
var wordsNum = 0;
var bottomstring = "";


function CreateNodesfromSrting(string){
  
    correctWords = string.split(" ");

    wordsNum = correctWords.length;

    for (var i = 0; i < wordsNum; i++){
        CreateNode(bgTest, 200 * i + 100, 100, 1, correctWords[i]);
    }
}

function CheckWord(str){

    if (correctWords[wordIndex] === str){
        bottomstring += " " + str;
        wordIndex++;
        return true;
    }
    else {
        console.log("Wrong word");
    }

    return false;
}

function Main(){

    //Start

    //CreateNode(bgTest, 100, 100, 1, "Hello")
    //CreateNode(bgTest, 300, 100, 1, "Hi")
    //CreateNode(bgTest, 600, 100, 1, "Halo")

    CreateNodesfromSrting("Halo how are you");

    Update();
}

function PreUpdate(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Update(){

    PreUpdate();


    //Draw nodes
    nodes.forEach(DrawNode);
    

    //Draw bottomstring
    ctx.fillText(bottomstring, cvs.width/2, cvs.height * 7/8);


    requestAnimationFrame(Update);
}



Main();


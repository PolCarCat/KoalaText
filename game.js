
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

    ctx.fillRect(imgX, imgY, imgW, imgH);

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

//JSON_____________________________________________

var usedseneces = [];
var orderSentences = [];
var sentenceIndex = 0;
var maxSentences = 0;
var jsonData;

function ReadJson(){
    //var userdata = JSON.parse("data.json");
    //var user1_name = userdata[0];
    
    var request = new XMLHttpRequest();
    request.open("GET","data.json", false);
    request.send(null);
    jsonData = JSON.parse(request.responseText);

    maxSentences = jsonData.Sentences.length;


}



function OrderSentences(){
    for (var i = 0; i < maxSentences; i++){
        orderSentences[i] = i;
    }

    Shuffle(orderSentences);

}

function LoadSentence(){
    
    CreateNodesfromSrting(jsonData.Sentences[orderSentences[sentenceIndex]]);
    sentenceIndex++;

}

//GAME_____________________________________________

var correctWords;
var wordIndex = 0;
var wordsNum = 0;
var bottomstring = "";

var punctuation = 0;
var sum = 10;
var rest = 5;


function CreateNodesfromSrting(string){
  
    correctWords = string.split(" ");

    var shuffledwords = [...correctWords];

    Shuffle(shuffledwords);
    wordsNum = correctWords.length;

    for (var i = 0; i < wordsNum; i++){
        CreateNode(bgTest, 200 * i + 100, 100, 1, shuffledwords[i]);
    }


}

function Shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    
    return a;
}

function CheckWord(str){

    if (correctWords[wordIndex] === str){
        bottomstring += " " + str;
        wordIndex++;

        punctuation += sum;

        if (wordIndex == correctWords.length) Reset();
        return true;
    }
    else {
        punctuation -= rest;
        console.log("Wrong word");

    }

    return false;
}

function Reset(){
    
    wordIndex = 0;
    wordsNum = 0;
    correctWords = [];
    bottomstring = "";

    if ( sentenceIndex <= maxSentences - 1) LoadSentence();
    
}

//MAIN LOOP_____________________________________________

function Main(){

    //Start
    //CreateNodesfromSrting("Halo how are you");
    //Shuffle(nodes);
    
    ReadJson();
    OrderSentences();
    LoadSentence();

    Update();
}

function PreUpdate(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Update(){

    PreUpdate();


    //Draw nodes
    if (nodes) nodes.forEach(DrawNode);
 
    

    //Draw bottomstring
    ctx.fillText(bottomstring, cvs.width/2, cvs.height * 7/8);

    ctx.fillText("Puntuation:", cvs.width * 4/6, cvs.height * 7/8);
    ctx.fillText(punctuation, cvs.width * 4.5/6, cvs.height * 7/8);

    requestAnimationFrame(Update);
}



Main();


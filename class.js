var canvas = document.getElementById("field");
var clear = document.getElementById("clear");
var size = document.getElementById("size");
var type = document.getElementById("type");
var context = canvas.getContext("2d");
var type_filter = document.getElementById("type_filter");
var choose_color = document.getElementById("color");
var mouse = false;
var previous_x, previous_y, x, y, imgd, pix;

clear.onclick = function () {
    canvas.width = canvas.width;
};
canvas.onmousedown = function () {
    mouse = true;
};
canvas.onmouseup = function () {
    mouse = false;
    previous_x = undefined;
    previous_y = undefined;
};
function getCoordinates(e){
    x = e.offsetX;
    y = e.offsetY;
}
function make_filter(){
    var img = context.getImageData(0, 0, canvas.width, canvas.height);
    var picture=img.data;
    switch(type_filter.value) {
        case "black_white": {
            for (var i = 0; i < picture.length; i += 4) {
                var grey = 0.3*picture[i] + 0.59*picture[i + 1] + 0.11*picture[i + 2];
                picture[i] = picture[i + 1] = picture[i + 2] = grey;
            }
            break;
        }
        case "negative": {
            for (var i = 0; i < picture.length; i += 4) {
                picture[i] = 255 - picture[i];
                picture[i + 1] = 255 - picture[i + 1];
                picture[i + 2] = 255 - picture[i + 2];
            }
            break;
        }
    }
    context.putImageData(img, 0, 0);
}
function drawSquare(x, y, size){
    context.fillRect(x-size/2, y-size/2, size, size);
}
function drawEmptySquare(x, y, size){
    context.strokeRect(x-size/2, y-size/2, size, size);
}
function drawCircle(x, y, radius){
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function drawEmptyCircle(x, y, radius){
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, false);
    context.closePath();
    context.stroke();
}

function drawStar(cx,cy,outerRadius){
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/5;
    var innerRadius = outerRadius/3;
    context.beginPath();
    context.moveTo(cx,cy-outerRadius)
    for(i=0;i<5;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        context.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        context.lineTo(x,y)
        rot+=step
    }
    context.lineTo(cx,cy-outerRadius);
    context.closePath();
    context.stroke();
}


function draw(){
    var color = choose_color.value;
    context.fillStyle = color;
    context.strokeStyle = color;
    /*context.beginPath();
    if(previous_x) {
        context.moveTo(previous_x, previous_y);
        context.lineTo(x, y);
        context.stroke();
    }
    previous_x = x;
    previous_y = y;*/
    switch(type.value){
        case "square": {
            drawSquare(x, y, size.value);
            break;
        }
        case "empty_square": {
            drawEmptySquare(x, y, size.value);
            break;
        }
        case "circle": {
            drawCircle(x, y, size.value/2);
            break;
        }
        case "empty_circle": {
            drawEmptyCircle(x, y, size.value/2);
            break;
        }
        case "star":{
            drawStar(x, y, size.value/2);
        }
    }
}
canvas.onmousemove = function (e) {
    if(mouse) {
        getCoordinates(e);
        draw();
    }
};
canvas.onclick = function (e){
    getCoordinates(e);
   draw();
};

function saveTextAsFile()
{
    var imgd = context.getImageData(0, 0, canvas.width, canvas.height);
    var textToWrite = imgd.data.join(" ");
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function loadFileAsText()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var dataFromFile = textFromFileLoaded.split(" ");
        var img = context.createImageData(canvas.width, canvas.height);
        //alert(textFromFileLoaded);
        img.data.set(dataFromFile);
        context.putImageData(img, 0, 0);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}


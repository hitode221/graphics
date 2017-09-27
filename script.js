/**
 * Created by admin on 24.09.2017.
 */
var canvas = document.getElementById("area");
var context = canvas.getContext("2d");
var button = document.getElementById("go");
var text = document.getElementById("text");
var img = new Image();
img.crossOrigin = '';
img.src = 'https://pp.userapi.com/c837320/v837320078/53fb8/DWF8tNEEw5k.jpg';
img.onload = function(){
    context.drawImage(img, 0, 0, 500, 500);
};

button.onclick = function () {
    var image = context.getImageData(0, 0, 500, 500);
    var img = context.createImageData(500, 500);
    img.data.set(arrayToData(Sobel(dataToArray(image.data))));
    context.putImageData(img, 500, 0);
};

function dataToArray(data) {
    var array = new Array(500);
    var index = 0;
    for (var i = 0; i < 500; i++){
        array[i] = new Array(500);
        for (var j = 0; j < 500; j++) {
            array[i][j] = data[index] + data[index + 1] + data[index + 2];
            index += 4;
        }
    }
    return array;
}

function arrayToData(array) {
    var data = new Array(500 * 500 * 4);
    var index = 0;
    for (var i = 0; i < 500; i++) {
        for (var j = 0; j < 500; j++) {
            data[index] = data[index + 1] = data[index + 2] = 255-array[i][j];
            data[index+3] = 255;
            index += 4;
        }
    }
    return data;
}
function Sobel(array){
    var gradient = new Array(500);
    gradient[0] = new Array(500);
    for (var j = 0; j <500; j++) gradient[0][j] = 0;
    for(var i = 1; i < array.length-1; i++) {
        gradient[i] = new Array(500);
        gradient[i][0] = 0;
        gradient[i][499] = 0;
        for (var j = 1; j < array[i].length - 1; j++) {
            var z1 = array[i - 1][j - 1];
            var z2 = array[i - 1][j];
            var z3 = array[i - 1][j + 1];
            var z4 = array[i][j - 1];
            var z5 = array[i][j];
            var z6 = array[i][j + 1];
            var z7 = array[i + 1][j - 1];
            var z8 = array[i + 1][j];
            var z9 = array[i + 1][j + 1];
            var gx = (z7 + 2 * z8 + z9) - (z1 + 2 * z2 + z3);
            var gy = (z3 + 2 * z6 + z9) - (z1 + 2 * z4 + z7);
            var f = Math.floor(Math.sqrt(gx * gx + gy * gy));
            gradient[i][j] = f;
        }
    }
    gradient[499] = new Array(500);
    for (var j = 0; j <500; j++) gradient[499][j] = 0;
    return gradient;
}
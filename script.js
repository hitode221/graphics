/**
 * Created by admin on 12.09.2017.
 */
var canvas = document.getElementById("area");
var context = canvas.getContext("2d");
var length = 101;
var array = new Array(length);
for(var i = 0; i < length; i++){
    array[i] = new Array(length);
    for (var j = 0; j < length; j++){
        array[i][j] = 0;
    }
}
function draw(array){
    for(var i = 0; i < array.length; i++){
        for (var j = 0; j < array[i].length; j++){
            if (array[i][j]){
                context.fillRect(i, j, 1, 1);
            }
        }
    }
}
function test() {
    for(var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++) {
            if(i == j) array[i][j] = 1;
        }
    }
}
function createPicture(array)
{
    var size = 1, shift = 10, max_size = 51;
    var flag = true;
    for (i = shift; i < length; i++){
        var enter = shift + (length - shift - size)/2;
        for(var j = enter; j < enter+size; j++){
            if(j == enter+1 || j == enter+size-2) array[i][j]=0;
            else array[i][j] = 1;
        }
        if (size == max_size) flag = false;
        if (flag) size+=2;
        else size -= 2;
        if (size <= 0) break;
    }
}
createPicture(array);
draw(array);

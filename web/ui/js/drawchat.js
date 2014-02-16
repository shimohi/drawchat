/**
 * Created by masashi on 14/02/16.
 */

var allnight;
//プロパティがなかったら追加する。
//すでにある場合はオブジェクトかどうか判断して例外発生させた方がいいらしい
if (!allnight) allnight = {};
if (!allnight.creathon) allnight.creathon = {};
if (!allnight.creathon.drawchat) allnight.creathon.drawchat = {};

(function() {

    var drawCanvas;
    var points = [];
    var pointsSet = [];
    var canvasId = 'canvassample';
    var template;


    $(window).on('load', function(){


        var canvas = document.getElementById(canvasId);
        drawCanvas = canvas.getContext('2d');
        drawCanvas.lineWidth = 3;
        document.getElementById(canvasId).addEventListener('touchmove', addDrawPointByTouch, false);
        document.getElementById(canvasId).addEventListener('mousemove', addDrawPointByMouse, false);


    });

    function addDrawPointByMouse(event){

        if(event.which == 0){
            pointsSet.push(points);
            points = [];
            return;
        }

        var x = event.clientX ;
        var y = event.clientY ;
        var rect = event.target.getBoundingClientRect();

        x -= rect.left ;
        y -= rect.top ;

        points.push({x:x,y:y});
        draw(points);
    }

    function refreshThread(){

        var len = drawDatas.length;
        for(var i=0;i<len;i++){
            $('#containers').append(template(drawData[i]));

        }

    }

    function addDrawPointByTouch(event){

        //タッチ数が1以外の場合は処理しない。
        if(event == null || event.length != 0){
            return;
        }

        var touchEvent = event.touches[0];
        points.push({x:touchEvent.pageX,y:touchEvent.pageY});
        draw(points);
    }

    function draw(pointDatas){

//        drawCanvas.clearRect(0,0,140,140);
        drawCanvas.beginPath();

        var len = pointDatas.length;
        for(var i=0;i<len;i++){
            if(i==0){
                drawCanvas.moveTo(pointDatas[i].x,pointDatas[i].y);
                continue;
            }
            drawCanvas.lineTo(pointDatas[i].x,pointDatas[i].y);
        }

        drawCanvas.lineCap     = "round";
        drawCanvas.lineJoin    = "round";
        drawCanvas.stroke();
    }

})();


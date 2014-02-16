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

    var drawDatas = [
        {
            "userName":"aaa",
            "drawData":"[[20,80],[40,289],[378,271]]",
            "updateDate":"2010/10/01"
        },
        {
            "userName":"aaa",
            "drawData":"[[320,180],[40,289],[378,271]]",
            "updateDate":"2010/10/02"
        },
        {
            "userName":"aaa",
            "drawData":"[[120,280],[40,189],[78,271]]",
            "updateDate":"2010/10/03"
        }
    ];

    //var drawCanvas;
    var points = [];
    var pointsSet = [];
    var canvasId = 'canvassample';
    var template;


    $(window).on('load', function(){


//        var canvas = document.getElementById(canvasId);
//        drawCanvas = canvas.getContext('2d');
//        drawCanvas.lineWidth = 3;
//        document.getElementById(canvasId).addEventListener('touchmove', addDrawPointByTouch, false);
//        document.getElementById(canvasId).addEventListener('mousemove', addDrawPointByMouse, false);

        template = Handlebars.compile($('#input').html());

        refreshThread();
//        $('#output').append(template(drawDatas));

    });
//
//    function addDrawPointByMouse(event){
//
//        if(event.which == 0){
//            pointsSet.push(points);
//            points = [];
//            return;
//        }
//
//        var x = event.clientX ;
//        var y = event.clientY ;
//        var rect = event.target.getBoundingClientRect();
//
//        x -= rect.left ;
//        y -= rect.top ;
//
//        points.push({x:x,y:y});
//        draw(points);
//    }

    function refreshThread(){

        var len = drawDatas.length;
        for(var i=0;i<len;i++){

            var container = $('#output').append(template(drawDatas[i]));

            var canvasJ = container.find('.threadCanvas');
            if(canvasJ.length == 0){
                continue;
            }

            var canvas = canvasJ[i];
            var drawCanvas = canvas.getContext('2d');
            drawCanvas.lineWidth = 3;

            var data = drawDatas[i].drawData;
            var json = JSON.parse(data);
            draw(drawCanvas,json);
        }
    }

//    function addDrawPointByTouch(event){
//
//        //タッチ数が1以外の場合は処理しない。
//        if(event == null || event.length != 0){
//            return;
//        }
//
//        var touchEvent = event.touches[0];
//        points.push({x:touchEvent.pageX,y:touchEvent.pageY});
//        draw(points);
//    }

    function draw(drawCanvas,pointDatas){

//        drawCanvas.clearRect(0,0,140,140);
        drawCanvas.beginPath();

        var len = pointDatas.length;
        for(var i=0;i<len;i++){
            if(i==0){
                drawCanvas.moveTo(pointDatas[i][0],pointDatas[i][1]);
                continue;
            }
            drawCanvas.lineTo(pointDatas[i][0],pointDatas[i][1]);
        }

        drawCanvas.lineCap     = "round";
        drawCanvas.lineJoin    = "round";
        drawCanvas.stroke();
    }

})();


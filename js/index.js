var size = 64;
var box = $("#box")[0];
var height, width;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
box.appendChild(canvas);
var Dots = [];
draw.type = "column";
window.onresize = resize;
var line;
resize();


clickMusic();
changeStyle();

var mv = new musicVisualizer({
    size: size,
    visualizer: draw
});





function clickMusic() {
    var lis = $(".music li");
    lis.click(function() {
        var i = $(this).index();
        lis.css('color', 'white');
        lis.eq(i).css('color', 'grey');
        mv.play('./musics/' + lis.eq(i).html());
        //mv.play("http://music.163.com/song/media/outer/url?id=33682747.mp3");
        //mv.play("http://sc1.111ttt.cn:8282/2018/1/03m/13/396131227447.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3");
    });
}



function random(m, n) {
    return Math.round(Math.random() * (n - m) + m);
}

function getDots() {
    Dots = [];
    for (var i = 0; i < size; i++) {
        var x = random(0, width);
        var y = random(0, height);
        var color = "rgba(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ",0)";
        Dots.push({
            x: x,
            y: y,
            color: color,
            cap: 0,
            dx: random(1, 4)
        });
    };
}


function resize() {
    height = box.clientHeight;
    width = box.clientWidth;
    canvas.height = height;
    canvas.width = width;
    line = ctx.createLinearGradient(0, 0, 0, height);
    line.addColorStop(0, "pink");
    line.addColorStop(0.5, "grey");
    line.addColorStop(1, "lightblue");
    getDots();
}


function draw(arr) {
    ctx.clearRect(0, 0, width, height);
    var w = width / size;
    var cw = w * 0.6;
    var ch = cw;
    ctx.fillStyle = line;
    for (var i = 0; i < size; i++) {
        var o = Dots[i];
        if (draw.type == "column") {
            var h = arr[i] / 256 * height;
            ctx.fillRect(w * i, height - h, cw, h);
            ctx.fillRect(w * i, height - (o.cap + ch), cw, ch);
            o.cap--;
            if (o.cap < 0) {
                o.cap = 0;
            }
            if (h > 0 && o.cap < h + 30) {
                o.cap = h + 30 > height - ch ? height - ch : h + 30;
            }
        } else if (draw.type == "dot") {
            ctx.beginPath();
            var r = 10 + arr[i] / 256 * (height > width ? width : height) / 10;
            ctx.arc(o.x, o.y, r, 0, Math.PI * 2, true);
            var circle = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
            circle.addColorStop(0, "white");
            circle.addColorStop(1, o.color);
            ctx.fillStyle = circle;
            ctx.fill();
            o.x += o.dx;
            o.x = o.x > width ? 0 : o.x;
        }
    }
}


function changeStyle() {
    var spans = $(".musicList span");
    spans.click(function() {
        var i = $(this).index();
        spans.removeClass('selected')
            .eq(i).addClass('selected');
        draw.type = spans.eq(i).attr('type');
    });
}
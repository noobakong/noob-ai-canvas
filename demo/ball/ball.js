var drawing = document.getElementById("myCanvas"),
      context = drawing.getContext("2d"),
      vpx = drawing.width / 2,
      vpy = drawing.height / 2,
      Radius = 150,
      balls = [],
      angleX = Math.PI / 100,
      angleY = Math.PI / 100;
  window.addEventListener("mousemove", function(event) {
    var x = event.clientX - drawing.offsetLeft - vpx - document.body.scrollLeft - document.documentElement.scrollLeft;
    var y = event.clientY - drawing.offsetTop - vpy - document.body.scrollTop - document.documentElement.scrollTop;
    angleY = -x * 0.0001;
    angleX = -y * 0.0001;
  });
  var Animation = function() {
    this.init();
  };
  Animation.prototype = {
    isrunning: false,
    init: function() {
      balls = [];
      var num = 500;
      for (var i = 0; i <= num; i++) {
        var k = -1 + (2 * (i + 1) - 1) / num;
        var a = Math.acos(k);
        var b = a * Math.sqrt(num * Math.PI);
        var x = Radius * Math.sin(a) * Math.cos(b);
        var y = Radius * Math.sin(a) * Math.sin(b);
        var z = Radius * Math.cos(a);
        var b = new ball(x, y, z, 1.5);
        balls.push(b);
        b.paint();
      }
    },
    start: function() {
      this.isrunning = true;
      animate();
    },
    stop: function() {
      this.isrunning = false;
    }
  }
  function animate() {
    context.clearRect(0, 0, drawing.width, drawing.height);
    rotateX();
    rotateY();
    balls.sort(function(a, b) {
      return b.z - a.z;
    })
    for (var i = 0; i < balls.length; i++) {
      balls[i].paint();
    }
    if (ball.isrunning) {
      if ("requestAnimationFrame" in window) {
        requestAnimationFrame(animate);
      }
      else if ("webkitRequestAnimationFrame" in window) {
        webkitRequestAnimationFrame(animate);
      }
      else if ("msRequestAnimationFrame" in window) {
        msRequestAnimationFrame(animate);
      }
      else if ("mozRequestAnimationFrame" in window) {
        mozRequestAnimationFrame(animate);
      }
    }
  }
  function rotateX() {
    var cos = Math.cos(angleX);
    var sin = Math.sin(angleX);
    for (var i = 0; i < balls.length; i++) {
      var y1 = balls[i].y * cos - balls[i].z * sin;
      var z1 = balls[i].z * cos + balls[i].y * sin;
      balls[i].y = y1;
      balls[i].z = z1;
    }
  }
  function rotateY() {
    var cos = Math.cos(angleY);
    var sin = Math.sin(angleY);
    for (var i = 0; i < balls.length; i++) {
      var x1 = balls[i].x * cos - balls[i].z * sin;
      var z1 = balls[i].z * cos + balls[i].x * sin;
      balls[i].x = x1;
      balls[i].z = z1;
    }
  }
  var ball = function(x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.width = 2 * r;
  }
  ball.prototype = {
    paint: function() {
      var fl = 450 //焦距
      context.save();
      context.beginPath();
      var scale = fl / (fl - this.z);
      var alpha = (this.z + Radius) / (2 * Radius);
      context.arc(vpx + this.x, vpy + this.y, this.r * scale, 0, 2 * Math.PI, true);
      context.fillStyle = "rgba(0,0,0," + (alpha + 0.5) + ")"
      context.fill();
      context.restore();
    }
  }
    var ball = new Animation();
    ball.start();


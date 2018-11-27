$('.audio-start').on('click', function () {
  $(this).attr("disabled", true)
  $('.audio-sotp').removeAttr("disabled");
})
$('.audio-sotp').on('click', function () {
  $(this).attr("disabled", true)
  $('.audio-start').removeAttr("disabled");
})
// $('.shibie').on('click', function() {
//   $.ajax({
//     url: "/shibie",
//     type: "get",
//     success: function (res) {
      
//       console.log(res.result[0])
//       draw_text = res.result[0]
//       typing()
//       // 如果语句检测存在 且包含 个 和 形 字
//       if (draw_text.length && draw_text.search("个") && draw_text.search("形") ) {
//         // 形状
//         draw_obj.shape = draw_text.match(/个(\S*)形/)[1];

//         //存在 "的" 修饰 
//         if (draw_text.search("的") > -1) {
//           draw_obj.shape = draw_text.match(/的(\S*)形/)[1];
//         }
//         console.log(draw_obj)
//         i = 0
//       }
//     },
//     error: function (res) {
//       alert("对不起！数据加载失败！");
//     }
//   })
// })


// 在()号位置，画一个圆形，  半径为二百 ok ok

// 在()号位置，画一个三角形，底长为二百，高度为三百 ok
// 在()号位置，画一个长方形，长度为二百，宽度为三百 ok
 
// 在()号位置，画一个正方形，边长为二百 ok
// 在()号位置，画一个菱形　，边长为二百 ok
// 在()号位置，画一个五边形，边长为二百 ok
// 在()号位置，画一个正方体，边长为二百 ok
// 在()号位置，画一个球体，  边长为二百 ok
function shibie (numId) {
  $.ajax({
    url: "/shibie",
    type: "get",
    success: function (res) {
      // 展示识别内容
      console.log(res.result[0])
      draw_text = res.result[0]
      typing()

        // 如果语句检测存在 且包含 个 和 形 字
      if (draw_text.length && draw_text.search("个") > -1 && draw_text.search("形")>-1) {
          var cnNum = ''
          // 提取形状
          // draw_obj.shape = draw_text.match(/([^个]+)$/)[1];
        draw_obj.shape = draw_text.match(/个(\S*形)/)[1];

          // 圆
          if (draw_obj.shape == "圆形") {
            if (draw_text.search("为") > -1) {
              cnNum = draw_text.match(/([^为]+)$/)[1];
              cnNum = cnNum.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, ""); 
              console.log(cnNum)
              draw_obj.query = [ChineseToNumber(cnNum)]
            }
          }

          // 三角
        if (draw_obj.shape == "三角形") {
            if (draw_text.search("为") > -1) {
              // 底长
              cnNum1 = draw_text.match(/为(\S*)高度/)[1];
              // 高度
              cnNum2 = draw_text.match(/([^为]+)$/)[1];
              cnNum1 = cnNum1.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
              cnNum2 = cnNum2.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
              // console.log(cnNum)
              draw_obj.query = [ChineseToNumber(cnNum1), ChineseToNumber(cnNum2)]
            }
          }

          // 长方形
        if (draw_obj.shape == "长方形") {
            if (draw_text.search("为") > -1) {
              // 底长
              cnNum1 = draw_text.match(/为(\S*)宽度/)[1];
              // 高度
              cnNum2 = draw_text.match(/([^宽度为]+)$/)[1];
              console.log(cnNum1, cnNum2)
              cnNum1 = cnNum1.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
              cnNum2 = cnNum2.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
              // console.log(cnNum)
              draw_obj.query = [ChineseToNumber(cnNum1), ChineseToNumber(cnNum2)]
            }
          }

          // 正方形 菱形 多边形
        if (draw_obj.shape == "正方形" || draw_obj.shape == "菱形" || draw_obj.shape.search("边形") > -1) {
            if (draw_text.search("为") > -1) {
              cnNum = draw_text.match(/([^为]+)$/)[1]
              cnNum = cnNum.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
              console.log(cnNum)
              draw_obj.query = [ChineseToNumber(cnNum)]
            }
          }
          console.log(draw_obj)
          // i = 0
      }

      if (draw_text.length && draw_text.search("个") > -1 && draw_text.search("体") > -1) {
        var cnNum = ''
        // 提取形状
        // draw_obj.shape = draw_text.match(/([^个]+)$/)[1];
        draw_obj.shape = draw_text.match(/个(\S*体)/)[1];
        if (draw_text.search("为") > -1) {
          cnNum = draw_text.match(/([^为]+)$/)[1]
          cnNum = cnNum.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
          draw_obj.query = [ChineseToNumber(cnNum)]
        }
        console.log(draw_obj)
      }
      i=0
    },
    error: function (res) {
      alert("对不起！数据加载失败！");
    }
  })
}

// 打字效果
var draw_text = ''
var i = 0
function typing() {
  var divTyping = $('#shibie-content');
  if (i <= draw_text.length) {
    divTyping.text(draw_text.slice(0, i++) + '_');
    setTimeout(function () { typing() }, 200);
  } else {
    divTyping.text(draw_text)
  }
}

var draw_text = ''
var draw_obj = {
  shape: '',
  query: [],
  color: "#add8e6"
}


var drawing  = document.getElementById("myCanvas");
var context = drawing.getContext("2d");

function draw(draw_obj, jiyi) {
  if (!jiyi) {
    drawing.height = drawing.height
  }
    // 绘制红色矩形
  draw_obj.color = $('#tuxingcolor').val()
  if (draw_obj.shape == '正方形') {
    context.fillStyle = draw_obj.color
    let num1 = draw_obj.query[0] ? draw_obj.query[0] : 100
    // let num2 = draw_obj.query[1] ? draw_obj.query[1] : 100
    context.fillRect(10, 10, num1, num1);
    context.restore();//返回原始状态
  }

  if (draw_obj.shape == '三角形') {
    var dichang = draw_obj.query[0] ? draw_obj.query[0] : 200
    context.beginPath();
    // var height = dichang * Math.sin(Math.PI / 3);//计算等边三角形的高
    var height = draw_obj.query[1] ? draw_obj.query[1] : 200
    context.moveTo(dichang/2, 0); //从A（100,0）开始
    context.lineTo(0, height);//从A(100,0)开始，画到B (0,173)结束
    context.lineTo(dichang, height); //B(0,173)-C(200,173)
    //context.fillStyle='#00ff00';//以纯色绿色填充
    var grd = context.createLinearGradient(0, 0, dichang, 0);//使用渐变颜色填充,从(0,0)到(200,0) （左到右）
    grd.addColorStop(0, "#4CE8B2"); //起始颜色
    grd.addColorStop(1, "#EFD458"); //终点颜色
    context.fillStyle = grd; //以上面定义的渐变填充
    context.fill(); //闭合形状并且以填充方式绘制出来
  }

  if (draw_obj.shape == '菱形') {
    
    let num1 = draw_obj.query[0] ? draw_obj.query[0] : 100
    // let num2 = draw_obj.query[1] ? draw_obj.query[1] : 100
    // context.fillRect(10, 10, num1, num1);

    //Begin our drawing
    context.beginPath();
    context.moveTo(75, 0);
    context.lineTo(150, 100);
    context.lineTo(75, 200);
    context.lineTo(0, 100);

    //Define the style of the shape
    context.lineWidth = 1;
    context.fillStyle = draw_obj.color
    context.strokeStyle = draw_obj.color

    //Close the path
    context.closePath();

    //Fill the path with ourline and color
    context.fill();
    context.stroke();
    context.restore();//返回原始状态
  }

  if (draw_obj.shape == '长方形') {
    context.fillStyle = draw_obj.color
    let num1 = draw_obj.query[0] ? draw_obj.query[0] : 200
    let num2 = draw_obj.query[1] ? draw_obj.query[1] : 100
    context.fillRect(10, 10, num1, num2);
    context.restore();//返回原始状态
  }

  if (draw_obj.shape == '圆形') {
    context.fillStyle = draw_obj.color
    let num1 = draw_obj.query[0] ? draw_obj.query[0] : 100
    console.log(num1)
    // let num2 = draw_obj.query[1] ? draw_obj.query[1] : 100
    context.arc(200, 200, num1, 0, Math.PI * 2, true);
    context.stroke();
    context.fill()
    context.restore();//返回原始状态
  }

  if (draw_obj.shape.search("边形") > -1) {
    let cnNum = draw_obj.shape[0]
    let side = ChineseToNumber(cnNum)
    let l = draw_obj.query[0]  || 100
    var i, ang;
    ang = Math.PI * 2 / side //旋转的角度
    context.save();//保存状态
    context.fillStyle = 'rgba(255,0,0,.3)';//填充红色，半透明
    context.strokeStyle = 'hsl(120,50%,50%)';//填充绿色
    context.lineWidth = 1;//设置线宽
    context.translate(700, 350);//原点移到x,y处，即要画的多边形中心
    context.moveTo(0, -l);//据中心r距离处画点
    context.beginPath();
    for (i = 0; i < side; i++) {
      context.rotate(ang)//旋转
      context.lineTo(0, -l);//据中心r距离处连线
    }
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();//返回原始状态
  }
  if (draw_obj.shape == '球体') {
    drawBall()

  }
}
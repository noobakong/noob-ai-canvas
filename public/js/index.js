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


// 在()号位置，画一个圆形，  半径为二百 ok

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
              cnNum2 = draw_text.match(/([^为]+)$/)[1];
              cnNum1 = cnNum1.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
              cnNum2 = cnNum2.replace(/[\ |\~|\，|\。|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
              // console.log(cnNum)
              draw_obj.query = [ChineseToNumber(cnNum1), ChineseToNumber(cnNum2)]
            }
          }

          // 正方形 菱形 多边形
        if (draw_obj.shape == "正方形" || draw_obj.shape == "菱形" || draw_obj.shape.search("边形")) {
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

}




var drawing  = document.getElementById("myCanvas");
if (drawing.getContext) {
      var context = drawing.getContext("2d");

      // 绘制红色矩形
      context.fillStyle = "#ff0000";
      context.fillRect(10, 10, 50, 50);

      // 绘制半透明的蓝色矩形
      context.fillStyle = "rgba(0, 0, 255, .5)";
      context.fillRect(30, 30, 50, 50);
  }
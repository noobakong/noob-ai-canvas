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

function shibie (numId) {
  $.ajax({
    url: "/shibie",
    type: "get",
    success: function (res) {
      // 展示识别内容
      console.log(res.result[0])
      draw_text = res.result[0]
      typing()

      // numId 为 1 检测形状
      if (numId == 1) {
        // 如果语句检测存在 且包含 个 和 形 字
        if (draw_text.length && draw_text.search("个") && draw_text.search("形")) {
          // 形状
          draw_obj.shape = draw_text.match(/([^个]+)$/)[1];

          //存在 "的" 修饰 
          if (draw_text.search("的") > -1) {
            draw_obj.shape = draw_text.match(/([^的]+)$/)[1];
          }
          console.log(draw_obj)
          i = 0
        }
      }
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
    divTyping.text(draw_text);
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
const express = require('express')
var fs = require('fs')
var AipSpeechClient = require("./src/index").speech;
var app = express()

// 设置APPID/AK/SK
var APP_ID = "14920356";
var API_KEY = "tiBU98ODokEWBaVzwK0dr9wS";
var SECRET_KEY = "Qhd75eNyr8PZSoI7f3aT0NiFv0IgEfwD";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
app.engine('html', require('express-art-template'))
app.use('/views/', express.static('views'))
app.use('/public/', express.static('public'))
app.use('/node_modules/', express.static('node_modules'))
app.use('/demo/', express.static('demo'))

var obj = {
	name: 1
}

app.get('/', function (req, res) {
	res.render('index.html')
})

app.get('/shibie', function (req, res) {
	// res.render('index.html', obj)
	res.json(obj)
})


app.post('/upload', function (req, res) {
	var chunks = [];
	var size = 0;
	req.on("data", function (chunk) {
		chunks.push(chunk);
		size += chunk.length;
	});
	req.on('end', () => {
		var buffer = Buffer.concat(chunks, size);
		if (!size) {
			res.writeHead(404);
			res.end('');
			return;
		}
		var rems = [];
		//根据\r\n分离数据和报头
		for (var i = 0; i < buffer.length; i++) {
			var v = buffer[i];
			var v2 = buffer[i + 1];
			if (v == 13 && v2 == 10) {
				rems.push(i);
			}
		}


		var nbuf = buffer.slice(rems[3] + 2, rems[rems.length - 2]);
		fs.writeFileSync('./a.wav', nbuf)
		let voice1 = fs.readFileSync('./a.wav')
		let voiceBuffer1 = new Buffer(voice1);
			// 识别本地文件 amr 格式
			client.recognize(voiceBuffer1, 'wav', 16000, { dev_pid: '1536'}).then(function(result) {
				var txt = JSON.stringify(result)
				obj = JSON.parse(txt)
				console.log(obj)
			}, function(err) {
				console.log(err);
			});
	})
	res.json('success')
})

app.listen(3000, function () {
	console.log('http://localhost:3000')
})

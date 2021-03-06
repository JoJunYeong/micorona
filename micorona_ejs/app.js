var express = require('express');
var path = require('path');
var logger = require('morgan');
var index = require('./routes/index');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found... xㅁx');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

app.listen(8000,function(){
	console.log("포트 8000 으로 접속승인중. ");
	console.log("서버를 연 시간 " + Date() );
});

module.exports = app;

//크롤링
const axios = require("axios");
const cheerio = require("cheerio");
var i =1;
app.get('/getKoreaData', function(req, res){

	console.log("Success GET "+req.query.data+i);
	i++;
	async function getHTML() {
		try {
			return await axios.get("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=&brdGubun=&ncvContSeq=&contSeq=&board_id=&gubun=");
		} catch (error) {
			console.error(error);
		}
	}

	getHTML()
	.then(html => {
		let numList = [];
		const $ = cheerio.load(html.data);
		const bodyList = $(".co_cur .num")
		bodyList.each(function(i, elem) {
			numList[i] = $(this).text().replace(/[^0-9]/g,"");
		});
		return numList;
	}).then(result => {
		console.log(result);
 	// kor = copyObject(result);
 	res.send({result:result});
 });

});


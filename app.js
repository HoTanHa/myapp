var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



app.set('port', process.env.PORT || 3000);
var http = require('http');

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});



var d = new Date();
d.setMinutes((d.getMinutes() - (d.getMinutes() % 15)), 0, 0);
console.log("--------" + d);
var offset = +7;
var d1 = new Date(d.getTime() + (3600000 * offset));
console.log(d1);
var d2 = d1.toISOString().substring(0, 10);
var d3 = d1.toISOString().substring(11, 23);
console.log(d2 + " " + d3);
var dstr = d2 + " " + d3;
console.log(d1.toUTCString());



// function trysql() {
// 	var sqlcmd = "Insert Into inverter(ivolt, icurr, ppow, rpow, cosphi, freq, seri, times) values ('220','5.5', '1100', '0.5', '1',' 50', '111111', '" + dstr + "');";
// 	console.log(sqlcmd);
// 	var sql = require('mssql/msnodesqlv8');
// 	var config = {
// 		driver: 'msnodesqlv8',
// 		connectionString: 'Driver={SQL Server Native Client 11.0};Server=.\\SQLEXPRESS;Database=TestAzure;Trusted_Connection=yes;',
// 	};
// 	const pool = new sql.ConnectionPool(config).connect().then(pool => {
// 		return pool.request().query(sqlcmd)
// 	}).then(result => {
// 		let rst = result.recordset;
// 		console.log("--------------  Ket qua  -------------");
// 		console.log(result);
// 		sql.close();

// 		res.render('chartsql', { title: 'Chart----Voltage', chartlabelsql: arrOfid, chartdatasql: arrOfvolt });
// 	}).catch(err => {
// 		sql.close();
// 		res.send("Fail to connect to Database");
// 	});
// }

var ene = 0;
function httprequest1() {
	var date1 = new Date();
	if (date1.getUTCHours==0){
		ene = 0;
	} else {
		ene += Math.floor(Math.random()*5+5);
	}
	var querystring = require('query-string');
	const postData = querystring.stringify({
		'data': "**-111111-E-"+ene+"-2-3-4-5-6-**"
	});

	const options = {
		hostname: 'inverter.herokuapp.com',
		//port: '80',
		path: '/esp',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		}
	};
	var http = require('http');
	const req = http.request(options, (res) => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log(`BODY: ${chunk}`);
		});
		res.on('end', () => {
			console.log('No more data in response.');
		});
	});

	req.on('error', (e) => {
		console.error(`problem with request: ${e.message}`);
	});

	// write data to request body
	req.write(postData);
	req.end();
}

function httprequest2() {
	var xvolt = Number(((Math.random() * 20) + 200).toFixed(2));
	var xcurr = Number(((Math.random() * 5)+3).toFixed(2));
	var xpow = Number((xvolt*xcurr).toFixed(2));

	var querystring = require('query-string');
	const postData = querystring.stringify({
		'data': "**-111111-M-"+xvolt+"-"+xcurr+"-"+xpow+"-0-1-50.2-**"
	});

	const options = {
		hostname: 'inverter.herokuapp.com',
		port: '80',
		path: '/esp',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		}
	};

	const req = http.request(options, (res) => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log(`BODY: ${chunk}`);
		});
		res.on('end', () => {
			console.log('No more data in response.');
		});
	});

	req.on('error', (e) => {
		console.error(`problem with request: ${e.message}`);
	});

	// write data to request body
	req.write(postData);
	req.end();

}


setTimeout(() => {
	httprequest1();
	httprequest2();
}, 1000);
setInterval(function(){
	httprequest1();
	httprequest2();
},180000);

module.exports = app;


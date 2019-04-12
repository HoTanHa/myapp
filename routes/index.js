var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/esp', function (req, res, next) {
    var data = req.body.data;
    console.log(data);
    res.send('OK. You sent data to server');
})

router.get("/example", function (req, res) {
    // var query = "SELECT id, CONVERT(VARCHAR(5),times,108) as  times, e_daily from energy_daily where seri = '111111' and DATEPART(Day, times) = DATEPART(day, GETUTCDATE());";
    // var Request = require('tedious').Request;
    // var TYPES = require('tedious').TYPES;
    // var ISOLATION_LEVEL = require('tedious').ISOLATION_LEVEL;

    // var Connection = require('tedious').Connection;
    // var config = {
    //     authentication: {
    //         type: "default",
    //         options: {
    //             userName: 'hotanha03021996',
    //             password: 'HAcfcha1996',
    //         }
    //     },
    //     server: 'htha.database.windows.net',
    //     options: {
    //         encrypt: true,
    //         database: 'MyDB',
    //         rowCollectionOnDone: true,
    //         rowCollectionOnRequestCompletion: true,
    //         enableArithAbort: true,
    //         connectionIsolationLevel: ISOLATION_LEVEL.READ_UNCOMMITTED
    //     }
    // };

    // var connection = new Connection(config);
    // connection.on('connect', function (err) {
    //     if (err) {
    //         console.log(err);
    //         res.send(err);
    //     }
    //     else {
    //         var Request = require('tedious').Request;
    //         var TYPES = require('tedious').TYPES;
    //         request = new Request(query, function (err, rowCount, rows) {
    //             if (err) {
    //                 console.log(err);
    //                 res.send(err);
    //             } else {
    //                 var rowarray = [];
    //                 rows.forEach(function (columns) {
    //                     var rowdata = new Object();
    //                     columns.forEach(function (column) {
    //                         rowdata[column.metadata.colName] = column.value;
    //                     });
    //                     rowarray.push(rowdata);
    //                 });
    //                 var arrOfid = rowarray.map(function (item) { return item.times; });
    //                 var arrOfPower =  rowarray.map(function (item) { return Number(item.e_daily.toFixed(2)); });
    //                 res.render('example', { arrId: arrOfid, arrDt: arrOfPower});
    //             }
    //         });
    //         connection.execSql(request);
    //     }
    // });

    var arrOfid = ['1','2','3','4','5'];
    var arrOfPower =  [450,520,150,620,260];
    res.render('example', { arrId: arrOfid, arrDt: arrOfPower});
})

router.get("/table", function(req, res){
    var data = [150, 450, 485, 871,150, 750];
    res.render('table', {energy: data});
})
module.exports = router;

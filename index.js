var express = require('express');
var app = express();
var qs = require('qs');
var get = require('simple-get');
var url = "mongodb://TomKuper:dbpassword1234@ds123933.mlab.com:23933/heroku_51tvcl2l";
var mongodb = require("mongodb");
var db;

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

mongodb.MongoClient.connect(
    process.env.MONGODB_URI || url,
    function (err, database)
    {
        if (err)
        {
            console.log(err);
        }

        db = database;
        console.log('ok');

    }
);

app.get(
    '/admin',
    function (request, response)
    {
        response.render("admin.html");
    }
);

app.get(
    '/',
    function (request, response)
    {
        response.render("index.html");
    }
);

app.get(
    '/compet1',
    function (request, response)
    {
        response.render("compet1.html");
    }
);

app.get(
    '/admin',
    function (request, response)
    {
        response.render("admin.html");
    }
);

app.get(
    '/kek',
    function (request, response)
    {
        response.send("kek");
    }
);

app.get(
    '/addresult',
    function (request, response)
    {
        var params = request.query;
        if(params['password'] !== "octopus8")
            response.send("Неправильный пароль");
        else
        {
            var collection = db.collection(params['compet']);
            collection.insertOne({"Name":params['name'], "Phone" : params['phone'], "Result" : parseInt(params['result'])});
            response.send("Добавлено");
        }

    }
);


app.get(
    '/showresults',
    function (request, response)
    {
        var params = request.query;
        if(params['password'] !== "octopus8")
            response.send("Неправильный пароль");
        else
        {
            var collection = db.collection(params['compet']);
            response.render("admincompet1.html");
        }

    }
);


app.get(
    '/deleteresults',
    function (request, response)
    {
        var params = request.query;
        if(params['password'] !== "octopus8")
            response.send("Неправильный пароль");
        else
        {
            var collection = db.collection(params['compet']);
            collection.drop();
            response.send("Удалено");
        }

    }
);


app.get(
    '/octopus.jpg',
    function (request, response)
    {
        response.sendFile('octopus.jpg' , { root : __dirname});
    }
);

app.get(
    '/api/:compet',
    function (request, response)
    {
        var compet = request.params.compet;
        var collection = db.collection(compet);
        collection.find({}).toArray(
            function (err, results)
            {
                response.send(results); // output all records
            }
        );
    }
);

app.listen(
    app.get('port'),
    function ()
    {
        console.log('Node app is running on port', app.get('port'));
    }
);
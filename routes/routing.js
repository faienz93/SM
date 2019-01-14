// http://expressjs.com/it/starter/static-files.html
// https://codeforgeek.com/2015/01/render-html-file-expressjs/

var express = require('express');

const router = express.Router();


// define reading of stating file
// app.use(express.static(path.join(__dirname, '/')));



router.get('/', function(req, res) {
    res.render('index', {title: "SM - Mobile System"});
});

router.get('/map', function (req, res) {
    if(req.query.map === undefined && req.query.type === undefined){
        res.status(200);
        res.header("Content-Type", "text/html");
        res.render('partials/map', {title: "SM",map:"OSM", type: "osm"});
    }else {    
        res.status(200);
        res.header("Content-Type", "text/html");
        res.render('partials/map', {title: "SM",map:req.query.map, type: req.query.type});
        // encodeURIComponent(JSON.stringify(jsonData)
    }
    // res.send(JSON.stringify(Obj));

});

router.get('/login', function (req, res, next) {
    res.render('login', {title: "SM - Login" });

    // if you have layout you can specify if you want to use him
    // res.render('login', {layout:false, title: "HELLO WORLD"});
});






module.exports = router;
const host = 'localhost';
const port = 3001;

let express = require("express");
let myParser = require("body-parser");
let app = express();

app.use(myParser.urlencoded({extended : true}));
app.use(function(req, res, next) {
    res.type('json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/", function(request, response) {
    let body = "";
    request.on("data", function (data) {
        body += data;
    });
    request.on("end", function() {
        // console.log(JSON.parse(body));
        const { length, height, width } = JSON.parse(body);
        response.end(JSON.stringify(createCube(length, height, width)));
    });

});

app.get("/", function(request, response) {
    response.end(JSON.stringify(createCube(1, 1, 1)));
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

const createCube = (l, h, w) => {
    let x = l / 2;
    let y = h / 2;
    let z = w / 2;

    const cubeMatrix = [

        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, -1.0,

        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,


        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, 1.0,

        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,

        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,


        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,

        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,

        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0,


        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,

        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,

        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0
    ];

    return cubeMatrix.map((value, index) => {
        if(index % 3 == 0) {
            return value * x;
        }
        if(index % 3 == 1) {
            return value * y;
        }
        if(index % 3 == 2) {
            return value * z;
        }
    });
};
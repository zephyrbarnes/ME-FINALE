const cos = Math.cos, sin = Math.sin, tan = Math.tan, sqrt = Math.sqrt, pi = Math.PI; // Math functions

const first = [{x:40, y:195},{x:60, y:200},{x:100,y:200},{x:140,y:200},{x:160,y:190},{x:170,y:180},{x:180,y:160},
               {x:190,y:120},{x:180,y: 90},{x:170,y: 70},{x:160,y: 60},{x:140,y: 60},{x:130,y: 80},{x:130,y:110},
               {x:120,y:130},{x:100,y:140},{x:70, y:130},{x:40, y:130},{x:20, y:150},{x:20, y:170},{x:30, y:190}];

const other = [{x: 81.8, y: 196.0},
               {x: 108.0,y: 210.0},
               {x: 152.0,y: 216.0},
               {x: 182.0,y: 185.6},
               {x: 190.0,y: 159.0},
               {x: 198.0,y: 122.0},
               {x: 226.0,y:  93.0},
               {x: 224.0,y:  41.0},
               {x: 204.0,y:  15.0},
               {x: 158.0,y:  24.0},
               {x: 146.0,y:  52.0},
               {x: 157.0,y:  93.0},
               {x: 124.0,y: 129.0},
               {x: 83.0, y: 104.0},
               {x: 77.0, y:  62.0},
               {x: 40.0, y:  57.0},
               {x: 21.0, y:  83.0},
               {x: 33.0, y: 145.0},
               {x: 30.0, y: 198.0},
               {x: 48.0, y: 210.0}];
var pv = function(v) { return Number((v).toFixed(4)); }
var keyH = new controller(), key = keyH.keyState;

var cur = new path(other, col, 70);
var start = mid(cur.left[1], cur.rite[1]);
var c = new car(start.x, start.y, 0.1,0.05);

var solver = new Solver(),
    results,
    model = {
        "optimize": "time",
        "opType": "min",
        "constraints": {},
        "variables": {
            "car": {
                "forw": {"binary": 0},  // Boolean variable for forward (W key)
                "left": {"binary": 0},    // Boolean variable for left (A key)
                "rite": {"binary": 0},    // Boolean variable for right (D key)
                "time": { "int": 1 }  // Integer variable for arrival time
            }
        },
    },
    priority = 0;

for (let i = 0; i < cur.gon.length; i++) {
    var curgon = cur.gon[i], onGon = checkOn(c, curgon);
    model.constraints["onTrack"] = { "min": 0, "max": onGon ? 1 : 0 };
    if(i == priority) {
        model.constraints["minD" + i] = { "min": 0, "max": distance(c.cn[1], curgon[1], curgon[2]) };
    } else {
        model.constraints["minD" + i] = { "min": 0, "max": Infinity };
    }
    if(onGon && !c.enterTime) {
        c.enterTime = Date.now();
    }else{
        c.timeDiff = (Date.now() - c.enterTime) / 1000;
        model.variables.car.time = c.timeDiff;
        c.enterTime = null;
        priority++;
    }
}

results = solver.Solve(model);

var resultsArray = [];

function tick() { ct.clearRect(0, 0, cw, ch);
    c.update();
    if(dBug == 2 || dBug == 3 || dBug == 4 || dBug == 5) { checkOn(c,cur.gon); }
    cur.drawPath();

    c.timeDiff = (Date.now() - c.enterTime) / 1000;
    model.variables.car.time = c.timeDiff;

    results = solver.Solve(model);
    console.log(results);

    resultsArray.push(results);

    keysCheck(results);
    c.drawCar();
}
var id = setInterval(tick, 15);
window.addEventListener('beforeunload', function(e) { clearInterval(id); });
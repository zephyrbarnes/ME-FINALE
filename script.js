const cos = Math.cos,
  sin = Math.sin,
  tan = Math.tan,
  sqrt = Math.sqrt,
  pi = Math.PI; // Math functions

const track1 = [
  { x: 81, y: 196 },
  { x: 108, y: 210 },
  { x: 152, y: 216 },
  { x: 182, y: 185 },
  { x: 190, y: 159 },
  { x: 198, y: 122 },
  { x: 226, y: 93 },
  { x: 224, y: 41 },
  { x: 204, y: 15 },
  { x: 158, y: 24 },
  { x: 146, y: 52 },
  { x: 157, y: 93 },
  { x: 124, y: 129 },
  { x: 83, y: 104 },
  { x: 77, y: 62 },
  { x: 40, y: 57 },
  { x: 21, y: 83 },
  { x: 33, y: 145 },
  { x: 30, y: 198 },
  { x: 48, y: 210 },
];

const track2 = [
  { x: 40, y: 195 },
  { x: 60, y: 200 },
  { x: 100, y: 200 },
  { x: 140, y: 200 },
  { x: 160, y: 190 },
  { x: 170, y: 180 },
  { x: 180, y: 160 },
  { x: 190, y: 120 },
  { x: 180, y: 90 },
  { x: 170, y: 70 },
  { x: 160, y: 60 },
  { x: 140, y: 60 },
  { x: 130, y: 80 },
  { x: 130, y: 110 },
  { x: 120, y: 130 },
  { x: 100, y: 140 },
  { x: 70, y: 130 },
  { x: 40, y: 130 },
  { x: 20, y: 150 },
  { x: 20, y: 170 },
  { x: 30, y: 190 },
];
var pv = function (v) {
  return Number(v.toFixed(4));
};
var keyH = new controller(),
  key = keyH.keyState;
  
  var cur = new path(track1, col, 70);
  var start = mid(cur.left[1], cur.rite[1]);
  var c = new car(start.x, start.y);
  

var forw = 0, left = 0, rite = 0,
    sped = c.s + 0.028*forw - 0.02,
    turn = 0.1,
    angl = 0,
    carx = c.p.x,
    cary = c.p.y,
    solver = new Solver(),
    results,
    model = {
        "optimize": "dist",
        "opType": "min",
        "constraints": {
            "sped": { "min": 0, "max": 0.8 },
            "angl": { "min": -10000, "max": 10000 },
            "turn": { "min": 0.02, "max": 0.1 },
            "carx": { "min": 0, "max": 1000 },
            "cary": { "min": 0, "max": 1000 }
        },
        "variables": {
            "car": {
                forw: {"binary": 0}, // negative weight because we want to minimize dist
                left: {"binary": 0}, // negative weight because we want to minimize dist
                rite: {"binary": 0}, // negative weight because we want to minimize dist
            }
        },
    };

function shortest(point, lineStart, lineEnd) {
  var dx = lineEnd.x - lineStart.x,
      dy = lineEnd.y - lineStart.y;

  const t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (dx * dx + dy * dy);

  let closestPoint;
  if (t < 0) {
      closestPoint = lineStart;
  } else if (t > 1) {
      closestPoint = lineEnd;
  } else {
      closestPoint = { x: lineStart.x + t * dx, y: lineStart.y + t * dy };
  }
  dx = point.x - closestPoint.x;
  dy = point.y - closestPoint.y;
  return (dx * dx + dy * dy);
}

function tick() {
  ct.clearRect(0, 0, cw, ch);
  c.update();
  if (dBug != 0 ) {
    checkOn(c, cur.gon);
  }

  sped = sped + 0.028*forw - 0.02,
  turn = 0.1 - (sped / 0.8) * 0.08,
  angl = (angl + turn*(rite - left)) * pi / 180,
  carx = carx + sped * (1 - angl * angl / 2),
  cary = cary + sped * angl,
  crnr = {x: carx + 3 * (1 - angl * angl / 2) + 2 * angl, y: cary + 3 * angl - 2 * (1 - angl * angl / 2)};

  var curGon = cur.gon[0];
  for(var i  = 0; i < cur.gon.length; i++) {
      if(ins(crnr, cur.gon[i])) curGon = cur.gon[i];
  }
  var dist = shortest(crnr,curGon[1], curGon[2]);
  model.variables.car.dist = {"min": 0, "max": 100000};

  results = solver.Solve(model);
  console.log(results);

  cur.drawPath();
  keysCheck(results);
  c.drawCar();
}
var id = setInterval(tick, 15);
window.addEventListener("beforeunload", function (e) {
  clearInterval(id);
});

const cos = Math.cos, sin = Math.sin, tan = Math.tan, sqrt = Math.sqrt, pi = Math.PI; // Math functions
const f = false;

const first = new path([{x:40, y:195},{x:60, y:200},{x:100,y:200},{x:140,y:200},{x:160,y:190},{x:170,y:180},{x:180,y:160},
                        {x:190,y:120},{x:180,y: 90},{x:170,y: 70},{x:160,y: 60},{x:140,y: 60},{x:130,y: 80},{x:130,y:110},
                        {x:120,y:130},{x:100,y:140},{x:70, y:130},{x:40, y:130},{x:20, y:150},{x:20, y:170},{x:30, y:190}],col,10);
var pv = function(v) { return Number((v).toFixed(4)); }
var keyH = new controller(), key = keyH.keyState;

var cur = first;
var start = mid(cur.left[1], cur.rite[1]);
const c = new car(start.x, start.y, 0.1,0.05);

function tick() { ct.clearRect(0, 0, cw, ch);
    c.update();
    checkOn(c,cur.gon);
    cur.drawPath();
    keysCheck();
    c.drawCar();
}
var id = setInterval(tick, 15);
window.addEventListener('beforeunload', function(e) { clearInterval(id); });
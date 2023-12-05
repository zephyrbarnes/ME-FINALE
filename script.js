const cos = Math.cos, sin = Math.sin, tan = Math.tan, sqrt = Math.sqrt, pi = Math.PI; // Math functions
const cv = document.getElementById('cv'), ct = cv.getContext('2d'),
      cw = cv.width = window.innerWidth, ch = cv.height = window.innerHeight,
      cb = window.getComputedStyle(cv).backgroundColor;
var cent = {x:0, y:0}, scale = 3.5, xOff = cw/2 - cent.x*scale, yOff = ch/2 - cent.y*scale, l;
const col = `rgb(0,150,255,255)`, iter = 1, f = false;

class path {
    constructor(/*Points*/p, color, width) { l = p.length; // Number of Points
        Object.assign(this,{p:p,color:color,width:width,left:[],rite:[],poly:[]});
        this.generateEdges(this.p, this.width);
        this.left = makeSpline(this.left, l);
        this.rite = makeSpline(this.rite, l);
        for (var i = 0; i < this.left.length; i++) {
            var poly = [this.left[i], this.left[(i + 1) % l], this.rite[(i + 1) % l], this.rite[i]];
            this.poly.push(poly);
        }
        var addPoly = [this.left[l - 1], this.left[0], this.rite[0], this.rite[l - 1]];
        this.poly.push(addPoly);
    }

    generateEdges(p, w) {
        function unitVector(v) { var m = sqrt(v.x**2 + v.y**2); return {x:v.x / m, y:v.y / m}; }
    
        for (var i = 0; i < l - 1; i++) {
            var uV = unitVector({ x: p[i+1].x - p[i].x, y: p[i+1].y - p[i].y }),
                leftPoint = { x: p[i].x + w*uV.y, y: p[i].y - w*uV.x },
                ritePoint = { x: p[i].x - w*uV.y, y: p[i].y + w*uV.x };
            this.left.push(leftPoint); this.rite.push(ritePoint);
        }

        var uV = unitVector({ x: p[0].x - p[l-1].x, y: p[0].y - p[l-1].y }),
            leftPoint = { x: p[0].x + w*uV.y, y: p[0].y - w*uV.x },
            ritePoint = { x: p[0].x - w*uV.y, y: p[0].y + w*uV.x };
        this.left.push(leftPoint); this.rite.push(ritePoint);
    }

    cent() { var totalX = 0, totalY = 0;
        for (var i = 0; i < l; i++) { totalX += this.p[i].x; totalY += this.p[i].y; }
        const centerX = totalX / l, centerY = totalY / l;
        return {x:centerX, y:centerY};
    }

    drawPath() {
        cent = this.cent();
        xOff = cw / 2 - cent.x * scale, yOff = ch / 2 - cent.y * scale;
        ct.fillStyle = this.color; ct.strokeStyle = this.color;
        ct.beginPath(); var lst = this.left[0], rst = this.rite[0];
        ct.moveTo((rst.x*scale) + xOff, (rst.y*scale) + yOff);
        for (var i = 1; i < this.rite.length; i++) { ct.lineTo((this.rite[i].x*scale) + xOff, (this.rite[i].y*scale) + yOff); }
        ct.fill(); ct.closePath(); ct.beginPath(); ct.fillStyle = cb;
        ct.moveTo((lst.x*scale) + xOff, (lst.y*scale) + yOff);
        for (var i = 1; i < this.left.length; i++) { ct.lineTo((this.left[i].x*scale) + xOff, (this.left[i].y*scale) + yOff); }
        ct.fill(); ct.closePath();
    }
}

function drawPoints(points, color = "purple", radius = 2) {
    ct.fillStyle = color;

    points.forEach(p => {
        ct.beginPath();
        ct.arc((p.x*scale) + xOff, (p.y*scale) + yOff, radius, 0, 2*pi);
        ct.fill();
    });
}

class car {
    constructor(x, y) {
        Object.assign(this, {/*Speed*/s: 0.0001, /*Angle*/a: 0, /*Turn Angle*/t: 0.1,
        p:{x: pv(x), y: pv(y)}, on: true, w:4, h:2.5, maxS:0.8, corners:[]});
    }

    drawCar() {
        ct.fillStyle = "red";
        ct.beginPath();
        this.calculateCorners();
        ct.moveTo((this.corners[0].x*scale) + xOff, (this.corners[0].y*scale) + yOff);
        for (const corner of this.corners) {
            ct.lineTo((corner.x*scale) + xOff, (corner.y*scale) + yOff);
        }
        ct.lineTo((this.corners[0].x*scale) + xOff, (this.corners[0].y*scale) + yOff);
        ct.closePath();
        ct.fill();
    }

    update() {
        this.calculateCorners();
        if (this.on) {
            if (this.s > this.maxS) { this.s = this.maxS; }
            if (this.s < 0.0001) { this.s = 0.0001; }
            this.t = 0.1 - (this.s / this.maxS) * 0.08;
            this.p.x = pv(this.p.x + this.s * Math.cos(this.a));
            this.p.y = pv(this.p.y + this.s * Math.sin(this.a));
        }else{ this.s = 0.0001}
    }

    calculateCorners() {
        const cA = cos(this.a), sA = sin(this.a);
        const hW = this.w / 2;
        const hH = this.h / 2;

        this.corners = [{x: pv(this.p.x - hW * cA + hH * sA), y: pv(this.p.y - hW * sA - hH * cA)},
                        {x: pv(this.p.x + hW * cA + hH * sA), y: pv(this.p.y + hW * sA - hH * cA)},
                        {x: pv(this.p.x + hW * cA - hH * sA), y: pv(this.p.y + hW * sA + hH * cA)},
                        {x: pv(this.p.x - hW * cA - hH * sA), y: pv(this.p.y - hW * sA + hH * cA)}];
    }

    toString() {
        return "Speed:" + this.s + "_Angle:" + this.a + "_Position:" + this.p.x + ", " + this.p.y + "_OnTrack:" + this.on;
    }
}

function checkOnTrack(car, poly) {
    var corner1, corner2;
    for (var i = 0; i < poly.length; i++) { if(!corner1) { corner1 = isInside(car.corners[1], poly[i]); }}
    for (var i = 0; i < poly.length; i++) { if(!corner2) { corner2 = isInside(car.corners[2], poly[i]); }}
    if (corner1 && corner2) { return car.on = true; }
    car.on = false;
}

function isInside(p, poly) {
    var x = p.x, y = p.y;

    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var xi = poly[i].x, yi = poly[i].y;
        var xj = poly[j].x, yj = poly[j].y;

        var intersect = ((yi > y) != (yj > y)) &&
            (x < ((xj - xi) * (y - yi) / (yj - yi) + xi));
        if (intersect) inside = !inside;
    }

    return inside;
}

function render(track) {
    track.drawPath();
    checkOnTrack(c,curr.poly);
    c.drawCar();
    //drawPoints(curr.p);
}

const firstTrack = new path([{x:40, y:195},{x:60, y:200},{x:100,y:200},{x:140,y:200},{x:160,y:190},{x:170,y:180},{x:180,y:160},
                             {x:190,y:120},{x:180,y: 90},{x:170,y: 70},{x:160,y: 60},{x:140,y: 60},{x:130,y: 80},{x:130,y:110},
                             {x:120,y:130},{x:100,y:140},{x:70, y:130},{x:40, y:130},{x:20, y:150},{x:20, y:170},{x:30, y:190}],col,10);
var pv = function(v) { return Number((v).toFixed(4)); }
var keyH = new controller(), key = keyH.keyState;
var curr = firstTrack;
var start = middlePoint(curr.left[1], curr.rite[1]);
const c = new car(start.x, start.y, 0.1,0.05);

function tick() {
    ct.clearRect(0, 0, cw, ch);
    c.update();
    keysCheck();
    render(curr);
}
var id = setInterval(tick, 15);
window.addEventListener('beforeunload', function(e) { clearInterval(id); });
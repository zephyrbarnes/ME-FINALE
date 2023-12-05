const col = `rgb(0,150,255,255)`, iter = 1, scale = 3.5;
var l, cent = {x:0,y:0},
    xOff = cw/2 - cent.x*scale,
    yOff = ch/2 - cent.y*scale;

class path {
    constructor(/*Points*/ p, color, width) { l = p.length; // Number of Points
        Object.assign(this,{p:p,color:color,width:width,left:[],rite:[],gon:[]});
        this.generateEdges(this.p, this.width);
        this.left = spline(this.left, l);
        this.rite = spline(this.rite, l);
        for (var i = 0; i < this.left.length; i++) {
            var gon = [this.left[i], this.left[(i+1) % l], this.rite[(i+1) % l], this.rite[i]];
            this.gon.push(gon);
        }
        var addPoly = [this.left[l-1], this.left[0], this.rite[0], this.rite[l-1]];
        this.gon.push(addPoly);
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

    cnt() { var totalX = 0, totalY = 0, i;
        for (i = 0; i < l; i++) { totalX += this.p[i].x; totalY += this.p[i].y; }
        const cntX = totalX / l, cntY = totalY / l;
        return {x:cntX, y:cntY};
    }

    drawPath() {
        cent = this.cnt();
        xOff = cw/2 - cent.x*scale,
        yOff = ch/2 - cent.y*scale;
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

function checkOn(car, gon) { var c1, c2;
    for (var i = 0; i < gon.length; i++) { if(!c1) { c1 = ins(car.cn[1], gon[i]); }}
    for (var i = 0; i < gon.length; i++) { if(!c2) { c2 = ins(car.cn[2], gon[i]); }}
    if (c1 && c2) { return car.on = true; }
    car.on = false;
}

function ins(p, gon) {
    var is = false, i;
    for (i = 0, j = gon.length - 1; i < gon.length; j = i++) {
        var xi = gon[i].x, yi = gon[i].y, xj = gon[j].x, yj = gon[j].y,
            intersect = ((yi > p.y) != (yj > p.y)) && (p.x < ((xj - xi)*(p.y - yi)/(yj - yi) + xi));
        if (intersect) is = !is;
    }
    return is;
}
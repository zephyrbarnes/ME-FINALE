function spline(p0, p1, p2, p3) { return {p0:p0, p1:p1, p2:p2, p3:p3}; }

function splinePoint(spline, t) {
    var P0 = spline.p0,     P1 = spline.p1,     P2 = spline.p2,     P3 = spline.p3;
    var tt = t*t,   ttt = tt*t;
    var q1 = -ttt + 2*tt - t,   q2 = 3*ttt - 5*tt + 2,   q3 = -3*ttt + 4*tt + t,    q4 = ttt - tt;
    var tx = P0.x*q1 + P1.x*q2 + P2.x*q3 + P3.x*q4,    ty = P0.y*q1 + P1.y*q2 + P2.y*q3 + P3.y*q4;
    return {x:0.5*tx, y:0.5*ty};
}

function makeSpline(p, l) {
    var spl = [], spt = [], i = 0;
    for(var i = 0; i < l - 3; i++) { spl.push(spline(p[i],p[i+1],p[i+2],p[i+3])); }
    spl.push(spline( p[l-3], p[l-2], p[l-1], p[0]));
    spl.push(spline( p[l-2], p[l-1],   p[0], p[1]));
    spl.push(spline( p[l-1],   p[0],   p[1], p[2]));

    for(var i = 0; i < spl.length; i++) { var tInc = 1/iter,   t = 0;
        for(var j = 0; j < iter; j++) { spt.push(splinePoint(spl[i], t));
            t += tInc; }
    }
    return spt;
}

function middlePoint(p1, p2) {
    const middleX = (p1.x + p2.x) / 2;
    const middleY = (p1.y + p2.y) / 2;
    return { x: middleX, y: middleY };
}
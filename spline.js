function sp(p0, p1, p2, p3) { return {p0:p0, p1:p1, p2:p2, p3:p3}; }
function mid(p1, p2) { const mx = (p1.x + p2.x)/2, my = (p1.y + p2.y)/2;
    return {x:mx,y:my}; }

function point(sp, t) {
    var P0 = sp.p0,     P1 = sp.p1,     P2 = sp.p2,     P3 = sp.p3;
    var tt = t*t,   ttt = tt*t;
    var q1 = -ttt + 2*tt - t,   q2 = 3*ttt - 5*tt + 2,   q3 = -3*ttt + 4*tt + t,    q4 = ttt - tt;
    var tx = P0.x*q1 + P1.x*q2 + P2.x*q3 + P3.x*q4,    ty = P0.y*q1 + P1.y*q2 + P2.y*q3 + P3.y*q4;
    return {x:0.5*tx, y:0.5*ty};
}

function spline(p, l) {
    var s = [], g = [], i = 0;
    for(i=0; i < l-3; i++) {
        s.push(sp(p[i],p[i+1],p[i+2],p[i+3])); }
        s.push(sp(p[l-3],p[l-2],p[l-1],p[0]));
        s.push(sp(p[l-2],p[l-1],p[0],p[1]));
        s.push(sp(p[l-1],p[0],p[1],p[2]));

    for(i=0; i < s.length; i++) {
        var tInc = 1 / iter, t = 0;
        for(var j = 0; j < iter; j++) {
            g.push(point(s[i],t));
            t += tInc; }}
    return g;
}
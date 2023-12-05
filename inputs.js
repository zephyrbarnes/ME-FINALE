class controller {
    keyState = {    27: f, /*EXITS*/ 87: f, /*W KEY*/
                    65: f, /*A KEY*/ 83: f, /*S KEY*/ 68: f, /*D KEY*/
                    32: f, /*SPACE*/ 38: f, /*ABOVE*/
                    37: f, /*LEFTS*/ 40: f, /*BELOW*/ 39: f, /*RIGHT*/
                    13: f  /*ENTER*/};
  
    constructor() {
        document.addEventListener('keydown', (e) => this.pass(e, true));
        document.addEventListener('keyup', (e) => this.pass(e, false));
    }
    pass(e, isPressed) { if (e.which in this.keyState) { this.keyState[e.which] = isPressed; e.preventDefault(); } }
    key(keyCode) { return this.keyState[keyCode]; }
}

function keysCheck() {
    if(key[87]) { c.s = pv(c.s + 0.008); }else if(!key[87]){ c.s = pv(c.s - 0.02); }
    if(key[65]) { c.a = pv(c.a - c.t); }
    if(key[68]) { c.a = pv(c.a + c.t); }
    if(key[83]) { c.s = pv(c.s - 0.5); }
}
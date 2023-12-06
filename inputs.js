class controller {
  keyState = {
    27: f, /*EXITS*/ 87: f,/*W KEY*/
    65: f, /*A KEY*/ 83: f,/*S KEY*/ 68: f /*D KEY*/,
    32: f, /*SPACE*/ 38: f,/*ABOVE*/
    37: f, /*LEFTS*/ 40: f,/*BELOW*/ 39: f /*RIGHT*/,
    13: f /*ENTER*/
  };

  lastSpacePressTime = 0;
  spaceActionDelay = 500;
  constructor() {
    document.addEventListener("keydown", (e) => this.pass(e, true));
    document.addEventListener("keyup", (e) => this.pass(e, false));
  }
  pass(e, isPressed) {
    if (e.which in this.keyState) {
      this.keyState[e.which] = isPressed;
      e.preventDefault();
    }
  }
  key(keyCode) {
    return this.keyState[keyCode];
  }
}

let counter = 0;
const TICKS_PER_CHANGE = 10;

function keysCheck(results) {
  if (key[87]) c.s = pv(c.s + 0.008);
  else if (!key[87]) c.s = pv(c.s - 0.02);

  if (key[65]) c.a = pv(c.a - c.t);
  if (key[68]) c.a = pv(c.a + c.t);
  if (key[83]) c.s = pv(c.s - 0.5);

    counter++;
    if (counter >= TICKS_PER_CHANGE) {
        counter = 0; // reset counter
        if (key[38]) {
            if(iter < 100) iter++;
            if (dBug == 0) {
                cur = new path(track1, col, 70);
            } else if (dBug == 1) {
                cur = new path(track1, col, 12);
            } else if (dBug == 2 || dBug == 3 || dBug == 4) {
                if(iter > 10) iter = 10;
                cur = new path(track2, col, 10);
            }
        }
        if (key[40]) {
            if(iter > 1) iter--;
            if (dBug == 0) {
            cur = new path(track1, col, 70);
            } else if (dBug == 1) {
            cur = new path(track1, col, 12);
            } else if (dBug == 2 || dBug == 3 || dBug == 4) {
            cur = new path(track2, col, 10);
            }
        }
    }
  if (key[32]) {
    if (!spacePressed) {
      dBug++;
      if (dBug > dMax) dBug = 0;
      if (dBug < 0) dBug = dMax;
      if (dBug == 0) {
        cur = new path(track1, col, 70);
      } else if (dBug == 1) {
        cur = new path(track1, col, 12);
      } else if (dBug == 2) {
        cur = new path(track2, col, 10);
      }
      if (dBug == 0 || dBug == 1) start = cur.spt[0];
      if (dBug == 2) start = mid(cur.left[l - 1], cur.rite[l - 1]);
      c.reset(start.x, start.y);
      spacePressed = true;
    }
  } else if (!key[32]) { spacePressed = false; }
}

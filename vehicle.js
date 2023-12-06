class car {
  constructor(x, y) {
    Object.assign(this, {
      /*Speed*/ s: 0.0001,
      /*Angle*/ a: 0,
      /*Turn Angle*/ t: 0.1,
      p: { x: pv(x), y: pv(y) },
      on: true,
      w: 6,
      h: 4,
      maxS: 0.8,
      cn: [],
    });
    this.calculateCorners();
  }

  drawCar() {
    ct.fillStyle = "red";
    ct.beginPath();
    ct.moveTo(this.cn[0].x * scale + xOff, this.cn[0].y * scale + yOff);
    for (const corner of this.cn) {
      ct.lineTo(corner.x * scale + xOff, corner.y * scale + yOff);
    }
    ct.lineTo(this.cn[0].x * scale + xOff, this.cn[0].y * scale + yOff);
    ct.closePath();
    ct.fill();
  }

  update() {
    this.calculateCorners();
    if (this.on) {
      if (this.s > this.maxS) {
        this.s = this.maxS;
      }
      if (this.s < 0.0001) {
        this.s = 0.0001;
      }
      this.t = 0.1 - (this.s / this.maxS) * 0.08;
      this.p.x = pv(this.p.x + this.s * Math.cos(this.a));
      this.p.y = pv(this.p.y + this.s * Math.sin(this.a));
    } else {
      this.s = 0.0001;
    }
  }

  reset(x, y) {
    this.p.x = x;
    this.p.y = y;
    this.s = 0.0001;
    this.a = 0;
    this.on = true;
  }

  calculateCorners() {
    const cA = cos(this.a),
      sA = sin(this.a);
    const hW = this.w / 2;
    const hH = this.h / 2;

    this.cn = [
      {
        x: pv(this.p.x - hW * cA + hH * sA),
        y: pv(this.p.y - hW * sA - hH * cA),
      },
      {
        x: pv(this.p.x + hW * cA + hH * sA),
        y: pv(this.p.y + hW * sA - hH * cA),
      },
      {
        x: pv(this.p.x + hW * cA - hH * sA),
        y: pv(this.p.y + hW * sA + hH * cA),
      },
      {
        x: pv(this.p.x - hW * cA - hH * sA),
        y: pv(this.p.y - hW * sA + hH * cA),
      },
    ];
  }

  toString() {
    return (
      "Speed:" +
      this.s +
      "_Angle:" +
      this.a +
      "_Position:" +
      this.p.x +
      ", " +
      this.p.y +
      "_OnTrack:" +
      this.on
    );
  }
}

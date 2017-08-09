const BADD_W = 50;
const BADD_H = 50;

class BAdd {

  constructor(p5,x,y) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.mx = x + BADD_W;
    this.my = y + BADD_H;
  }

  setup() {

  }

  get coords() {
    return { x: this.x, y: this.y, mx: this.mx, my: this.my };
  }

  draw() {
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    this.p5.fill(127);
    this.p5.rect(this.x,this.y,BADD_W,BADD_H);
  }

}

export default BAdd;

import TouchState from 'utils/constants';

class Button {

  constructor(p5) {
    this.p5 = p5;
  }

  setup(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.mx = x + w;
    this.my = y + h;
    this.touchState = TouchState.END;
  }

  get coords() {
    return { x: this.x, y: this.y, mx: this.mx, my: this.my };
  }

  draw() {
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    if(this.touchState==TouchState.END) {
      this.p5.fill(127);
    }
    else {
      this.p5.fill(255);
    }
    this.p5.rect(this.x,this.y,this.w,this.h);
  }

  update(touchState) {
    this.touchState = touchState;
  }
}

export default Button;

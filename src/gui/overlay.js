import Button from 'gui/button';

class Overlay {

  constructor(p5,canvasW,canvasH) {
    this.p5 = p5;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  update(canvasW,canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  get actionElements() {
    return [];
  }

  setup() {
  }

  draw() {
  }

}

  export default Overlay;

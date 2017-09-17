
class GuiFacade {

  constructor(p5,canvasW,canvasH) {
    this.p5 = p5;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  update(canvasW,canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  setup() {
  }

  draw() {
  }

}

export default GuiFacade;

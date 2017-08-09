import BAdd from 'gui/badd';
import MouseInteractor from 'gui/MouseInteractor';
import TouchState from 'utils/constants';

class GuiFacade {

  constructor(p5,canvasW,canvasH) {
    this.p5 = p5;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.bAdd = new BAdd(p5,canvasW-200,200);
    this.mouseInteractor = new MouseInteractor();
  }

  update(canvasW,canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  setup() {
    this.bAdd.setup();
    this.mouseInteractor.add(this.bAdd);
  }

  draw() {
    this.bAdd.draw();
  }

  handleTouchInteraction(mouseState) {
    var obj = this.mouseInteractor.testCollision(this.p5.mouseX,this.p5.mouseY);
    if(obj===undefined) {
      return;
    }
    mouseState==TouchState.START
  }

}

export default GuiFacade;

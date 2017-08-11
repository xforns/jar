import MouseInteractor from 'gui/MouseInteractor';
import TouchState from 'utils/constants';
import Button from 'gui/button';
import Overlay from 'gui/overlay';

class GuiFacade {

  constructor(p5,canvasW,canvasH) {
    this.p5 = p5;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.bAdd = new Button(p5);
    this.overlay = new Overlay(p5,canvasW,canvasH);
    this.mouseInteractor = new MouseInteractor();
  }

  update(canvasW,canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  setup() {
    this.bAdd.setup(this.canvasW-200,200,50,50);
    this.overlay.setup();

    this.mouseInteractor.add(this.bAdd);
    this.mouseInteractor.add(this.overlay.actionElements);
  }

  draw() {
    this.bAdd.draw();
    this.overlay.draw();
  }

  handleTouchInteraction(touchState) {
    var obj = this.mouseInteractor.testCollision(this.p5.mouseX,this.p5.mouseY);
    if(obj===undefined) {
      return;
    }
    if(this.bAdd.constructor.name=="Button") {
      this.bAdd.update(touchState);
    }
  }

}

export default GuiFacade;

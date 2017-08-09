import WorldFacade from 'world/worldFacade';
import GuiFacade from 'gui/guiFacade';
import TouchState from 'utils/constants';

export default function sketch(p5) {

  var guiFacade;
  var worldFacade;

  var canvas;
  var canvasW;
  var canvasH;


  p5.setup = () => {
    canvasW = p5.windowWidth;
    canvasH = p5.windowHeight;
    canvas = p5.createCanvas(canvasW, canvasH);

    guiFacade = new GuiFacade(p5,canvasW,canvasH);
    guiFacade.setup();

    worldFacade = new WorldFacade(p5,canvasW,canvasH);
    worldFacade.setup(canvas);

  }

  p5.draw = () => {
    p5.background(51);

    guiFacade.draw();
    worldFacade.draw();
  }

  p5.touchStarted = () => {
    guiFacade.handleTouchInteraction(TouchState.START);
    return false;
  }

  p5.touchMoved = () => {
    guiFacade.handleTouchInteraction(TouchState.MOVE);
    return false;
  }

  p5.touchEnded = () => {
    guiFacade.handleTouchInteraction(TouchState.END);
    return false;
  }

  p5.windowResized = () => {
    canvasW = p5.windowWidth;
    canvasH = p5.windowHeight;
    p5.resizeCanvas(canvasW, canvasH);

    guiFacade.update(canvasW, canvasH);
    worldFacade.update(canvasW, canvasH);
  }

}

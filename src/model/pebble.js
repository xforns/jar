import BaseJarFiller from 'model/BaseJarFiller';

class Pebble extends BaseJarFiller {

  constructor(p5,x,y) {
    super(p5,x,y);
    this.filename = "assets/pebble.svg";
  }
}

export default Pebble;

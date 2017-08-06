import BaseJarFiller from 'model/BaseJarFiller';

class Stone extends BaseJarFiller {

  constructor(p5,x,y) {
    super(p5,x,y);
    this.filename = "assets/stone.svg"
  }
}

export default Stone;

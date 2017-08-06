import Matter from 'matter-js';
import pathseg from 'pathseg';

class Balance {

  constructor(p5,x,y) {
    this.p5 = p5;
    this.Svg = Matter.Svg;
    this.x = x;
    this.y = y;
  }

  createAndAttachBody(content,bodies) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(content, "image/svg+xml");
    var path = doc.getElementsByTagName('path');
    var i = path.length;
    var vertexSets = [];
    while(i--) {
      vertexSets.push(this.Svg.pathToVertices(path[i], 2));
    }
    this.body = bodies.fromVertices(this.x, this.y, vertexSets);
  }

  setup(bodies) {
    var request = new XMLHttpRequest();
    request.open("GET", "assets/balance.svg",false);
    request.setRequestHeader("Content-Type", "image/svg+xml");
    request.send(null);
    if (request.status === 200) {
      return this.createAndAttachBody(request.responseText,bodies);
    }
    return null;
  }

  update() {
  }

  draw() {
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    this.p5.beginShape();
    if(this.body === undefined) {
      return;
    }
    for(var i in this.body.vertices) {
      this.p5.vertex(this.body.vertices[i].x,this.body.vertices[i].y);
    }
    this.p5.endShape(this.p5.CLOSE);
  }
}

export default Balance;

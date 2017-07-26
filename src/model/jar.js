import Matter from 'matter-js';
import pathseg from 'pathseg';

const JAR_MARGIN_L = 120;
const JAR_MARGIN_R = 360;
const JAR_MARGIN_T = 240;
const JAR_MARGIN_B = 60;

class Jar {

  constructor(p5) {
    this.p5 = p5;
    this.Svg = Matter.Svg;
    this.bJar = [];
  }

  update(bodies,canvasW,canvasH) {
    this.bJar = [
      bodies.rectangle(0,
                       JAR_MARGIN_T+(canvasH-JAR_MARGIN_T-JAR_MARGIN_B)/2,
                       JAR_MARGIN_L*2,
                       canvasH-JAR_MARGIN_T-JAR_MARGIN_B,
                       { isStatic: true }),
      bodies.rectangle(JAR_MARGIN_L+(canvasW-JAR_MARGIN_L-JAR_MARGIN_R)/2,
                       canvasH,
                       canvasW-JAR_MARGIN_L-JAR_MARGIN_R,
                       JAR_MARGIN_B*2,
                       { isStatic: true }),
      bodies.rectangle(canvasW,
                       JAR_MARGIN_T+(canvasH-JAR_MARGIN_T-JAR_MARGIN_B)/2,
                       JAR_MARGIN_R*2,
                       canvasH-JAR_MARGIN_T-JAR_MARGIN_B,
                       { isStatic: true }),
    ];
  }

  get bodies() {
    return this.bJar;
  }

  draw() {
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    this.p5.fill(255, 50);

    this.p5.line(this.bJar[0].vertices[1].x,this.bJar[0].vertices[1].y,
                 this.bJar[0].vertices[2].x,this.bJar[0].vertices[2].y);
    this.p5.line(this.bJar[1].vertices[0].x,this.bJar[1].vertices[0].y,
                 this.bJar[1].vertices[1].x,this.bJar[1].vertices[1].y);
    this.p5.line(this.bJar[2].vertices[3].x,this.bJar[2].vertices[3].y,
                 this.bJar[2].vertices[0].x,this.bJar[2].vertices[0].y);
  }
}

export default Jar;

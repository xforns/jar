import Matter from 'matter-js';
import pathseg from 'pathseg';

const JAR_B1_W = 20;
const JAR_B2_W = 20;
const JAR_B3_W = 20;
const JAR_MARGIN_L = 200;
const JAR_MARGIN_R = 400;
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
      bodies.rectangle(JAR_MARGIN_L+JAR_B1_W/2,
                       JAR_MARGIN_T+(canvasH-JAR_MARGIN_T-JAR_MARGIN_B)/2,
                       JAR_B1_W,
                       canvasH-JAR_MARGIN_T-JAR_MARGIN_B,
                       { isStatic: true }),
      bodies.rectangle(JAR_MARGIN_L+(canvasW-JAR_MARGIN_L-JAR_MARGIN_R)/2,
                       canvasH-JAR_MARGIN_B-JAR_B3_W/2,
                       canvasW-JAR_MARGIN_L-JAR_MARGIN_R,
                       JAR_B3_W,
                       { isStatic: true }),
      bodies.rectangle(canvasW-JAR_MARGIN_R-JAR_B3_W/2,
                       JAR_MARGIN_T+(canvasH-JAR_MARGIN_T-JAR_MARGIN_B)/2,
                       JAR_B3_W,
                       canvasH-JAR_MARGIN_T-JAR_MARGIN_B,
                       { isStatic: true }),
    ];
  }

  get bodies() {
    return this.bJar;
  }

  drawRect(i) {
    this.p5.beginShape();
    this.p5.vertex(this.bJar[i].vertices[0].x,this.bJar[i].vertices[0].y);
    this.p5.vertex(this.bJar[i].vertices[1].x,this.bJar[i].vertices[1].y);
    this.p5.vertex(this.bJar[i].vertices[2].x,this.bJar[i].vertices[2].y);
    this.p5.vertex(this.bJar[i].vertices[3].x,this.bJar[i].vertices[3].y);
    this.p5.vertex(this.bJar[i].vertices[0].x,this.bJar[i].vertices[0].y);
    this.p5.endShape();
  }
  draw() {
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    this.p5.fill(127);
    this.drawRect(0);
    this.drawRect(1);
    this.drawRect(2);
  }
}

export default Jar;

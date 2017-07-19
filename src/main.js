var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var bodies;

var canvas;
var canvasW;
var canvasH;

var jar;
var JAR_MARGIN_L = 120;
var JAR_MARGIN_R = 360;
var JAR_MARGIN_T = 240;
var JAR_MARGIN_B = 60;

//
// own methods
//
var updateJar = function() {
  console.log(canvasH);
  jar = [
    Bodies.rectangle(0,
                     JAR_MARGIN_T+(canvasH-JAR_MARGIN_T-JAR_MARGIN_B)/2,
                     JAR_MARGIN_L*2,
                     canvasH-JAR_MARGIN_T-JAR_MARGIN_B,
                     { isStatic: true }),
    Bodies.rectangle(JAR_MARGIN_L+(canvasW-JAR_MARGIN_L-JAR_MARGIN_R)/2,
                     canvasH,
                     canvasW-JAR_MARGIN_L-JAR_MARGIN_R,
                     JAR_MARGIN_B*2,
                     { isStatic: true }),
    Bodies.rectangle(canvasW,
                     JAR_MARGIN_T+(canvasH-JAR_MARGIN_T-JAR_MARGIN_B)/2,
                     JAR_MARGIN_R*2,
                     canvasH-JAR_MARGIN_T-JAR_MARGIN_B,
                     { isStatic: true }),
  ];
};

var update = function() {
  updateJar();
};

var drawJar = function() {
  stroke(255);
  strokeWeight(1);
  fill(255, 50);

  line(jar[0].vertices[1].x,jar[0].vertices[1].y,jar[0].vertices[2].x,jar[0].vertices[2].y);
  line(jar[1].vertices[0].x,jar[1].vertices[0].y,jar[1].vertices[1].x,jar[1].vertices[1].y);
  line(jar[2].vertices[3].x,jar[2].vertices[3].y,jar[2].vertices[0].x,jar[2].vertices[0].y);
}

//
// overriden p5.js methods
//
function setup() {

  canvasW = windowWidth;
  canvasH = windowHeight;
  canvas = createCanvas(canvasW, canvasH);
  engine = Engine.create();
  world = engine.world;

  // add mouse control
  var mouse = Mouse.create(canvas.elt),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
  mouseConstraint.mouse.pixelRatio = pixelDensity();

  World.add(world,mouseConstraint);

  update();
  World.add(engine.world, jar);

  Engine.run(engine);
}

function draw() {
  background(51);

  drawJar();
}

function windowResized() {
  canvasW = windowWidth;
  canvasH = windowHeight;
  resizeCanvas(windowWidth, windowHeight);

  updateJar();
  //engine.world.bounds.max.x = windowWidth;
  //engine.world.bounds.max.y = windowHeight;
}

var logme = function() {
  var str = "";
  var i = arguments.length;
  while(--i) {
    str += arguments[i] + " ";
  }
  console.log(str);
}

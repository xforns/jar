var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Vertices = Matter.Vertices;
var Svg = Matter.Svg;

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

var Stone = function() {
  this.vertexSets = [];
};

Stone.prototype = {


  setup: function() {
    var content = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137 60.58"><title>stone</title><path d="M347.69,239.66c-3,0-6-.05-9.17-.16-29.2-1-68-3.78-68-16.5,0-12.38,19.25-42.92,48.3-42.92a45.8,45.8,0,0,1,11.08,1.4c8.76,2.19,17.76,3.72,26.48,5.2,26.91,4.58,50.14,8.53,50.14,29.31C406.5,236.59,369.65,239.66,347.69,239.66Z" transform="translate(-270 -179.58)" style="fill:#fff"/><path d="M318.8,179.58v1a45.26,45.26,0,0,1,11,1.39c8.77,2.19,17.79,3.73,26.51,5.21C383,191.72,406,195.64,406,216c0,7.77-5.53,13.72-16.45,17.68-10,3.64-24.11,5.48-41.86,5.48-3,0-6-.05-9.16-.16-16.7-.57-67.53-2.29-67.53-16,0-5.57,4.41-16.12,12.83-25.48,9.82-10.92,22.24-16.93,35-16.93v-1m0,0c-30.17,0-48.8,31.57-48.8,43.42,0,13.25,39,16,68.5,17q4.68.16,9.19.16c33.47,0,59.31-6.73,59.31-24.16,0-28-41-26-77-35a46,46,0,0,0-11.2-1.42Z" transform="translate(-270 -179.58)"/></svg>';
    var parser = new DOMParser();
    var doc = parser.parseFromString(content, "image/svg+xml");
    var path = doc.getElementsByTagName('path');
    var i = path.length;
    while(i--) {
      this.vertexSets.push(Svg.pathToVertices(path[i], 30));
    }
  },

  update: function() {
  },

  draw: function() {
    stroke(255);
    strokeWeight(1);
    fill(255, 50);
    ellipse(250, 250, 150, 50);
  }
};

var updateStones = function() {
  stone.update();
};

var update = function() {
  updateJar();
  updateStones();
};

var drawJar = function() {
  stroke(255);
  strokeWeight(1);
  fill(255, 50);

  line(jar[0].vertices[1].x,jar[0].vertices[1].y,jar[0].vertices[2].x,jar[0].vertices[2].y);
  line(jar[1].vertices[0].x,jar[1].vertices[0].y,jar[1].vertices[1].x,jar[1].vertices[1].y);
  line(jar[2].vertices[3].x,jar[2].vertices[3].y,jar[2].vertices[0].x,jar[2].vertices[0].y);
}

var drawStones = function() {
  new Stone().draw();
};

var stone = new Stone();

//
// overriden p5.js methods
//
var setup = function() {

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

  stone.setup();

  //World.add(engine.world, Bodies.fromVertices(200, 200, stone.vertexSets, true));
  update();
  World.add(engine.world, jar);

  Engine.run(engine);
}

var draw = function() {
  background(51);

  drawJar();
  drawStones();
}

var windowResized = function() {
  canvasW = windowWidth;
  canvasH = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
  update();
}

var logme = function() {
  var str = "";
  var i = arguments.length;
  while(i--) {
    str += arguments[i] + " ";
  }
  console.log(str);
}

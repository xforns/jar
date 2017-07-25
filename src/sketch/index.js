import Matter from 'matter-js';
import pathseg from 'pathseg';
import logme from 'utils';

export default function sketch(p5) {


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
  };

  Stone.prototype = {

    createAndAttachBody: function(content,world) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(content, "image/svg+xml");
      var path = doc.getElementsByTagName('path');
      var i = path.length;
      var vertexSets = [];
      while(i--) {
        vertexSets.push(Svg.pathToVertices(path[i], 10));
      }
      this.body = Bodies.fromVertices(150, 200, vertexSets);
      World.add(world,this.body);
    },

    setup: function(world) {
      var request = new XMLHttpRequest();
      request.addEventListener("load", (event) => {
        var response = event.target.responseText;
        this.createAndAttachBody(response,world);
      });
      request.open("GET", "assets/stone.svg");
      request.setRequestHeader("Content-Type", "image/svg+xml");
      request.send();
    },

    update: function() {
    },

    draw: function() {
      p5.stroke(255);
      p5.strokeWeight(1);
      p5.beginShape();
      if(this.body === undefined) {
        return;
      }
      for(var i in this.body.vertices) {
        p5.vertex(this.body.vertices[i].x,this.body.vertices[i].y);
      }
      p5.endShape(p5.CLOSE);
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
    p5.stroke(255);
    p5.strokeWeight(1);
    p5.fill(255, 50);

    p5.line(jar[0].vertices[1].x,jar[0].vertices[1].y,jar[0].vertices[2].x,jar[0].vertices[2].y);
    p5.line(jar[1].vertices[0].x,jar[1].vertices[0].y,jar[1].vertices[1].x,jar[1].vertices[1].y);
    p5.line(jar[2].vertices[3].x,jar[2].vertices[3].y,jar[2].vertices[0].x,jar[2].vertices[0].y);
  }

  var drawStones = function() {
    stone.draw();
  };

  var stone = new Stone();


  //
  // overriden p5.js methods
  //

  p5.setup = () => {
    canvasW = p5.windowWidth;
    canvasH = p5.windowHeight;
    canvas = p5.createCanvas(canvasW, canvasH);
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
    mouseConstraint.mouse.pixelRatio = p5.pixelDensity();

    World.add(world,mouseConstraint);

    stone.setup(world);

    //World.add(engine.world, Bodies.fromVertices(200, 200, stone.vertexSets, true));
    update();
    World.add(engine.world, jar);

    Engine.run(engine);
  }

  p5.draw = () => {
    p5.background(51);

    drawJar();
    drawStones();
  }

  p5.windowResized = () => {
    canvasW = p5.windowWidth;
    canvasH = p5.windowHeight;
    p5.resizeCanvas(canvasW, canvasH);
    update();
  }

}

import Matter from 'matter-js';
import pathseg from 'pathseg';
import Stone from 'model/Stone';
import Jar from 'model/Jar';

export default function sketch(p5) {
  
  var Engine = Matter.Engine;
  var Render = Matter.Render;
  var World = Matter.World;
  var Bodies = Matter.Bodies;
  var Mouse = Matter.Mouse;
  var MouseConstraint = Matter.MouseConstraint;
  var Vertices = Matter.Vertices;

  var engine;
  var world;
  var bodies;

  var canvas;
  var canvasW;
  var canvasH;

  var jar;
  var stone;


  //
  // own methods
  //

  var updateStones = function() {
    stone.update();
  };

  var update = function() {
    jar.update(Bodies,canvasW,canvasH);
    updateStones();
  };

  var drawStones = function() {
    stone.draw();
  };


  //
  // overriden p5.js methods
  //

  p5.setup = () => {
    stone = new Stone(p5);
    jar = new Jar(p5);

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

    jar.update(Bodies,canvasW,canvasH);
    stone.setup(Bodies)

    World.add(world,mouseConstraint);
    World.add(world,stone.body);
    World.add(engine.world,jar.bodies);

    Engine.run(engine);
  }

  p5.draw = () => {
    p5.background(51);

    jar.draw();
    drawStones();
  }

  p5.windowResized = () => {
    canvasW = p5.windowWidth;
    canvasH = p5.windowHeight;
    p5.resizeCanvas(canvasW, canvasH);
    update();
  }

}

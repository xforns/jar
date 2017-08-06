import Matter from 'matter-js';
import pathseg from 'pathseg';
import Stone from 'model/Stone';
import Pebble from 'model/Pebble';
import Balance from 'model/Balance';
import Jar from 'model/Jar';
import logme from 'utils';

export default function sketch(p5) {

  var Engine = Matter.Engine;
  var Render = Matter.Render;
  var World = Matter.World;
  var Bodies = Matter.Bodies;
  var Mouse = Matter.Mouse;
  var MouseConstraint = Matter.MouseConstraint;
  var Vertices = Matter.Vertices;
  var Constraint = Matter.Constraint;

  var engine;
  var world;
  var bodies;

  var canvas;
  var canvasW;
  var canvasH;

  var jar;
  var stone;
  var pebble;
  var balance;
  var ball;
  var offsetX = 0;

  //
  // own methods
  //

  var updateStones = function() {
    stone.update();
    pebble.update();
  };

  var update = function() {
    jar.update(Bodies,canvasW,canvasH);
    balance.update();
    updateStones();
  };

  var drawStones = function() {
    stone.draw();
    pebble.draw();
  };


  //
  // overriden p5.js methods
  //

  p5.setup = () => {
    canvasW = p5.windowWidth;
    canvasH = p5.windowHeight;
    canvas = p5.createCanvas(canvasW, canvasH);
    engine = Engine.create();
    world = engine.world;

    jar = new Jar(p5);
    balance = new Balance(p5,canvasW/2,300);
    ball = Bodies.rectangle(canvasW/2, 300, 300, 50, { density: 0.04, frictionAir: 0.005});
    stone = new Stone(p5,canvasW/2,600);
    pebble = new Pebble(p5,canvasW/2,700);

    jar.update(Bodies,canvasW,canvasH);
    balance.setup(Bodies);
    stone.setup(Bodies);
    pebble.setup(Bodies);

    World.add(engine.world,stone.body);
    World.add(engine.world,pebble.body);
    //World.add(engine.world,balance.body);
    World.add(engine.world,ball);
    offsetX = 150;
    World.add(engine.world, Constraint.create({
        pointA: { x: canvasW/2, y: 10 },
        bodyB: ball,
        //bodyB: balance.body,
        pointB: {x:-offsetX,y:0},
        stiffness: 0.3,
        damping: 0
    }));
    World.add(engine.world, Constraint.create({
        pointA: { x: canvasW/2, y: 10 },
        bodyB: ball,
        //bodyB: balance.body,
        pointB: {x:offsetX,y:0},
        stiffness: 0.3,
        damping: 0
    }));

    World.add(engine.world,jar.bodies);

    var mouse = Mouse.create(canvas.elt),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.7,
          render: {
            visible: false
          }
        }
      });
    mouseConstraint.mouse.pixelRatio = p5.pixelDensity();
    World.add(engine.world,mouseConstraint);

    Engine.run(engine);
  }

  p5.draw = () => {
    p5.background(51);

    jar.draw();

    p5.beginShape();
    for(var i in ball.vertices) {
      p5.vertex(ball.vertices[i].x,ball.vertices[i].y);
    }
    p5.endShape(p5.CLOSE);

    p5.line(canvasW/2,
            10,
            ball.bounds.min.x+(ball.bounds.max.x-ball.bounds.min.x)/2,
            ball.bounds.min.y+(ball.bounds.max.y-ball.bounds.min.y)/2);
    
    //balance.draw();
    //p5.line(canvasW/2,
    //        10,
    //        balance.body.bounds.min.x-offsetX+(balance.body.bounds.max.x-balance.body.bounds.min.x)/2,
    //        balance.body.bounds.min.y+(balance.body.bounds.max.y-balance.body.bounds.min.y)/2);
    drawStones();
  }

  p5.windowResized = () => {
    canvasW = p5.windowWidth;
    canvasH = p5.windowHeight;
    p5.resizeCanvas(canvasW, canvasH);
    update();
  }

}

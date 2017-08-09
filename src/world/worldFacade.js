import Matter from 'matter-js';
import pathseg from 'pathseg';
import Stone from 'model/Stone';
import Pebble from 'model/Pebble';
import Jar from 'model/Jar';


class WorldFacade {

  constructor(p5,canvasW,canvasH) {
    this.p5 = p5;
    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.Engine = Matter.Engine;
    this.Render = Matter.Render;
    this.World = Matter.World;
    this.Bodies = Matter.Bodies;
    this.Mouse = Matter.Mouse;
    this.MouseConstraint = Matter.MouseConstraint;
    this.Vertices = Matter.Vertices;

    this.engine = null;
    this.world = null;
    this.bodies = null;

    this.jar = null;
    this.stone = null;
    this.pebble = null;
  }

  setup(canvas) {
    this.engine = this.Engine.create();
    this.world = this.engine.world;

    // add mouse control
    var mouse = this.Mouse.create(canvas.elt),
      mouseConstraint = this.MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });
    mouseConstraint.mouse.pixelRatio = this.p5.pixelDensity();

    this.jar = new Jar(this.p5,this.canvasW,this.canvasH);
    this.stone = new Stone(this.p5,this.canvasW/2,600);
    this.pebble = new Pebble(this.p5,this.canvasW/2,700);

    this.jar.setup(this.Bodies);
    this.stone.setup(this.Bodies);
    this.pebble.setup(this.Bodies);

    this.World.add(this.world,mouseConstraint);
    this.World.add(this.world,this.stone.body);
    this.World.add(this.world,this.pebble.body);
    this.World.add(this.engine.world,this.jar.bodies);

    this.Engine.run(this.engine);
  }

  update(canvasW,canvasH) {
    console.log(canvasW);
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.jar.update(this.Bodies,this.canvasW,this.canvasH);
    this.updateStones();
  }

  draw() {
    this.jar.draw();
    this.drawStones();
  }

  updateStones() {
    this.stone.update();
    this.pebble.update();
  };

  drawStones() {
    this.stone.draw();
    this.pebble.draw();
  };

}

export default WorldFacade;

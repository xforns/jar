class MouseInteractor {

  constructor() {
    this.objects = [];
  }

  add(object) {
    console.log(object);
    if(typeof(object.coords)=="object") {
      this.objects.push(object);
    }
  }

  testCollision(mx, my) {
    var obj;
    for(obj of this.objects) {
      if(mx>=obj.coords.x && mx<=obj.coords.mx
        && my>=obj.coords.y && my<=obj.coords.my)
        return obj;
    }
    return undefined;
  }
  
}

export default MouseInteractor;

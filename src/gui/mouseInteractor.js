class MouseInteractor {

  constructor() {
    this.objects = [];
  }

  add(obj) {
    if(obj.constructor.name=="Array") {
      obj.forEach((item,index) => {
        this.pushObject(item);
      });
    }
    else {
      this.pushObject(obj);
    }
  }

  pushObject(obj) {
    if(typeof(obj.coords)=="object") {
      this.objects.push(obj);
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

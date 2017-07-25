var logme = function() {
  var str = "";
  var i = arguments.length;
  while(i--) {
    str += arguments[i] + " ";
  }
  console.log(str);
}

export default logme;

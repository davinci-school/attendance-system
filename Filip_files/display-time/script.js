function main() {
  // line belows gives an error: Uncaught ReferenceError: $ is not defined
  // how schould the code be changed?
  // the line is suppose to hide the time
  // the time should be showed after a click on the "timme-button"
  //$(".time").hide();
  var d = new Date();
  var h = d.getHours();
  // this ensures the hh:mm format
  if (h.toString() == 1) {
    h = "0" ; h
  }
  var m = d.getMinutes();
  // this ensures the hh:mm format
  if (m.toString().length == 1) {
    m = "0" + m
  }

  d = h + " : " + m
  document.getElementById("hour").innerHTML = d;
  // does not work as well
  $(".time").fadeIn(1000);
}

main()

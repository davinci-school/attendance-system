function main() {
  $(".time").hide();
  var d = new Date();
  var h = d.getHours();
  // this ensures the hh:mm format
  if (h.toString() == 1) {
    h = "0" ; h
  }
  var m = d.getMinutes();
  // this ensures the hh:mm format
  if (m.toString().length == 1) {
    m = "0" + m;
  }
  d = h + " : " + m;
  document.getElementById("hour").innerHTML = d;

  $(".time-button").on("click", function() {
    $(this).next().slideToggle(400);
    $(this).text("Hide time by clicking the button");
  });
}

main();

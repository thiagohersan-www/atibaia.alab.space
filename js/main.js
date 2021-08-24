setTimeout(function() {
  window.location.href = "2016/";
}, 10e3);

function lerpValue(y0, y1, pos) {
  return (y0 + pos * (y1 - y0));
}

function trendLerp(pos) {
  pos = Math.max(Math.min(pos, 1.0), 0.0);
  var c0 = parseInt('36A9FE', 16);
  var c1 = parseInt('FF4399', 16);
  var red = lerpValue((c0 >> 16 & 0xff), (c1 >> 16 & 0xff), pos) & 0xff;
  var green = lerpValue((c0 >> 8 & 0xff), (c1 >> 8 & 0xff), pos) & 0xff;
  var blue = lerpValue((c0 >> 0 & 0xff), (c1 >> 0 & 0xff), pos) & 0xff;
  return ""+red.toString(16)+green.toString(16)+blue.toString(16);
}

document.addEventListener("mousemove", function(event) {
  var mouseXpct = event.pageX / window.innerWidth;
  var bgColor = "#"+trendLerp(mouseXpct);
  var txtColor = "#"+trendLerp(1.0-mouseXpct);
  document.getElementsByTagName('body')[0].style.backgroundColor = bgColor;
  document.getElementsByTagName('a')[0].style.color = txtColor;
});

document.addEventListener("mousemove", function(event) {
  const x = event.clientX - 20;
  const y = event.clientY - 20;
  const cursor = document.querySelector("#cursor");
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
});

document.addEventListener("scroll", function(event) {
  const cursor = document.querySelector("#cursor");
  cursor.style.left = event.clientX;
  cursor.style.top = event.clientY;
});

document.addEventListener("mousedown",function(event) {
  document.getElementById("cursor").style.transform = 'scale(0.5)';
})

document.addEventListener("mouseup",function(event) {
  document.getElementById("cursor").style.transform = 'scale(1)';
})


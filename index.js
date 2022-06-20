const items = document.querySelectorAll(".item");
const textBulle = document.getElementById("textBulle");
const container = document.getElementById("container");
const colorChange = document.getElementById("color");
let dragged;

function drag_start(event) {
  let style = window.getComputedStyle(event.target, null);
  dragged = event.target;
  event.dataTransfer.setData(
    "text/plain",
    parseInt(style.getPropertyValue("left"), 10) -
      event.clientX +
      "," +
      (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
  );
}
function drag_over(event) {
  event.preventDefault();
  return false;
}
function drop(event) {
  let offset = event.dataTransfer.getData("text/plain").split(",");
  let dm = dragged;
  dm.style.left = event.clientX + parseInt(offset[0], 10) + "px";
  dm.style.top = event.clientY + parseInt(offset[1], 10) + "px";

  event.preventDefault();
  return false;
}
document.body.addEventListener("dragover", drag_over, false);
document.body.addEventListener("drop", drop, false);
// });

let create = document.querySelector(".create");

create.addEventListener("click", () => {
  const createNew = document.createElement("div");
  const createP = document.createElement("p");
  createNew.setAttribute("class", "item");
  createNew.setAttribute("draggable", true);
  createP.setAttribute("class", "itemP");

  let box = document.querySelector(".box");

  box.appendChild(createNew);
  createNew.appendChild(createP);

  new ResizeObserver(() => resize(createNew)).observe(createNew);

  createNew.addEventListener("dragstart", drag_start);
  createNew.addEventListener("click", (i) => {
    textBulle.value = createNew.textContent;

    dragged = createP;
  });
});

const deleteButton = document.querySelector(".delete");

deleteButton.addEventListener("dragover", (i) => {
  i.preventDefault();
});

deleteButton.addEventListener("dragover", (i) => {
  i.preventDefault();
  dragged.remove();
});

textBulle.addEventListener("keyup", (i) => {
  dragged.innerHTML = textBulle.value;
});

colorChange.addEventListener("input", (i) => {
  dragged.style.color = i.target.value;
});

function resize(i) {
  i.scrollHeight;
}

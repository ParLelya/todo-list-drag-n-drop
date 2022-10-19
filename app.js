const item = document.querySelector(".item");
const placeholders = document.querySelectorAll(".placeholder");
const addTask = document.querySelector(".todo__input");

item.addEventListener("dragstart", dragStart);
item.addEventListener("dragend", dragEnd);
addTask.addEventListener("click", function (event) {
  if (event.target.closest(".todo__add")) {
    todo.add();
    todo.save();
  }
});

for (placeholder of placeholders) {
  placeholder.addEventListener("dragover", dragOver);
  placeholder.addEventListener("dragenter", dragEnter);
  placeholder.addEventListener("dragleave", dragLeave);
  placeholder.addEventListener("drop", dragDrop);
}

let todo = {
  add() {
    const inputText = document.querySelector(".todo__text");
    if (!inputText.value.length) return;
    document
      .querySelector(".todo__item")
      .insertAdjacentHTML("beforeend", this.create(inputText.value));
    inputText.value = "";
  },

  create(text) {
    return `<div class="item todo__task" draggable="true">${text}</div>`;
  },

  save() {
    localStorage.setItem(
      "draggable-todo",
      document.querySelector(".todo__items").innerHTML
    );
  },

  load() {
    // const fromStorage = localStorage.getItem("draggable-todo");
    // if (fromStorage) document.querySelector(".todo__items").innerHTML = fromStorage;
  },
};

todo.load();

function dragStart(event) {
  event.target.classList.add("hold");
  setTimeout(() => event.target.classList.add("hide"), 0);
}

function dragEnd(event) {
  event.target.classList.remove("hold", "hide");
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.target.classList.add("hovered");
}

function dragLeave(event) {
  event.target.classList.remove("hovered");
}

function dragDrop(event) {
  event.target.classList.remove("hovered");
  event.target.append(item);
}

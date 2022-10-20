let item = document.querySelector(".item");
const placeholders = document.querySelectorAll(".placeholder");
const addTask = document.querySelector(".todo__input");
const field = document.querySelector(".todo__items");

// const fromStorage = localStorage.getItem("drag-todo");
// if (fromStorage) field.innerHTML = fromStorage;

const todo = {
  add() {
    const inputText = document.querySelector(".todo__text");
    if (!inputText.value.length) return;
    document
      .querySelector(".placeholder")
      .insertAdjacentHTML("beforeend", this.create(inputText.value));
    inputText.value = "";
  },

  create(text) {
    return `<div class="item" draggable="true">${text}</div>`;
  },

  delete() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Delete" && item) {
        item.remove();
      }
    });
    this.save();
  },

  save() {
    // localStorage.setItem("drag-todo", field.innerHTML);
  },
};

todo.delete();

addTask.addEventListener("click", function (event) {
  if (event.target.closest(".todo__add")) {
    todo.add();
    todo.save();
  }
});

field.addEventListener("mouseover", (event) => {
  item = event.target.closest(".item");
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

for (let placeholder of placeholders) {
  placeholder.addEventListener("dragover", dragOver);
  placeholder.addEventListener("dragenter", dragEnter);
  placeholder.addEventListener("dragleave", dragLeave);
  placeholder.addEventListener("drop", dragDrop);
}

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

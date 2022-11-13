// Define all necessary variables
const gridWrapper = document.querySelector(".grid-wrapper");
const promptBtn = document.querySelector("#prompt");
const resetButton = document.getElementById("reset");
const eraserBtn = document.getElementById("eraser");
const randomBtn = document.getElementById("random");

// App Starts
let gridSize = 32;
console.log("APP has started...Initial Grid Size:");
console.log(gridSize);

// Empty the etch-a-sketch grid of any children (boxes)
const removeChilds = (parent) => {
  while (parent.childNodes.length > 4) {
    parent.removeChild(parent.lastChild);
  }
};

function createGrid(size, colors) {
  // Empty grid/wrapper of any previous boxes before creating new grid
  removeChilds(gridWrapper);
  changeGrid();

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("box");
    if (colors === "random") {
      square.addEventListener("mouseover", function (e) {
        // square.classList.add("random-colored");
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        console.log(randomColor);
        square.style.backgroundColor = "#" + randomColor;
      });
    } else {
      square.addEventListener("mouseover", function (e) {
        square.classList.add("colored");
      });
    }
    gridWrapper.appendChild(square);
  }
}
// Create initial default grid
createGrid(gridSize);

//  Change actual grid columns and rows in CSS
function changeGrid() {
  document.getElementById(
    "etch"
  ).style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  document.getElementById(
    "etch"
  ).style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

let colorModeOn = false;
// Get new gridSize from user
function promptUser() {
  gridSize = prompt("Enter a number between 1 and 100.");
  if (gridSize >= 1 && gridSize <= 100) {
    changeGrid();
    if (colorModeOn) {
      createGrid(gridSize, "random");
    } else {
      createGrid(gridSize);
    }
  }
}
promptBtn.addEventListener("click", promptUser);

// Reset the Grid (Erase everything)
resetButton.addEventListener("click", () => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.classList.remove("colored");
  });
  createGrid(gridSize);
  if (eraserCount % 2 != 0) toggleEraser();
});

// Use eraserCount variable to keep track of state
let eraserCount = 2;
function toggleEraser() {
  // Style button to show it is active
  eraserBtn.classList.toggle("active-button");
  // Check active status of eraserCount before proceeding
  if (eraserCount % 2 == 0) {
    // Make all boxes so they're erased when mouseovered
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("mouseover", () => {
        box.classList.remove("colored");
      });
    });
    // Reenable normal mouseover behavior when toggling eraser off
  } else {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("mouseover", () => {
        box.classList.add("colored");
      });
    });
  }
  // Increase counter for erasureMode "state" hack
  eraserCount++;
  console.log(eraserCount);
}

eraserBtn.addEventListener("click", toggleEraser);

function randomizeGrid() {
  randomBtn.classList.toggle("random-btn-active");
  if (eraserCount % 2 != 0) toggleEraser();
  changeGrid();
  if (!colorModeOn) {
    colorModeOn = true;
    createGrid(gridSize, "random");
  } else {
    colorModeOn = false;
    createGrid(gridSize, "");
  }
}

randomBtn.addEventListener("click", randomizeGrid);

import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wan's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
const counterDisplay: HTMLParagraphElement =
  app.querySelector("#counterDisplay")!;
const incrementButton: HTMLButtonElement =
  app.querySelector("#incrementButton")!;

function updateCounterDisplay() {
  counterDisplay.textContent = `${counter} 🍪`;
}

function incrementCounter() {
  counter++;
  updateCounterDisplay();
}

incrementButton.addEventListener("click", incrementCounter);

updateCounterDisplay();

setInterval(incrementCounter, 1000);
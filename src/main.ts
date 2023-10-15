import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wan's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
let lastTimestamp: number = 0;
const counterDisplay: HTMLParagraphElement = app.querySelector("#counterDisplay")!;
const incrementButton: HTMLButtonElement = app.querySelector("#incrementButton")!;

function updateCounterDisplay() {
  counterDisplay.textContent = `${counter.toFixed(2)} 🍪`;
}

function incrementCounter() {
  counter++;
  updateCounterDisplay();
}

function continuousCounter(timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }

  const elapsedTime = timestamp - lastTimestamp;
  const incrementAmount = (1 / 60) * (elapsedTime / 1000);

  counter += incrementAmount;
  updateCounterDisplay();
  lastTimestamp = timestamp;

  requestAnimationFrame(continuousCounter);
}

incrementButton.addEventListener("click", incrementCounter);

updateCounterDisplay();

//setInterval(incrementCounter, 1000);

requestAnimationFrame(continuousCounter);

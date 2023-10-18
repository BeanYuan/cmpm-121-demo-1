import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wan's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
let growthRate: number = 0;
let lastTimestamp: number = 0;

const counterDisplay: HTMLParagraphElement =
  app.querySelector("#counterDisplay")!;
const incrementButton: HTMLButtonElement =
  app.querySelector("#incrementButton")!;
const upgradeButton: HTMLButtonElement = app.querySelector("#upgradeButton")!;

function updateCounterDisplay() {
  counterDisplay.textContent = `${counter.toFixed(2)} 🍪`;
}

function incrementCounter() {
  counter++;
  updateCounterDisplay();
  updateUpgradeButton();
}

function continuousCounter(timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }

  const elapsedTime = timestamp - lastTimestamp;
  const incrementAmount = (growthRate / 60) * (elapsedTime / 1000);

  counter += incrementAmount;
  updateCounterDisplay();
  updateUpgradeButton();
  lastTimestamp = timestamp;

  requestAnimationFrame(continuousCounter);
}

function updateUpgradeButton() {
  if (counter >= 10) {
    upgradeButton.disabled = false;
  } else {
    upgradeButton.disabled = true;
  }
}

function upgrade() {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 units
    growthRate += 1; // Increment the growth rate by 1
    updateCounterDisplay();
    updateUpgradeButton();
  }
}

incrementButton.addEventListener("click", incrementCounter);
upgradeButton.addEventListener("click", upgrade);

updateCounterDisplay();
updateUpgradeButton();

//setInterval(incrementCounter, 1000);

requestAnimationFrame(continuousCounter);

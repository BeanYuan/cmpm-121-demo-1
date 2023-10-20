import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Wan's Space Exploration";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
let growthRate: number = 0;
let lastTimestamp: number = 0;

const counterDisplay = document.createElement("p");
counterDisplay.id = "counterDisplay";
app.append(counterDisplay);

const growthRateDisplay = document.createElement("p");
growthRateDisplay.id = "growthRateDisplay";
app.append(growthRateDisplay);

const incrementButton = document.createElement("button");
incrementButton.id = "incrementButton";
incrementButton.innerHTML = "🌍"; // Planet emoji as the main button
app.append(incrementButton);

const buttonContainer = document.createElement("div");
buttonContainer.id = "buttonContainer";
app.append(buttonContainer);

type UpgradeItem = {
  id: string;
  cost: number;
  rate: number;
  count: number;
  button: HTMLButtonElement;
};

const upgrades: UpgradeItem[] = [
  {
    id: "scoutShip",
    cost: 10,
    rate: 0.1,
    count: 0,
    button: document.createElement("button"),
  },
  {
    id: "colonyShip",
    cost: 100,
    rate: 2.0,
    count: 0,
    button: document.createElement("button"),
  },
  {
    id: "galacticFleet",
    cost: 1000,
    rate: 50,
    count: 0,
    button: document.createElement("button"),
  },
];

upgrades.forEach((upgrade) => {
  upgrade.button.id = upgrade.id;
  const upgradeName =
    upgrade.id.charAt(0).toUpperCase() +
    upgrade.id.slice(1).replace(/([A-Z])/g, " $1"); // Convert camelCase to words
  upgrade.button.innerHTML = `🚀 ${upgradeName} (Cost: ${upgrade.cost})`; // Rocket emoji for upgrades
  buttonContainer.append(upgrade.button);

  upgrade.button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.rate;
      upgrade.count++;
      upgrade.cost *= 1.15;
      updateDisplays();
    }
  });
});

function updateDisplays() {
  counterDisplay.textContent = `${counter.toFixed(2)} galaxies`; // Labeling the units as galaxies
  growthRateDisplay.textContent = `${growthRate.toFixed(2)} galaxies/sec`;
  updateUpgradeButtons();
}

function updateUpgradeButtons() {
  upgrades.forEach((upgrade) => {
    if (counter >= upgrade.cost) {
      upgrade.button.disabled = false;
    } else {
      upgrade.button.disabled = true;
    }
    const upgradeName =
      upgrade.id.charAt(0).toUpperCase() +
      upgrade.id.slice(1).replace(/([A-Z])/g, " $1");
    upgrade.button.innerHTML = `🚀 ${upgradeName} (Cost: ${upgrade.cost.toFixed(
      2,
    )}) - Owned: ${upgrade.count}`;
  });
}

function incrementCounter() {
  counter++;
  updateDisplays();
}

function continuousCounter(timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }

  const elapsedTime = timestamp - lastTimestamp;
  const incrementAmount = growthRate * (elapsedTime / 1000);

  counter += incrementAmount;
  updateDisplays();
  lastTimestamp = timestamp;

  requestAnimationFrame(continuousCounter);
}

incrementButton.addEventListener("click", incrementCounter);

updateDisplays();

requestAnimationFrame(continuousCounter);

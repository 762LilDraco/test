let character = {
  name: "",
  gender: "",
  nationality: "",
  age: 0,
  happiness: 50,
  health: 50,
  smarts: 50,
  looks: 50,
  money: 1000
};

const createBtn = document.getElementById("createBtn");
const nextYearBtn = document.getElementById("nextYearBtn");
const charInfo = document.getElementById("charInfo");
const events = document.getElementById("events");

createBtn.addEventListener("click", () => {
  character.name = document.getElementById("charName").value || "Player";
  character.gender = document.getElementById("charGender").value;
  character.nationality = document.getElementById("charNationality").value;

  document.getElementById("creation").style.display = "none";
  document.getElementById("game").style.display = "block";

  updateUI();
  events.innerHTML = "<p>Welcome to life!</p>";
});

nextYearBtn.addEventListener("click", () => {
  character.age++;
  character.happiness = clamp(character.happiness + random(-5, 5), 0, 100);
  character.health = clamp(character.health + random(-5, 5), 0, 100);
  character.smarts = clamp(character.smarts + random(0, 5), 0, 100);
  character.looks = clamp(character.looks + random(-2, 2), 0, 100);
  character.money = Math.max(character.money + random(-200, 500), 0);

  generateRandomEvent();
  updateUI();
});

function updateUI() {
  charInfo.textContent = `${character.name} (${character.gender}, ${character.nationality})`;
  document.getElementById("age").textContent = character.age;
  document.getElementById("happiness").textContent = character.happiness;
  document.getElementById("health").textContent = character.health;
  document.getElementById("smarts").textContent = character.smarts;
  document.getElementById("looks").textContent = character.looks;
  document.getElementById("money").textContent = character.money;
}

function generateRandomEvent() {
  const eventsList = [
    "You studied hard this year and gained smarts!",
    "You made a new friend this year.",
    "You got sick and had to visit the doctor.",
    "You got a part-time job and earned money.",
    "You had a bad day and lost some happiness."
  ];
  const randomEvent = eventsList[Math.floor(Math.random() * eventsList.length)];
  events.innerHTML = `<p>${randomEvent}</p>`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

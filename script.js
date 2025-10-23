// ==============================
// CHARACTER SETUP & STATS
// ==============================
let character = {
  name: "",
  gender: "",
  nationality: "",
  age: 0,
  happiness: 50,
  health: 50,
  smarts: 50,
  looks: 50,
  money: 1000,

  // Part 2: Relationships
  family: { parents: [], siblings: [], children: [] },
  friends: [],
  partner: null,

  // Part 3: Education & Career
  educationLevel: 0, // 0=none, 1=school, 2=college, 3=graduated
  job: null,
  jobSalary: 0,
  business: null,

  // Part 4: Finances & Assets
  properties: [],
  vehicles: [],
  loans: [],

  // Part 5: Health & Wellness
  exerciseLevel: 0,
  stress: 50,
  medicalConditions: []
};

const createBtn = document.getElementById("createBtn");
const nextYearBtn = document.getElementById("nextYearBtn");
const charInfo = document.getElementById("charInfo");
const events = document.getElementById("events");

// ==============================
// CHARACTER CREATION
// ==============================
createBtn.addEventListener("click", () => {
  character.name = document.getElementById("charName").value || "Player";
  character.gender = document.getElementById("charGender").value;
  character.nationality = document.getElementById("charNationality").value;

  document.getElementById("creation").style.display = "none";
  document.getElementById("game").style.display = "block";

  generateFamily();
  updateUI();
  events.innerHTML = "<p>Welcome to life!</p>";
});

// ==============================
// YEARLY PROGRESSION
// ==============================
nextYearBtn.addEventListener("click", () => {
  character.age++;

  // Base stats changes
  character.happiness = clamp(character.happiness + random(-5, 5), 0, 100);
  character.health = clamp(character.health + random(-5, 5), 0, 100);
  character.smarts = clamp(character.smarts + random(0, 5), 0, 100);
  character.looks = clamp(character.looks + random(-2, 2), 0, 100);

  // Money from job/business
  if (character.job) character.money += character.jobSalary;
  if (character.business) character.money += character.business.income;

  // Random money change
  character.money = Math.max(character.money + random(-200, 300), 0);

  // --- Part 1 Events ---
  generateRandomEvent();

  // --- Part 2 Relationships ---
  makeFriend();
  tryRomance();
  haveChild();
  postSocialMedia();

  // --- Part 3 Education & Career ---
  educationYearlyProgress();
  careerProgression();

  // --- Part 4 Finances & Assets ---
  handleFinanceOpportunities();

  // --- Part 5 Health & Wellness ---
  handleHealthAndWellness();

  updateUI();
});

// ==============================
// UTILITY FUNCTIONS
// ==============================
function random(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

// ==============================
// PART 1: RANDOM EVENTS
// ==============================
function generateRandomEvent() {
  const eventsList = [
    "You studied hard this year and gained smarts!",
    "You made a new friend this year.",
    "You got sick and had to visit the doctor.",
    "You got a part-time job and earned money.",
    "You had a bad day and lost some happiness."
  ];
  const randomEvent = eventsList[random(0, eventsList.length - 1)];
  events.innerHTML = `<p>${randomEvent}</p>`;
}

// ==============================
// PART 2: RELATIONSHIPS
// ==============================
function generateFamily() {
  const parentNames = ["John", "Mary", "Robert", "Linda", "James", "Patricia"];
  character.family.parents = [
    { name: parentNames[random(0, parentNames.length - 1)], relationship: "Father" },
    { name: parentNames[random(0, parentNames.length - 1)], relationship: "Mother" }
  ];
  const siblingCount = random(0, 2);
  for (let i = 0; i < siblingCount; i++) {
    character.family.siblings.push({ name: parentNames[random(0, parentNames.length - 1)] });
  }
}

function makeFriend() { if (Math.random() < 0.5) {
  const friendNames = ["Alice","Bob","Charlie","Diana","Eve","Frank"];
  const newFriend = { name: friendNames[random(0,friendNames.length-1)], happinessBoost: random(5,10)};
  character.friends.push(newFriend);
  events.innerHTML += `<p>You made a new friend: ${newFriend.name}</p>`;
}}

function tryRomance() { if (!character.partner && Math.random() < 0.3) {
  const names = ["Sam","Alex","Taylor","Jordan","Morgan"];
  character.partner = { name: names[random(0,names.length-1)], happinessBoost:15 };
  events.innerHTML += `<p>You met a potential partner: ${character.partner.name}</p>`;
}}

function haveChild() { if (character.partner && Math.random()<0.2) {
  const childNames = ["Liam","Emma","Noah","Olivia","Ava"];
  const child = { name: childNames[random(0,childNames.length-1)] };
  character.family.children.push(child);
  events.innerHTML += `<p>You had a child named ${child.name} with ${character.partner.name}!</p>`;
}}

function postSocialMedia() {
  const platforms = ["BitBook","BitLifeChat"];
  const platform = platforms[random(0,platforms.length-1)];
  const mood = character.happiness > 50 ? "happy" : "stressed";
  events.innerHTML += `<p>You posted on ${platform} and feel ${mood}!</p>`;
}

// ==============================
// PART 3: EDUCATION & CAREER
// ==============================
function educationYearlyProgress() {
  if(character.age>=5 && character.age<=18){character.educationLevel=1; character.smarts=clamp(character.smarts+random(1,3),0,100);}
  if(character.age===18 && Math.random()<0.7){character.educationLevel=2; events.innerHTML += "<p>You enrolled in college!</p>";}
  if(character.age>=22 && character.educationLevel===2){character.educationLevel=3; events.innerHTML += "<p>You graduated college!</p>";}
}

function careerProgression() {
  if(character.age>=16 && !character.job){const jobs=[{title:"Cashier",salary:500},{title:"Barista",salary:600},{title:"Retail Worker",salary:550}];
  character.job=jobs[random(0,jobs.length-1)]; character.jobSalary=character.job.salary;
  events.innerHTML+=`<p>You started your first job as a ${character.job.title}!</p>`;}
  if(character.age%5===0 && character.job){character.jobSalary+=random(100,300);
  events.innerHTML+=`<p>You got a raise! Your salary is now $${character.jobSalary}</p>`;}
  if(character.age>=25 && !character.business && Math.random()<0.3){
    character.business={name:"Small Business",income:random(200,600)};
    events.innerHTML+=`<p>You started a business called ${character.business.name}!</p>`;
  }
}

// ==============================
// PART 4: FINANCES & ASSETS
// ==============================
function handleFinanceOpportunities() {
  if (Math.random() < 0.2 && character.money > 1000) {
    const propertyNames = ["Apartment","House","Mansion"];
    const price = random(1000,5000);
    const property = { name: propertyNames[random(0,propertyNames.length-1)], value: price };
    character.properties.push(property);
    character.money -= price;
    events.innerHTML += `<p>You bought a ${property.name} for $${price}</p>`;
  }

  if (Math.random() < 0.2 && character.money > 500) {
    const vehicleNames = ["Car","Motorbike","SUV"];
    const price = random(500,2000);
    const vehicle = { name: vehicleNames[random(0,vehicleNames.length-1)], value: price };
    character.vehicles.push(vehicle);
    character.money -= price;
    events.innerHTML += `<p>You bought a ${vehicle.name} for $${price}</p>`;
  }

  if (Math.random() < 0.1) {
    const loanAmount = random(500,2000);
    character.loans.push({ amount: loanAmount, interest: 0.05 });
    character.money += loanAmount;
    events.innerHTML += `<p>You took a loan of $${loanAmount} (5% interest)</p>`;
  }

  character.loans.forEach((loan,index) => {
    if(character.money > loan.amount * 1.05 && Math.random() < 0.5) {
      character.money -= loan.amount * 1.05;
      events.innerHTML += `<p>You paid off a loan of $${loan.amount}</p>`;
      character.loans.splice(index,1);
    }
  });
}

// ==============================
// PART 5: HEALTH & WELLNESS
// ==============================
function handleHealthAndWellness() {
  // Exercise improves health
  if(Math.random()<0.4){ character.exerciseLevel += 1; character.health = clamp(character.health + random(1,5),0,100);
    events.innerHTML += "<p>You exercised and improved your health!</p>";
  }

  // Stress increases/decreases
  character.stress = clamp(character.stress + random(-5,5),0,100);
  if(character.stress > 70) { character.happiness = clamp(character.happiness - random(1,5),0,100); events.innerHTML += "<p>You are stressed this year!</p>"; }

  // Random medical conditions
  if(Math.random()<0.1){
    const conditions = ["Flu","Cold","Broken Arm","Food Poisoning"];
    const condition = conditions[random(0,conditions.length-1)];
    character.medicalConditions.push(condition);
    character.health = clamp(character.health - random(5,15),0,100);
    events.innerHTML += `<p>You suffered from ${condition}!</p>`;
  }
}

// ==============================
// UPDATE UI
// ==============================
function updateUI() {
  charInfo.textContent = `${character.name} (${character.gender}, ${character.nationality})`;

  document.getElementById("age").textContent = character.age;
  document.getElementById("happiness").textContent = character.happiness;
  document.getElementById("health").textContent = character.health;
  document.getElementById("smarts").textContent = character.smarts;
  document.getElementById("looks").textContent = character.looks;
  document.getElementById("money").textContent = character.money;

  console.log("Family:", character.family);
  console.log("Friends:", character.friends);
  if(character.partner) console.log("Partner:", character.partner);
  console.log("Education Level:", character.educationLevel);
  if(character.job) console.log("Job:", character.job.title,"Salary:",character.jobSalary);
  if(character.business) console.log("Business:",character.business.name,"Income:",character.business.income);
  console.log("Properties:", character.properties);
  console.log("Vehicles:", character.vehicles);
  console.log("Loans:", character.loans);
  console.log("Exercise Level:", character.exerciseLevel);
  console.log("Stress:", character.stress);
  console.log("Medical Conditions:", character.medicalConditions);
}

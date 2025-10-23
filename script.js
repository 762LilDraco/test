// ==============================
// CHARACTER OBJECT
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
    family: { children: [], partner: null },
    career: { job: null, business: null },
    assets: { properties: [], vehicles: [], loans: [] },
    hobbies: [],
    cult: { members: [] },
    blackMarket: { history: [] },
    secretAgent: { missions: [] },
    zooAnimals: [],
    politicalCareer: { position: null, approval: 50 },
    outdoorActivities: [],
    racingCareer: { vehicle: null, skill: 0 },
    casino: { moneyGambled: 0 },
    godMode: false,
    timeMachineActive: false,
    descendants: [],
    criminalRecord: [],
};

// ==============================
// HELPER FUNCTIONS
// ==============================
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function clamp(val,min,max){ return Math.min(max, Math.max(min, val)); }

// ==============================
// EVENT LOG
// ==============================
const events = document.getElementById("events");
function logEvent(msg){
    const e = document.createElement("div");
    e.className = "eventPopup";
    e.textContent = msg;
    events.prepend(e);
    // Auto-dismiss after 6 seconds
    setTimeout(()=>e.remove(),6000);
}

// ==============================
// CHARACTER CREATION
// ==============================
document.getElementById("createBtn").addEventListener("click", ()=>{
    character.name = document.getElementById("charName").value || "Player";
    character.gender = document.getElementById("charGender").value;
    character.nationality = document.getElementById("charNationality").value || "Earth";
    document.getElementById("creation").style.display = "none";
    document.getElementById("game").style.display = "block";
    updateUI();
    logEvent(`Welcome, ${character.name}! Life begins now.`);
});

// ==============================
// UPDATE UI
// ==============================
function updateUI(){
    document.getElementById("charInfo").textContent = `${character.name} (${character.gender}, ${character.nationality})`;
    document.getElementById("age").textContent = character.age;
    document.getElementById("money").textContent = character.money;

    ["happiness","health","smarts","looks"].forEach(stat=>{
        const bar = document.getElementById(`${stat}Bar`);
        bar.style.width = `${character[stat]}%`;
        if(character[stat]>=70) bar.style.backgroundColor="green";
        else if(character[stat]>=40) bar.style.backgroundColor="yellow";
        else bar.style.backgroundColor="red";
    });
}

// ==============================
// LIFE ACTIONS
// ==============================
function nextYearInteractive(){
    character.age++;
    randomEvent();
    character.happiness = clamp(character.happiness+Math.floor(Math.random()*5),0,100);
    character.health = clamp(character.health+Math.floor(Math.random()*5),0,100);
    character.smarts = clamp(character.smarts+Math.floor(Math.random()*3),0,100);
    character.looks = clamp(character.looks+Math.floor(Math.random()*2),0,100);
    handleExpansions();
    handleAdvanced();
    updateUI();
}

function goToSchool(){ 
    character.smarts = clamp(character.smarts+5,0,100);
    character.happiness = clamp(character.happiness+2,0,100);
    logEvent("Attended school: Smarts +5, Happiness +2");
}

function skipSchool(){
    character.smarts = clamp(character.smarts-2,0,100);
    character.happiness = clamp(character.happiness+5,0,100);
    logEvent("Skipped school: Smarts -2, Happiness +5");
}

function takeJob(){
    const jobs=["Teacher","Doctor","Engineer","Artist","Chef","Police"];
    character.career.job = pick(jobs);
    const salary = Math.floor(Math.random()*5000+2000);
    character.money += salary;
    logEvent(`Got a job as ${character.career.job}, earned $${salary}`);
}

function startBusiness(){
    const businesses=["Restaurant","Tech Startup","Shop","Bar"];
    character.career.business = pick(businesses);
    const profit = Math.floor(Math.random()*5000+1000);
    character.money += profit;
    logEvent(`Started a business: ${character.career.business}, profit $${profit}`);
}

function datePartner(){
    character.happiness = clamp(character.happiness+5,0,100);
    logEvent("Went on a date: Happiness +5");
}

function haveChild(){
    const name = "Child"+(character.family.children.length+1);
    character.family.children.push({name, age:0});
    character.happiness = clamp(character.happiness+10,0,100);
    logEvent(`Had a child: ${name}, Happiness +10`);
}

function buyProperty(){
    const price = Math.floor(Math.random()*50000+10000);
    if(character.money>=price){
        character.money -= price;
        character.assets.properties.push({name:"Property"+(character.assets.properties.length+1),price});
        logEvent(`Bought property for $${price}`);
    } else logEvent("Not enough money to buy property");
}

function buyVehicle(){
    const price = Math.floor(Math.random()*50000+5000);
    if(character.money>=price){
        character.money -= price;
        character.assets.vehicles.push({name:"Vehicle"+(character.assets.vehicles.length+1),price});
        logEvent(`Bought vehicle for $${price}`);
    } else logEvent("Not enough money to buy vehicle");
}

function takeLoan(){
    const amount = Math.floor(Math.random()*10000+5000);
    character.money += amount;
    character.assets.loans.push(amount);
    logEvent(`Took a loan of $${amount}`);
}

function exercise(){
    character.health = clamp(character.health+5,0,100);
    logEvent("Exercised: Health +5");
}

function visitDoctor(){
    character.health = clamp(character.health+10,0,100);
    character.money -= 50;
    logEvent("Visited doctor: Health +10, Spent $50");
}

function doHobby(){
    character.happiness = clamp(character.happiness+5,0,100);
    logEvent("Engaged in a hobby: Happiness +5");
}

function travel(){
    character.happiness = clamp(character.happiness+10,0,100);
    character.money -= 100;
    logEvent("Traveled: Happiness +10, Spent $100");
}

// ==============================
// EXPANSIONS ACTIONS
// ==============================
function investStocks(){
    const investment = Math.floor(Math.random()*1000+100);
    const profit = Math.floor(investment*(Math.random()*1.5));
    character.money += profit;
    logEvent(`Invested in stocks: Earned $${profit}`);
}

function buyRentalProperty(){
    const price = Math.floor(Math.random()*50000+10000);
    if(character.money>=price){
        character.money -= price;
        character.assets.properties.push({name:"Rental"+(character.assets.properties.length+1),price,rent:Math.floor(Math.random()*1000+200)});
        logEvent(`Bought rental property for $${price}`);
    } else logEvent("Not enough money for rental property");
}

function doBlackMarket(){
    const gain = Math.floor(Math.random()*500+100);
    if(Math.random()<0.3){
        const jail=Math.floor(Math.random()*5+1);
        logEvent(`Caught on black market! Jail for ${jail} years`);
    } else{
        character.money += gain;
        logEvent(`Black Market deal successful: Earned $${gain}`);
    }
}

function recruitCult(){
    character.cult.members.push({name:"Follower"+(character.cult.members.length+1),loyalty:100});
    logEvent("Recruited a cult member!");
}

function startMission(){
    if(Math.random()<0.7){
        const reward=Math.floor(Math.random()*2000+500);
        character.money += reward;
        logEvent(`Secret Agent mission success! Earned $${reward}`);
    } else logEvent("Secret Agent mission failed!");
}

function addZooAnimal(){
    character.zooAnimals.push({species:"Animal"+(character.zooAnimals.length+1),health:100});
    logEvent("Added an animal to the zoo!");
}

function runForOffice(){
    const positions=["Mayor","Governor","Senator","President"];
    character.politicalCareer.position=pick(positions);
    logEvent(`Elected to office: ${character.politicalCareer.position}`);
}

function outdoorActivity(){
    const acts=["Camping","Hiking","Fishing"];
    character.outdoorActivities.push(pick(acts));
    character.happiness=clamp(character.happiness+5,0,100);
    logEvent("Enjoyed outdoor activity: Happiness +5");
}

function racingEvent(){
    const earned=Math.floor(Math.random()*2000+200);
    character.money += earned;
    logEvent(`Racing event completed! Earned $${earned}`);
}

function casinoGamble(){
    const wager=Math.floor(Math.random()*500+50);
    if(Math.random()<0.5) {
        character.money += wager;
        logEvent(`Won casino gamble: +$${wager}`);
    } else {
        character.money -= wager;
        logEvent(`Lost casino gamble: -$${wager}`);
    }
}

// ==============================
// ADVANCED FEATURES
// ==============================
function toggleGodMode(){
    character.godMode = !character.godMode;
    logEvent(`God Mode ${character.godMode?"Enabled":"Disabled"}`);
}

function timeTravel(){
    const years = Math.floor(Math.random()*50-25);
    character.age = clamp(character.age+years,0,100);
    logEvent(`Time traveled ${years} years`);
}

function continueWithDescendant(){
    if(character.family.children.length>0){
        const child=pick(character.family.children);
        const desc=JSON.parse(JSON.stringify(character));
        desc.name=`${child.name}'s Descendant`;
        desc.age=0;
        character.descendants.push(desc);
        logEvent(`Continue life with descendant: ${desc.name}`);
    } else logEvent("No children to continue with");
}

// ==============================
// RANDOM EVENTS
// ==============================
function randomEvent(){
    const eventsList=["Found money","Met someone new","Attended community event","Accident happened"];
    if(Math.random()<0.2) logEvent(`Random Event: ${pick(eventsList)}`);
}

// ==============================
// HANDLE EXPANSIONS & ADVANCED
// ==============================
function handleExpansions(){
    if(Math.random()<0.05) doBlackMarket();
    if(Math.random()<0.03) recruitCult();
    if(Math.random()<0.03) startMission();
    if(Math.random()<0.03) addZooAnimal();
    if(Math.random()<0.03) runForOffice();
    if(Math.random()<0.03) outdoorActivity();
    if(Math.random()<0.03) racingEvent();
    if(Math.random()<0.03) casinoGamble();
}

function handleAdvanced(){
    if(character.godMode){
        ["happiness","health","smarts","looks"].forEach(s=>character[s]=100);
        character.money=1000000;
    }
}

// ==============================
// MENU CARD INTERACTIVITY
// ==============================
const menuCards = document.querySelectorAll(".menuCard");
const panels = document.querySelectorAll(".tabPanel");

menuCards.forEach(card => {
    card.addEventListener("click", () => {
        const targetPanel = document.getElementById(card.dataset.panel);

        panels.forEach(p => p.classList.remove("active"));
        if(targetPanel) targetPanel.classList.add("active");

        menuCards.forEach(c => c.style.boxShadow = "none");
        card.style.boxShadow = "0 0 15px #00bfff";
    });
});

// Default panel active
document.getElementById("life").classList.add("active");
menuCards.forEach(c => c.style.boxShadow = "none");
menuCards[0].style.boxShadow = "0 0 15px #00bfff"; // Life menu highlight

// ==============================
// FULLY INTEGRATED BITLIFE CLONE
// script.js
// Includes: Base Game + All Expansions + Advanced Features
// ==============================

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
    
    // Relationships
    family: { parents: [], siblings: [], children: [] },
    friends: [],
    partner: null,
    
    // Education & Career
    educationLevel: 0,
    job: null,
    jobSalary: 0,
    business: null,
    
    // Finances & Assets
    properties: [],
    vehicles: [],
    loans: [],
    
    // Health & Wellness
    exerciseLevel: 0,
    stress: 50,
    medicalConditions: [],
    
    // Crime & Legal
    criminalRecord: [],
    inJail: false,
    jailYears: 0,
    
    // Leisure
    hobbies: [],
    travelHistory: [],
    entertainmentHistory: [],
    
    // Expansions
    stocksHistory: [],
    realEstateHistory: [],
    rentalProperties: [],
    contrabandHistory: [],
    cult: { members: [], events: [] },
    missions: [],
    zooAnimals: [],
    politicalCareer: { position: null, approval: 50 },
    outdoorActivities: [],
    racingCareer: { vehicle: null, skill: 0 },
    casino: { income: 0, staff: [] },
    
    // Advanced
    descendants: [],
    godMode: false,
    timeMachineActive: false
};

// ==============================
// HTML ELEMENTS
// ==============================
const createBtn = document.getElementById("createBtn");
const nextYearBtn = document.getElementById("nextYearBtn");
const charInfo = document.getElementById("charInfo");
const events = document.getElementById("events");

// ==============================
// HELPER FUNCTIONS
// ==============================
function random(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function clamp(val,min,max){ return Math.min(Math.max(val,min),max); }
function pick(arr){ return arr[random(0,arr.length-1)]; }

// ==============================
// CHARACTER CREATION
// ==============================
createBtn.addEventListener("click", ()=>{
    character.name = document.getElementById("charName").value || "Player";
    character.gender = document.getElementById("charGender").value;
    character.nationality = document.getElementById("charNationality").value;

    document.getElementById("creation").style.display="none";
    document.getElementById("game").style.display="block";

    generateFamily();
    updateUI();
    logEvent("Welcome to your life journey!");
});

// ==============================
// YEARLY GAME LOOP
// ==============================
nextYearBtn.addEventListener("click",()=>{
    if(character.inJail){
        character.jailYears--;
        logEvent(`You are in jail. Years remaining: ${character.jailYears}`);
        if(character.jailYears<=0) character.inJail=false;
        updateUI();
        return;
    }

    character.age++;
    // Base Stats progression
    character.happiness = clamp(character.happiness + random(-5,5),0,100);
    character.health = clamp(character.health + random(-5,5),0,100);
    character.smarts = clamp(character.smarts + random(0,5),0,100);
    character.looks = clamp(character.looks + random(-2,2),0,100);

    // Money from job/business
    if(character.job) character.money += character.jobSalary;
    if(character.business) character.money += character.business.income;

    character.money = Math.max(character.money + random(-200,300),0);

    // ==============================
    // RUN ALL SYSTEMS INTEGRATED
    // ==============================
    randomEvent();
    handleRelationships();
    handleEducationCareer();
    handleFinances();
    handleHealth();
    handleCrime();
    handleLeisure();
    handleInvestorLandlord();
    handleBlackMarket();
    handleCult();
    handleSecretAgent();
    handleZoo();
    handlePolitical();
    handleOutdoor();
    handleRacing();
    handleCasino();
    handleAdvanced();

    updateUI();
});

// ==============================
// LOG EVENTS
// ==============================
function logEvent(msg){ events.innerHTML += `<p>${msg}</p>`; }

// ==============================
// FAMILY & RELATIONSHIPS
// ==============================
function generateFamily(){
    const names = ["John","Mary","Robert","Linda","James","Patricia"];
    character.family.parents = [
        {name: pick(names), relationship:"Father"},
        {name: pick(names), relationship:"Mother"}
    ];
    for(let i=0;i<random(0,2);i++) character.family.siblings.push({name:pick(names)});
}

function handleRelationships(){
    // Friendships
    if(Math.random()<0.5){
        const fNames = ["Alice","Bob","Charlie","Diana","Eve","Frank"];
        const f = {name:pick(fNames), happinessBoost:random(5,10)};
        character.friends.push(f);
        logEvent(`You made a new friend: ${f.name}`);
    }
    // Romance
    if(!character.partner && Math.random()<0.3){
        const names = ["Sam","Alex","Taylor","Jordan","Morgan"];
        character.partner = {name:pick(names), happinessBoost:15};
        logEvent(`You started dating ${character.partner.name}`);
    }
    // Children
    if(character.partner && Math.random()<0.2){
        const childNames = ["Liam","Emma","Noah","Olivia","Ava"];
        const c = {name:pick(childNames)};
        character.family.children.push(c);
        logEvent(`You had a child named ${c.name} with ${character.partner.name}`);
    }
    // Social Media
    const platforms=["BitBook","BitLifeChat"];
    const p=pick(platforms);
    const mood=character.happiness>50?"happy":"stressed";
    logEvent(`You posted on ${p} and feel ${mood}`);
}

// ==============================
// EDUCATION & CAREERS
// ==============================
function handleEducationCareer(){
    if(character.age>=5 && character.age<=18) character.educationLevel=1; // school
    if(character.age==18 && Math.random()<0.7){ 
        character.educationLevel=2; 
        logEvent("You enrolled in college!"); 
    }
    if(character.age>=22 && character.educationLevel==2){ 
        character.educationLevel=3; 
        logEvent("You graduated college!"); 
    }

    if(character.age>=16 && !character.job){
        const jobs=[
            {title:"Cashier",salary:500},{title:"Barista",salary:600},
            {title:"Retail Worker",salary:550},{title:"Software Developer",salary:1200},
            {title:"Teacher",salary:800}
        ];
        character.job=pick(jobs);
        character.jobSalary=character.job.salary;
        logEvent(`You started your first job as a ${character.job.title}!`);
    }

    if(character.age%5===0 && character.job){
        const raise=random(100,300);
        character.jobSalary+=raise;
        logEvent(`You got a raise! Your salary is now $${character.jobSalary}`);
    }

    // Business
    if(character.age>=25 && !character.business && Math.random()<0.3){
        character.business={name:"Small Business",income:random(200,600)};
        logEvent(`You started a business called ${character.business.name}!`);
    }
}

// ==============================
// FINANCES & ASSETS
// ==============================
function handleFinances(){
    // Buy properties
    if(Math.random()<0.2 && character.money>1000){
        const props=["Apartment","House","Mansion"];
        const price=random(1000,5000);
        const property={name:pick(props), value:price};
        character.money-=price;
        character.properties.push(property);
        logEvent(`You bought a ${property.name} for $${price}`);
    }
    // Vehicles
    if(Math.random()<0.2 && character.money>500){
        const cars=["Car","Motorbike","SUV"];
        const price=random(500,2000);
        const v={name:pick(cars), value:price};
        character.money-=price;
        character.vehicles.push(v);
        logEvent(`You bought a ${v.name} for $${price}`);
    }
    // Loans
    if(Math.random()<0.1){
        const loan=random(500,2000);
        character.loans.push({amount:loan,interest:0.05});
        character.money+=loan;
        logEvent(`You took a loan of $${loan} (5% interest)`);
    }
    // Repay
    character.loans.forEach((l,i)=>{
        if(character.money>l.amount*1.05 && Math.random()<0.5){
            character.money-=l.amount*1.05;
            logEvent(`You paid off a loan of $${l.amount}`);
            character.loans.splice(i,1);
        }
    });
}

// ==============================
// HEALTH & WELLNESS
// ==============================
function handleHealth(){
    if(Math.random()<0.4){
        character.exerciseLevel++;
        character.health=clamp(character.health+random(1,5),0,100);
        logEvent("You exercised and improved your health!");
    }
    character.stress=clamp(character.stress+random(-5,5),0,100);
    if(character.stress>70){
        character.happiness=clamp(character.happiness-random(1,5),0,100);
        logEvent("You are stressed this year!");
    }
    if(Math.random()<0.1){
        const conds=["Flu","Cold","Broken Arm","Food Poisoning"];
        const c=pick(conds);
        character.medicalConditions.push(c);
        character.health=clamp(character.health-random(5,15),0,100);
        logEvent(`You suffered from ${c}!`);
    }
}

// ==============================
// CRIME & LEGAL
// ==============================
function handleCrime(){
    if(Math.random()<0.1 && !character.inJail){
        const crimes=[
            {name:"Petty Theft",moneyGain:random(50,200),risk:0.3},
            {name:"Robbery",moneyGain:random(200,1000),risk:0.5},
            {name:"Fraud",moneyGain:random(500,2000),risk:0.4}
        ];
        const c=pick(crimes);
        character.money+=c.moneyGain;
        logEvent(`You committed a crime: ${c.name}`);
        if(Math.random()<c.risk){
            const jail=random(1,3);
            character.inJail=true;
            character.jailYears=jail;
            character.criminalRecord.push({crime:c.name,year:character.age});
            logEvent(`You got caught! Sentenced to ${jail} years in jail.`);
        } else logEvent("You got away with it!");
    }
}

// ==============================
// LEISURE & ACTIVITIES
// ==============================
function handleLeisure(){
    if(Math.random()<0.5){
        const hobbies=["Reading","Sports","Painting","Music","Gaming"];
        const h=pick(hobbies);
        character.hobbies.push(h);
        character.happiness=clamp(character.happiness+random(1,5),0,100);
        logEvent(`You enjoyed ${h} this year.`);
    }
    if(Math.random()<0.3 && character.money>200){
        const locs=["Paris","New York","Tokyo","London","Sydney"];
        const l=pick(locs);
        character.travelHistory.push(l);
        character.money-=random(100,300);
        character.happiness=clamp(character.happiness+random(2,6),0,100);
        logEvent(`You traveled to ${l}!`);
    }
    if(Math.random()<0.4 && character.money>50){
        const acts=["Movie","Concert","Sport Event","Festival"];
        const a=pick(acts);
        character.entertainmentHistory.push(a);
        character.money-=random(20,100);
        character.happiness=clamp(character.happiness+random(1,4),0,100);
        logEvent(`You attended a ${a}.`);
    }
}

// ==============================
// EXPANSION PACKS (Fully Integrated)
// ==============================
function handleInvestorLandlord(){
    // Stocks & Real Estate
    if(Math.random()<0.2 && character.money>500){
        const stocks=["TechCorp","HealthInc","AutoMakers","BankingCo"];
        const s=pick(stocks);
        const invest=random(100,500);
        const gain=random(-0.3,0.5);
        character.money-=invest;
        const profit=Math.floor(invest*(1+gain));
        character.money+=profit;
        character.stocksHistory.push({stock:s,investment:invest,profit});
        logEvent(`Invested $${invest} in ${s}, profit $${profit-invest}`);
    }
    if(Math.random()<0.1 && character.money>1000){
        const props=["Apartment","Condo","Villa"];
        const price=random(1000,3000);
        const prop={name:pick(props), value:price};
        character.money-=price;
        const sellVal=Math.floor(price*(1+random(-0.2,0.5)));
        character.money+=sellVal;
        character.realEstateHistory.push({property:prop.name,bought:price,sold:sellVal});
        logEvent(`Bought ${prop.name} for $${price}, sold for $${sellVal}`);
    }
    // Rental Properties
    if(Math.random()<0.1 && character.money>1500){
        const pTypes=["Apartment","Condo","House"];
        const pVal=random(1500,4000);
        const p={name:pick(pTypes), value:pVal, tenants:random(1,5), rentPerTenant:random(200,500)};
        character.money-=pVal;
        character.rentalProperties.push(p);
        logEvent(`Purchased rental property: ${p.name} for $${pVal}`);
    }
    character.rentalProperties.forEach(p=>{
        if(Math.random()<0.2){
            const issues=["Noisy tenant","Damage to property","Late payment"];
            logEvent(`Tenant issue at ${p.name}: ${pick(issues)}`);
            character.happiness=clamp(character.happiness-random(2,5),0,100);
        }
        const rent=p.tenants*p.rentPerTenant;
        character.money+=rent;
        logEvent(`Collected $${rent} rent from ${p.tenants} tenants at ${p.name}`);
    });
}

// ==============================
// BLACK MARKET
// ==============================
function handleBlackMarket(){
    if(Math.random()<0.1 && !character.inJail){
        const items=["Rare Art","Illegal Weapons","Smuggled Goods","Counterfeit Money"];
        const i=pick(items);
        const cost=random(200,1000);
        const profit=random(0.5,2.0);
        const risk=0.4+Math.random()*0.3;
        character.money-=cost;
        logEvent(`Bought ${i} on the black market for $${cost}`);
        if(Math.random()<risk){
            const jail=random(1,4);
            character.inJail=true;
            character.jailYears=jail;
            character.criminalRecord.push({crime:`Black Market ${i}`,year:character.age});
            logEvent(`Caught dealing ${i}! ${jail} years in jail.`);
        } else {
            const gain=Math.floor(cost*profit);
            character.money+=gain;
            character.contrabandHistory.push({item:i,investment:cost,profit:gain});
            logEvent(`Sold ${i} for $${gain}, profit $${gain-cost}`);
        }
    }
}

// ==============================
// CULT
// ==============================
function handleCult(){
    if(Math.random()<0.05 && character.age>=25 && character.cult.members.length===0){
        character.cult.members.push({name:character.name, loyalty:100});
        logEvent(`You founded a cult and recruited yourself!`);
    }
    if(character.cult.members.length>0 && Math.random()<0.1){
        const names=["Alex","Jordan","Taylor","Morgan"];
        const f={name:pick(names), loyalty:random(50,100)};
        character.cult.members.push(f);
        logEvent(`Recruited cult member: ${f.name}`);
    }
    if(character.cult.members.length>0 && Math.random()<0.05){
        character.happiness=clamp(character.happiness+random(5,10),0,100);
        logEvent("Performed a cult ritual, morale boosted!");
    }
}

// ==============================
// SECRET AGENT
// ==============================
function handleSecretAgent(){
    if(Math.random()<0.05 && character.age>=18){
        const missions=["Spy Infiltration","Intel Gathering","Sabotage","Undercover"];
        const m={name:pick(missions), success:Math.random()<0.7};
        character.missions.push(m);
        if(m.success){
            const reward=random(500,2000);
            character.money+=reward;
            logEvent(`Completed secret mission (${m.name}) and earned $${reward}`);
        } else {
            character.health=clamp(character.health-random(5,15),0,100);
            logEvent(`Failed secret mission (${m.name}). Health lost.`);
        }
    }
}

// ==============================
// ZOO
// ==============================
function handleZoo(){
    if(Math.random()<0.05 && character.age>=20){
        const animals=["Lion","Elephant","Giraffe","Panda","Penguin"];
        const a={species:pick(animals), health:100};
        character.zooAnimals.push(a);
        logEvent(`Added animal to zoo: ${a.species}`);
    }
    character.zooAnimals.forEach(a=>{
        if(Math.random()<0.1){
            a.health=clamp(a.health+random(1,10),0,100);
            logEvent(`Cared for ${a.species}, health improved`);
        }
    });
}

// ==============================
// POLITICAL
// ==============================
function handlePolitical(){
    if(character.age>=30 && !character.politicalCareer.position && Math.random()<0.05){
        const positions=["Mayor","Governor","Senator","President"];
        character.politicalCareer.position=pick(positions);
        logEvent(`Elected to office as ${character.politicalCareer.position}`);
    }
    if(character.politicalCareer.position){
        character.politicalCareer.approval=clamp(character.politicalCareer.approval+random(-5,5),0,100);
        logEvent(`Public approval: ${character.politicalCareer.approval}%`);
    }
}

// ==============================
// OUTDOOR
// ==============================
function handleOutdoor(){
    if(Math.random()<0.1){
        const acts=["Camping","Hiking","Off-roading","Fishing"];
        const a=pick(acts);
        character.outdoorActivities.push(a);
        character.happiness=clamp(character.happiness+random(2,8),0,100);
        logEvent(`Enjoyed outdoor activity: ${a}`);
    }
}

// ==============================
// RACING
// ==============================
function handleRacing(){
    if(Math.random()<0.05 && character.age>=18){
        const vehicles=["Race Car","Motorbike","ATV"];
        character.racingCareer.vehicle=pick(vehicles);
        character.racingCareer.skill=random(1,50);
        logEvent(`Started racing career with ${character.racingCareer.vehicle}`);
    }
    if(character.racingCareer.vehicle && Math.random()<0.1){
        const gain=random(500,2000);
        character.money+=gain;
        character.racingCareer.skill=clamp(character.racingCareer.skill+random(1,5),0,100);
        logEvent(`Raced and earned $${gain}, skill increased`);
    }
}

// ==============================
// CASINO
// ==============================
function handleCasino(){
    if(Math.random()<0.05 && character.age>=21){
        const games=["Blackjack","Roulette","Poker","Slot Machines"];
        const g=pick(games);
        const wager=random(50,500);
        const win=Math.random()<0.5;
        if(win) character.money+=wager; else character.money-=wager;
        logEvent(`Played ${g} at casino and ${win?"won":"lost"} $${wager}`);
    }
}

// ==============================
// ADVANCED FEATURES
// ==============================
function handleAdvanced(){
    // Descendants
    if(character.age>90 && character.family.children.length>0 && Math.random()<0.3){
        const child=pick(character.family.children);
        const desc=JSON.parse(JSON.stringify(character));
        desc.name=`${child.name}'s Descendant`;
        desc.age=0;
        character.descendants.push(desc);
        logEvent(`Continue life with descendant ${desc.name}`);
    }
    // God Mode
    if(character.godMode){
        character.happiness=100;
        character.health=100;
        character.smarts=100;
        character.looks=100;
    }
    // Time Machine
    if(character.timeMachineActive && Math.random()<0.05){
        const jump=random(-50,50);
        character.age=clamp(character.age+jump,0,100);
        logEvent(`Traveled ${jump} years through time!`);
    }
}

// ==============================
// RANDOM EVENTS
// ==============================
function randomEvent(){
    const eventsList=[
        "Found money on the street",
        "Met a stranger who influenced your life",
        "Attended a community event",
        "Unexpected accident"
    ];
    if(Math.random()<0.2) logEvent(`Random Event: ${pick(eventsList)}`);
}

// ==============================
// UPDATE UI
// ==============================
function updateUI(){
    charInfo.textContent=`${character.name} (${character.gender}, ${character.nationality})`;
    document.getElementById("age").textContent=character.age;
    document.getElementById("happiness").textContent=character.happiness;
    document.getElementById("health").textContent=character.health;
    document.getElementById("smarts").textContent=character.smarts;
    document.getElementById("looks").textContent=character.looks;
    document.getElementById("money").textContent=character.money;
}

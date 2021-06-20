/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let pettingTotal = 0;
let welcome = document.getElementById("welcome");
let footer = document.getElementById("footer");
let pettingStatus = document.getElementById("pettingStatus")
let savedKittens = document.getElementById("status")
let counters = `<div id="activeKittensCount" class="d-flex flex-wrap displaycount">Kittens:( ${kittens.length} / 5 ) &emsp; <span id="favor"><span style="color: var(--danger)">&hearts;</span> Favor: ${pettingTotal} / 40</span></div>`;

function getStarted() {
  welcome.remove()
  drawKittens()
}

function startOver() {
  kittens = [];
  pettingTotal = 0;
  savedKittens.textContent = `Saved Kittens: ${kittens.length}`
  pettingStatus.textContent = `Kitten Favor: ${pettingTotal}`
  saveKittens()
}

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */

function addKitten(event) {
  event.preventDefault()
  let catNameForm = event.target
  if (!kittens.some(kitten => kitten.name == catNameForm.name.value)&& kittens.length < 5) {
    let newCatId = generateId()
    let newKitten = {
      id: newCatId,
      name: catNameForm.name.value,
      mood: "happy",
      affection: 7
    }
      kittens.push(newKitten)
      catNameForm.reset()
      saveKittens()
      if (welcome) {
        getStarted()
      } else {
        drawKittens()
      }
  } else {
    alert("Can't add " + catNameForm.name.value)
  }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  window.localStorage.setItem("favor", JSON.stringify(pettingTotal))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedkittens = JSON.parse(window.localStorage.getItem("kittens"))
  let storedfavor = JSON.parse(window.localStorage.getItem("favor"))
  if (storedkittens) {
    kittens = storedkittens
    pettingTotal = storedfavor
    document.getElementById("status").textContent = `Saved Kittens: ${kittens.length}`
    pettingStatus.textContent = `Kitten Favor: ${pettingTotal}`
  }
}

function updateKittenStatus() {
  if (kittens.length >= 1) {
    kittens.forEach(kitten => {
      setKittenMood(kitten)
    })
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
    let kittenListElement = document.getElementById("kittens")
    let kittenListTemplate = ""
    kittens.forEach(kitten => {
      let id = kitten.id
      kittenListTemplate += `
    <div class="d-flex card m-1 bg-dark text-light">
    <div class="d-flex column">
      <img id=${kitten.id} class="kitten m-1" src="https://robohash.org/${kitten.name}?set=set4" alt="cat picture">
        <b>Name: ${kitten.name}</b>
        <b id="${kitten.id}mood">Mood: ${kitten.mood}</b>
        <b id="${kitten.id}affection">Affection: ${kitten.affection}</b>
          <div id="${kitten.id}buttons" class="d-flex row">
          <button class="btn-cancel p-2 action m-1" onclick=pet("${kitten.id}")>Pet</button>
          <button class="p-2 action m-1" onclick=catnip("${kitten.id}")>Catnip</button>
          </div>
        </div>
      </div>
    </div>
    `
  })
  kittenListElement.innerHTML = kittenListTemplate
  drawCounter()
  updateKittenStatus()
}

function drawCounter() {
  counters = `<div id="activeKittensCount" class="d-flex flex-wrap displaycount">Kittens:( ${kittens.length} / 5 ) &emsp; <span id="favor"><span style="color: var(--danger)">&hearts;</span> Favor: ${pettingTotal} / 40</span></div>`
  footer.innerHTML = counters
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let specialcat = findKittenById(id)
  console.log(specialcat)
  let roll = Math.random()
  if (roll >= 0.7) {
    specialcat.affection ++
    increasefavor()
  } else {
    specialcat.affection --
  }
  document.getElementById(`${id}affection`).textContent = `Affection: ${specialcat.affection}`
  setKittenMood(specialcat)
  drawCounter()
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let specialcat = findKittenById(id)
  specialcat.mood = "tolerant"
  document.getElementById(`${id}mood`).textContent = "Mood: Tolerant"
  specialcat.affection = 5
  document.getElementById(`${id}affection`).textContent = "Affection: 5"
  setKittenMood(specialcat)
  saveKittens()
}

function increasefavor() {
  if (pettingTotal < 40) {
    pettingTotal ++
  } else (kittenwisperer())
}

function kittenwisperer() {
  document.getElementById("favor").style.color = "chartreuse"
  function rainbow() {
    let random = Math.random();
    let rcolor
    if (random >= .85) {
      rcolor = "blue"
    } else if (random < .85 && random >= .7) {
      rcolor = "purple"
    } else if (random < .7 && random >= .55) {
      rcolor = "orange"
    } else if (random < .55 && random >= .4) {
      rcolor = "green"
    } else if (random < .4 && random >= .25) {
      rcolor = "yellow"
    } else if (random < .25 && random >= .1) {
      rcolor = "red"
    } else {
      rcolor = "violet"
    }
    document.getElementById("favor").style.color = rcolor;
  }
  setTimeout(rainbow, 1000)
  setTimeout(rainbow, 1250)
  setTimeout(rainbow, 1500)
  setTimeout(rainbow, 1750)
  setTimeout(rainbow, 2000)
  setTimeout(rainbow, 2250)
  setTimeout(rainbow, 2500)
  setTimeout(rainbow, 2750)
  setTimeout(rainbow, 3000)
  // @ts-ignore
  setTimeout(favor => document.getElementById("manmeow").play(), 3000)
  setTimeout(favor => document.getElementById("moodyWin").classList.remove("hidden"), 3000)
  kittens = [];
  pettingTotal = 0
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 6) {
    kitten.mood = "Happy"
    document.getElementById(`${kitten.id}mood`).textContent = "Mood: Happy"
    document.getElementById(`${kitten.id}`).classList.add("happy")
    document.getElementById(`${kitten.id}`).classList.remove("tolerant")
  } else if (kitten.affection <= 5 && kitten.affection > 3) {
    kitten.mood = "Tolerant"
    document.getElementById(`${kitten.id}mood`).textContent = "Mood: Tolerant"
    document.getElementById(`${kitten.id}`).classList.add("tolerant")
    document.getElementById(`${kitten.id}`).classList.remove("happy")
    document.getElementById(`${kitten.id}`).classList.remove("angry")
  } else if (kitten.affection <= 3 && kitten.affection > 0) {
    kitten.mood = "Angry"
    document.getElementById(`${kitten.id}mood`).textContent = "Mood: Angry"
    document.getElementById(`${kitten.id}`).classList.add("angry")
    document.getElementById(`${kitten.id}`).classList.remove("tolerant")
  } else {
    console.log(kitten.name + "Ran away!")
    runaway(kitten)
    meow()
  }
}

function runaway(kitten) {
  document.getElementById(kitten.id).classList.add("gone")
  document.getElementById(kitten.id).classList.remove("angry")
  document.getElementById(`${kitten.id}mood`).textContent = "Gone !"
  document.getElementById(`${kitten.id}mood`).classList.add("text-danger")
  document.getElementById(`${kitten.id}affection`).textContent = "Ran Away"
  document.getElementById(`${kitten.id}affection`).classList.add("text-danger")
  document.getElementById(`${kitten.id}buttons`).remove()
}


function meow() {
  let random = Math.random()
  if (random >= .66) {
    // @ts-ignore
    document.getElementById("meow1").play()
  } else if (random >= .33) {
    // @ts-ignore
    document.getElementById("meow2").play()
  } else {
    // @ts-ignore
    document.getElementById("meow3").play()
  }
  console.log("Meow!")
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens()
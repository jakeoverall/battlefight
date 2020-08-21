// Elements
let itemsElem = document.getElementById("items")
let playerElem = document.getElementById("player")
let enemyElem = document.getElementById("enemy")

// Global Weapons
let fistWeapon = { name: "Fist", durability: Infinity, damage: 1, experienceNeeded: 0 }

let player = {
  name: prompt("What is your name?"),
  experience: 10,
  weapon: fistWeapon,
  health: 100
}

let rabbit = {
  name: "rabbit",
  experience: 1,
  weapon: { name: "teeth", durability: Infinity, damage: 1, experienceNeeded: 0 },
  health: 3,
  attackSpeed: 1500
}
let bigerRabbit = {
  name: "Roger Rabbit",
  experience: 2,
  weapon: { name: "teeth", durability: Infinity, damage: 2, experienceNeeded: 0 },
  health: 6,
  attackSpeed: 2000
}
let YOUWILLDIE = {
  name: "GIANT",
  experience: 100,
  weapon: { name: "CLUB", durability: Infinity, damage: 500, experienceNeeded: 0 },
  health: 100,
  attackSpeed: 8000
}

let enemy = rabbit

let items = [
  fistWeapon,
  { name: "Rusty Sword", durability: 10, damage: 5, experienceNeeded: 0 },
  { name: "Sword", durability: 15, damage: 15, experienceNeeded: 10 },
  { name: "Ornate Sword", durability: 3, damage: 50, experienceNeeded: 50 },
]

// #region Draw Methods 

function drawPlayer() {
  let template = `${player.name} ${player.weapon.name} Health: ${player.health}`
  playerElem.innerHTML = template
}

function drawEnemy() {
  let template = `${enemy.name} ${enemy.weapon.name} Health: ${enemy.health}`
  enemyElem.innerHTML = template
}

function drawItems() {
  let template = ""
  items.forEach(item => {
    template += getItemTemplate(item)
  })

  itemsElem.innerHTML = template
}

function getItemTemplate(item) {
  return /*html*/`
  <button onclick="equipItem('${item.name}')">
    ${item.name} ${item.durability} ${item.damage} ${item.experienceNeeded}
  </button>
  `
}

//#endregion



//#region Game Logic

function attackPlayer() {
  player.health -= enemy.weapon.damage
  if (player.health <= 0) {
    player.dead = true
    player.health = 0
    clearInterval(enemyAttackInterval)
    alert("YOU DIED")
  }
  updateScreen()
}

let enemyAttackInterval = setInterval(attackPlayer, 1000)


function attackEnemy() {
  if (player.dead) { return }
  enemy.health -= player.weapon.damage

  if (enemy.health <= 0) {
    enemy.health = 0
    clearInterval(enemyAttackInterval)
    changeEnemy()
  }

  updateScreen()
}


function changeEnemy() {

  switch (enemy) {
    case rabbit:
      enemy = player.weapon === fistWeapon
        ? bigerRabbit
        : YOUWILLDIE
      break;
    case bigerRabbit:
      enemy = YOUWILLDIE
      break;
    case YOUWILLDIE:
      alert('YOU WIN!!!!')
      return;
  }
  enemyAttackInterval = setInterval(attackPlayer, enemy.attackSpeed)
}


//#endregion





function equipItem(itemName) {
  if (player.dead) { return }
  let item = items.find(item => item.name == itemName)
  // can you use it?
  if (player.experience < item.experienceNeeded) {
    return // TODO tell user they can't use it yet, encourage more enemy killing
  }
  player.weapon = item
  updateScreen()
}


function updateScreen() {
  drawItems()
  drawPlayer()
  drawEnemy()
}

updateScreen()
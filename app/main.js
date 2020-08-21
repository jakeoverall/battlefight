let fistWeapon =  { name: "Fist", durability: Infinity, damage: 1, experienceNeeded: 0 }

let player = {
  name: prompt("What is your name?"),
  experience: 0,
  weapon: fistWeapon
}

let items = [
  { name: "Rusty Sword", durability: 10, damage: 5, experienceNeeded: 0 },
  { name: "Sword", durability: 15, damage: 15, experienceNeeded: 10 },
  { name: "Ornate Sword", durability: 3, damage: 50, experienceNeeded: 50 },
]

function drawItems() {
  let template = ""
  items.forEach(item => {
    template += getItemTemplate(item)
  })

  document.getElementById("items").innerHTML = template
}

function drawPlayer() {
  let template = `${player.name} ${player.weapon.name}`
  document.getElementById("player").innerHTML = template
}

function getItemTemplate(item) {
  return /*html*/`
  <button onclick="equipItem('${item.name}')">
    ${item.name} ${item.durability} ${item.damage} ${item.experienceNeeded}
  </button>
  `
}


function equipItem(itemName){
  let item = items.find(item => item.name == itemName)
  // can you use it?
  if(player.experience < item.experienceNeeded){
    return // TODO tell user they can't use it yet, encourage more enemy killing
  }
  player.weapon = item
  updateScreen()
}


function updateScreen() {
  drawItems()
  drawPlayer()
}

updateScreen()
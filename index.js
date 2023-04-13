const { Wizard } = require("./func/wizard.js");
const { Warrior } = require("./func/warrior.js");
const { Tank } = require("./func/tank.js");
const { Zoltar } = require("./func/zoltar.js");

const inquirer = require("inquirer");

let enemyZoltar = new Zoltar("Zoltar");
let hero; //hero variable
let switchKey = false; //switch for quit
let multiplyDamageHero = 30;
let multiplyDamageEnemy = 20;

// MAIN FUNCTIONS FOR GAME -------------------------
const clear = () => {
  process.stdout.write("\x1B[2J\x1B[0f");
};

const randDung = () => {
  const randNum = Math.round(Math.random() * 10);
  const randNum2 = Math.round(Math.random() * 10);

  const randRes = Math.round(Math.random() * 20); // const for rand res

  if (hero.energy <= 0) {
    console.log("You need to rest 🌇");
  } else if (hero.energy > 0) {
    if (randNum <= 3 && randNum2 <= 3) {
      console.log("Congratulation! You got the legendary element 🔥");
      hero.legendary_item += 1;
    }
    hero.iron += randRes;
    hero.levelUp();
    hero.energy -= 10;
    console.log(`Success! You got ${randRes} iron`);
    hero.inventory();
  }
};

const randWorld = () => {
  //const for rand luck
  const randNum = Math.round(Math.random() * 10);
  const randNum2 = Math.round(Math.random() * 10);

  const randRes = Math.round(Math.random() * 20); // const for rand res

  if (hero.energy <= 0) {
    console.log("You need to rest");
  } else if (hero.energy > 0) {
    //const for rand res
    if (randNum <= 3 && randNum2 <= 3 && hero.pet === 0) {
      console.log(
        "Congratulation! You met a pet who will go on a trip with you 🐕"
      );
      hero.pet += 1;
      hero.health += 15;
      // hero.damage += 5 need to do
    }
    hero.wood += randRes;
    hero.levelUp();
    hero.energy -= 12;
    console.log(`Success! You got ${randRes} wood`);
    hero.inventory();
  }
};

const start = async () => {
  // START FUNCTION
  const { start } = await inquirer.prompt({
    type: "input",
    name: "start",
    message:
      "Once upon a time, in a far-off land, there was a kingdom called Arindor. It was a prosperous and peaceful land, thanks to its wise and just rulers, King Alaric and Queen Elena. However, all that changed when a dark wizard named Zoltar appeared on the scene. Zoltar was once a powerful wizard in the kingdom, but he became corrupted by dark magic and turned against his own people. He raised an army of goblins, trolls, and other foul creatures, and launched an attack on Arindor. King Alaric and Queen Elena called upon their bravest warriors to defend the kingdom. Please press 'Enter'",
  });
  clear();
  const { start2 } = await inquirer.prompt({
    type: "input",
    name: "start2",
    message:
      "Among them were a wizard, a warrior, and a tank . Wizard was a skilled mage, able to cast powerful spells to blast his enemies or heal his allies. Marcus was a fierce warrior, wielding a mighty sword, and Grom was a massive hulk of a man, able to withstand even the fiercest of attacks. The hero set out to face Zoltar's army, fighting own way through hordes of goblins and trolls. As hero advanced, he encountered more and more powerful foes, including giant spiders, fire-breathing dragons, and even undead warriors. But he was undaunted, and pressed on, driven by his determination to save their kingdom. Please press 'Enter'",
  });
  clear();
  //NAME OF HERO
  const { nameOfHero } = await inquirer.prompt({
    type: "input",
    name: "nameOfHero",
    message: "Name your hero",
  });

  //TYPE OF HERO
  const { typeOfHero } = await inquirer.prompt({
    type: "list",
    name: "typeOfHero",
    message: "Choice your hero",
    choices: ["warrior", "tank", "wizard"],
  });
  if (typeOfHero == "warrior") {
    hero = new Warrior(nameOfHero);
  } else if (typeOfHero == "tank") {
    hero = new Tank(nameOfHero);
  } else if (typeOfHero == "wizard") {
    hero = new Wizard(nameOfHero);
  }
  console.log(`Hello ${typeOfHero} ${nameOfHero}!`);
  console.log(`Your main weapon ${hero.weapon}`);
  // main Game Play
  while (switchKey === false) {
    const { userAction } = await inquirer.prompt({
      type: "list",
      name: "userAction",
      message: "Which way do you want to go?",
      choices: [
        "dungeon 🌌",
        "explore the world 🌳🌲",
        "stats 📜",
        "inventory 💼",
        "craft 🔨",
        "equipment 🎫",
        "rest 🌇",
        "fight with Zoltar 🧙",
        "quit 🔚",
      ],
    });
    // if else decide
    if (userAction == "quit 🔚") {
      switchKey = true;
    } else if (userAction == "dungeon 🌌") {
      clear();
      randDung();
    } else if (userAction == "stats 📜") {
      clear();
      hero.stats();
    } else if (userAction == "inventory 💼") {
      clear();
      hero.inventory();
    } else if (userAction == "explore the world 🌳🌲") {
      clear();
      randWorld();
    } else if (userAction == "rest 🌇") {
      clear();
      hero.toRest();
      hero.stats();
      ///CRAFT -------------------------------
    } else if (userAction == "craft 🔨") {
      clear();
      hero.inventory();
      const { userChoiceCraft } = await inquirer.prompt({
        type: "list",
        name: "userChoiceCraft",
        message:
          "Choice what you want to create? \nlegendary helmet (120 wood, 120 iron, 2 legendary item) \nlegendary armor (150 wood, 150 iron, 3 legendary items) \nlegendary boots (120 wood, 120 iron, 2 legendary item) \nlegendary multi-weapon (150 wood, 150 iron, 5 legendary items)",
        choices: [
          "🍘 legendary helmet",
          "👘 legendary armor",
          "👢 legendary boots",
          "🌋 legendary multi-weapon",
        ],
      });
      if (userChoiceCraft == "🍘 legendary helmet") {
        if (
          hero.wood >= 120 &&
          hero.iron >= 120 &&
          hero.legendary_item >= 2 &&
          hero.helmet != "🍘 legendary helmet"
        ) {
          clear();
          console.log(
            "Congratulation! You have got legendary helmet. Damage + 5, Health + 30"
          );
          hero.helmet = "🍘 legendary helmet";
          hero.multiplyDamage += 5;
          hero.health += 30;
          hero.wood -= 120;
          hero.iron -= 120;
          hero.legendary_item -= 2;
        } else {
          console.log("Not enough resources or you already have this");
        }
      } else if (userChoiceCraft == "👘 legendary armor") {
        if (
          hero.wood >= 150 &&
          hero.iron >= 150 &&
          hero.legendary_item >= 3 &&
          hero.armor != "👘 legendary armor"
        ) {
          clear();
          console.log(
            "Congratulation! You have got legendary armor. Damage + 3, Health + 30"
          );
          hero.armor = "👘 legendary armor";
          hero.multiplyDamage += 3;
          hero.health += 30;
          hero.wood -= 150;
          hero.iron -= 150;
          hero.legendary_item -= 3;
        } else {
          console.log("Not enough resources");
        }
      } else if (userChoiceCraft == "👢 legendary boots") {
        if (
          hero.wood >= 120 &&
          hero.iron >= 120 &&
          hero.legendary_item >= 2 &&
          hero.boots != "👢 legendary boots"
        ) {
          clear();
          console.log(
            "Congratulation! You have got legendary boots. Damage + 3, Health + 30"
          );
          hero.boots = "👢 legendary boots";
          hero.multiplyDamage += 3;
          hero.health += 30;
          hero.wood -= 120;
          hero.iron -= 120;
          hero.legendary_item -= 2;
        } else {
          console.log("Not enough resources");
        }
      } else if (userChoiceCraft == "🌋 legendary multi-weapon") {
        if (
          hero.wood >= 150 &&
          hero.iron >= 150 &&
          hero.legendary_item >= 4 &&
          hero.weapon != "🌋 legendary multi-weapon"
        ) {
          clear();
          console.log(
            "Congratulation! You have got legendary multi-weapon. Damage + 10"
          );
          hero.weapon = "🌋 legendary multi-weapon";
          hero.multiplyDamage += 10;
          hero.wood -= 150;
          hero.iron -= 150;
          hero.legendary_item -= 4;
        } else {
          console.log("Not enough resources");
        }
      }
    } else if (userAction == "equipment 🎫") {
      clear();
      hero.equip();
    } else if (userAction == "fight with Zoltar 🧙") {
      clear();
      console.log(
        'Zoltar laughed maniacally as he summoned all the dark magic he could muster. "You fools! Did you really think you could defeat me? I am the most powerful wizard in all the land, and you are nothing compared to my dark powers!"'
      );
      const originalHeroHealth = hero.health;
      const originalEnemyHealth = enemyZoltar.health;
      while (hero.health >= 0 && enemyZoltar.health >= 0) {
        const { mainFight } = await inquirer.prompt({
          type: "list",
          name: "mainFight",
          message: "hit or run?",
          choices: ["hit 🌠"],
        });
        if (mainFight == "hit 🌠") {
          clear();
          //hero HIT ------------
          hero.damage = Math.round(Math.random() * multiplyDamageHero);
          enemyZoltar.health -= hero.damage;
          console.log(`You hit Zoltar. He has ${enemyZoltar.health} hp`);

          //enemy HIT --------------------
          enemyZoltar.damage = Math.round(Math.random() * multiplyDamageEnemy);
          hero.health -= enemyZoltar.damage;
          console.log(`Zoltar hits you. You have ${hero.health} hp`);
        }
      }
      if (enemyZoltar.health >= 0) {
        hero.health = originalHeroHealth;
        enemyZoltar.health = originalEnemyHealth;
      } else if (enemyZoltar.health <= 0) {
        clear();
        console.log(
          "🌟🌟🌟Congratulations! You defeated Zoltar and saved the kingdom 🌟🌟🌟"
        );
      }
    }
  }
};

start();

module.exports = {
  start,
};

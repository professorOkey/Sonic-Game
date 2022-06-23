import { platforms } from "./platforms.js";

export let enemys = [];
let enemyBottom;

export const createEnemy = (platformBottom, platformLeft) => {
  let randomize = Math.floor(Math.random() * 4);
  if (randomize === 3) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemyBottom = platformBottom + 2.7;
    enemy.style.bottom = enemyBottom + "vh";
    enemy.style.left = platformLeft + Math.floor(Math.random() * 12) + "vw";

    enemys.push({
      body: enemy,
      move: (() => {
        let enemyLeftCurrent = +enemy.style.left.slice(0, -2);
        let enemyMovingLeft = false;
        let enemyMovingRight = false;

        if (enemyLeftCurrent > platformLeft + 11) {
          enemyMovingLeft = true;
          return setInterval(() => {
            if (enemyMovingLeft) {
              enemyLeftCurrent -= 0.15;
              enemy.style.transform = "scaleX(1)";
              enemy.style.left = enemyLeftCurrent + "vw";
            }
            if (enemyMovingRight) {
              enemyLeftCurrent += 0.15;
              enemy.style.transform = "scaleX(-1)";
              enemy.style.left = enemyLeftCurrent + "vw";
            }

            if (enemyLeftCurrent < platformLeft) {
              enemyMovingLeft = false;
              enemyMovingRight = true;
            }
            if (enemyLeftCurrent > platformLeft + 19) {
              enemyMovingRight = false;
              enemyMovingLeft = true;
            }
          }, 30);
        } else if (enemyLeftCurrent < platformLeft + 11) {
          enemyMovingRight = true;
          return setInterval(() => {
            if (enemyMovingLeft) {
              enemyLeftCurrent -= 0.15;
              enemy.style.transform = "scaleX(1)";
              enemy.style.left = enemyLeftCurrent + "vw";
            }
            if (enemyMovingRight) {
              enemyLeftCurrent += 0.15;
              enemy.style.transform = "scaleX(-1)";
              enemy.style.left = enemyLeftCurrent + "vw";
            }

            if (enemyLeftCurrent < platformLeft) {
              enemyMovingLeft = false;
              enemyMovingRight = true;
            }
            if (enemyLeftCurrent > platformLeft + 19) {
              enemyMovingRight = false;
              enemyMovingLeft = true;
            }
          }, 30);
        }
      })(),
    });
    document.body.insertAdjacentElement("afterbegin", enemy);
  }
};

export const renderEnemys = () => {
  platforms.forEach((platform) => {
    let platformBottom = +platform.style.bottom.slice(0, -2);
    let platformLeft = +platform.style.left.slice(0, -2);
    createEnemy(platformBottom, platformLeft);
  });
};

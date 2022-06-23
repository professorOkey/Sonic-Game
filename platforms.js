import { createCoins } from "./coins.js";
import { createEnemy } from "./enemy.js";

let platforms = [];
let platformsPerY = 5;
let platformBottom;
let platformLeft;
let platformGapY = 80 / platformsPerY;

const createInitPlatforms = () => {
  let platform = document.createElement("div");
  platform.classList.add("platform");
  platform.style.left = platformLeft + "vw";
  platform.style.bottom = platformBottom + "vh";
  platforms.push(platform);
  document.body.insertAdjacentElement("afterbegin", platform);
};

const renderPlatforms = () => {
  for (let i = 0; i < platformsPerY; i++) {
    platformBottom = 15.5 + i * platformGapY;
    platformLeft = Math.floor(Math.random() * (58 - 27 + 1) + 27);
    createInitPlatforms();
  }
};

const createNewPlatformWithCoin = () => {
  let platform = document.createElement("div");
  platform.classList.add("platform");
  platformLeft = Math.floor(Math.random() * (58 - 27 + 1) + 27);
  platform.style.left = platformLeft + "vw";
  console.log(platformGapY);
  platformBottom += platformGapY;
  platform.style.bottom = platformBottom + "vh";
  createCoins(platformBottom, platformLeft);
  createEnemy(platformBottom, platformLeft);
  platformBottom -= platformGapY;
  platforms.push(platform);
  document.body.insertAdjacentElement("afterbegin", platform);
};

export {
  platforms,
  renderPlatforms,
  createInitPlatforms,
  createNewPlatformWithCoin,
};

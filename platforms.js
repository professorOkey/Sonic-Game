import { createCoins } from "./coins.js";

let platforms = [];
let platformsPerY = 6;
let platformBottom;
let platformLeft;
let platformGapY = 90 / platformsPerY;

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
    platformLeft = Math.floor(Math.random() * (60 - 28 + 1) + 28);
    createInitPlatforms();
  }
};

const createNewPlatformWithCoin = () => {
  let platform = document.createElement("div");
  platform.classList.add("platform");
  platformLeft = Math.floor(Math.random() * (60 - 29 + 1) + 29);
  platform.style.left = platformLeft + "vw";
  platformBottom += platformGapY;
  platform.style.bottom = platformBottom + "vh";
  createCoins(platformBottom, platformLeft);
  platformBottom -= platformGapY;
  platforms.push(platform);
  document.body.insertAdjacentElement("afterbegin", platform);
};

export { platforms, renderPlatforms, createInitPlatforms, createNewPlatformWithCoin };

import { platforms } from "./platforms.js";

let coins = [];
let coinBottom;

const createCoins = (platformBottom, platformLeft) => {
  let coin = document.createElement("div");
  coin.classList.add("score");
  coinBottom = platformBottom;
  coin.style.bottom = coinBottom + 3 + "vh";
  coin.style.left = platformLeft + Math.floor(Math.random() * 12) + "vw";
  coins.push(coin);
  document.body.insertAdjacentElement("afterbegin", coin);
};

const renderInitCoins = () => {
  platforms.forEach((platform) => {
    let platformBottom = +platform.style.bottom.slice(0, -2);
    let platformLeft = +platform.style.left.slice(0, -2);
    createCoins(platformBottom, platformLeft);
  });
};

export { renderInitCoins, coins, createCoins };

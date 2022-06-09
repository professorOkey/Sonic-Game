import {
  jump,
  moveLeft,
  moveRight,
  stand,
  fallItems,
  createScoreCounter,
} from "./mainFunctions.js";
import { renderPlatforms } from "./platforms.js";
import { renderInitCoins } from "./coins.js";

export let fallItemsInterval;

export const createMainMenu = () => {
  return `
  <div class="reveal"></div>
    <section class="main">
        <div class="main__menu">
            <div class="menu__title">Main Menu</div>
            <div class="menu__control-buttons">
                <div class="contol__buttons-title">Use these keys <br> to get max score</div>
                <div class="control__buttons-keys">
                    <div class="keys__item-a">A</div>
                    <div class="item-a decor"><img src="/img/arrow.svg" alt=""></div>
                    <div class="item-a__description">move left</div>
                    <div class="keys__item-d">D</div>
                    <div class="item-d decor"><img src="/img/arrow.svg" alt=""></div>
                    <div class="item-d__description">move right</div>
                    <div class="keys__item-space">Space</div>
                    <div class="item-space decor"><img src="/img/arrow.svg" alt=""></div>
                    <div class="item-space__description">jump</div>
                    <div class="background-decor"><img src="/img/Sonic.webp" alt=""></div>
                </div>
            </div>
            <div class="menu__start-game">
                <button class="start-game__button">Enjoy the game</button>
            </div>
        </div>
    </section>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", createMainMenu());

  const pageReveal = document.querySelector(".reveal");
  pageReveal.classList.add("revealed");
  setTimeout(() => {
    pageReveal.remove();
  }, 1000);

  const startButton = document.querySelector(".menu__start-game");
  const mainMenu = document.querySelector(".main");

  startButton.addEventListener("click", () => {
    mainMenu.classList.add("remove");

    setTimeout(() => {
      mainMenu.remove();
    }, 1000);

    document.body.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="hero"></div>
    `
    );

    let hero = document.querySelector(".hero");
    hero.classList.add("revealing");
    setTimeout(() => {
      hero.classList.remove("revealing");
    }, 2000);

    renderPlatforms();
    renderInitCoins();
    createScoreCounter();

    document.addEventListener("keydown", (event) => {
      if (event.code == "KeyA") {
        moveLeft(hero, event.repeat);
      }
      if (event.code == "KeyD") {
        moveRight(hero, event.repeat);
      }
      if (event.code === "Space") {
        jump(hero);
      }
    });

    document.addEventListener("keyup", (event) => {
      if ((event.code == "KeyA" || event.code == "KeyD")) {
        stand(hero);
      }
    });

    document.addEventListener("keypress", (event) => {
      if (event.code === "Space") {
        jump(hero);
      }
    });

    fallItemsInterval = setInterval(fallItems, 25, hero);
  });
});

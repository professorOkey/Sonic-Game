import { platforms, createNewPlatformWithCoin } from "/platforms.js";
import { coins } from "/coins.js";
import { fallItemsInterval } from "/app.js";

let isOnPlatform = false;
let isOnStartGrass = true;
let leftMoveInterval;
let rightMoveInterval;
let jumpMoveInterval;
let fallingMoveInterval;
let isMovingRight = false;
let isMovingLeft = false;
let isJumping = false;
let isFalling = false;
let heroLeft = 0;
let heroLeftPrevious;
let heroBottomPrevious;
let speed = 1;
let startHeight = 7.5;
let heroBottom = startHeight;
let collectedCoins = 0;
let scoreCounter;

const stand = (hero) => {
  if (!isJumping && !isFalling) {
    if (isMovingRight) {
      clearInterval(rightMoveInterval);
      isMovingRight = false;
    }

    if (isMovingLeft) {
      clearInterval(leftMoveInterval);
      isMovingLeft = false;
    }
    hero.style.backgroundImage = "url(./img/Sonic.webp)";
  }
};

const fall = (hero) => {
  hero.style.backgroundImage = "url(./img/sonicJump.gif)";
  isJumping = false;
  isFalling = true;
  isOnPlatform = false;
  clearInterval(jumpMoveInterval);
  fallingMoveInterval = setInterval(() => {
    if (isFalling) {
      heroBottom -= 1.2 + speed * 0.5;
      hero.style.bottom = heroBottom + "vh";
    }

    if (heroBottom <= 8) {
      isFalling = false;
      clearInterval(fallingMoveInterval);
      isOnStartGrass = true;
      startHeight = heroBottom;
      stand(hero);
    }

    platforms.forEach((platform) => {
      let platformBottom = +platform.style.bottom.slice(0, -2);
      let platformLeft = +platform.style.left.slice(0, -2);

      if (
        heroBottom >= platformBottom &&
        heroBottom <= platformBottom + 3 &&
        heroLeft + 3 >= platformLeft &&
        heroLeft <= platformLeft + 12
      ) {
        isFalling = false;
        clearInterval(fallingMoveInterval);
        isOnPlatform = true;
        startHeight = heroBottom;
        stand(hero);
      }

      collectingCoins(hero);
    });
  }, 25);
};

const jump = (hero) => {
  if (isOnPlatform || isOnStartGrass) {
    isJumping = true;
    isOnPlatform = false;
    isOnStartGrass = false;
    hero.style.backgroundImage = "url(./img/sonicJump.gif)";
    jumpMoveInterval = setInterval(() => {
      heroBottom += 1.2 + speed * 0.5;
      hero.style.bottom = heroBottom + "vh";

      if (heroBottom > startHeight + 20) {
        fall(hero);
        isJumping = false;
      }
    }, 25);
  }
};

const checkOffPlatform = (hero) => {
  platforms.forEach((platform) => {
    let platformBottom = +platform.style.bottom.slice(0, -2);
    let platformLeft = +platform.style.left.slice(0, -2);

    if (
      heroBottomPrevious >= platformBottom &&
      heroBottomPrevious <= platformBottom + 3 &&
      heroLeftPrevious + 3 >= platformLeft &&
      heroLeftPrevious <= platformLeft + 12 &&
      heroBottom >= platformBottom &&
      heroBottom <= platformBottom + 3 &&
      (heroLeft + 3 <= platformLeft || heroLeft >= platformLeft + 12)
    ) {
      isOnPlatform = false;
      fall(hero);
    }
  });

  heroLeftPrevious = heroLeft;
  heroBottomPrevious = heroBottom;
};

const collectingCoins = () => {
  coins.forEach((coin, index) => {
    let coinLeft = +coin.style.left.slice(0, -2);
    let coinBottom = +coin.style.bottom.slice(0, -2);
    if (
      heroBottom >= coinBottom - 3 &&
      heroBottom <= coinBottom + 3 &&
      heroLeft >= coinLeft - 3 &&
      heroLeft <= coinLeft + 3
    ) {
      let currentCoin = coins[index];
      currentCoin.classList.remove("score");
      coins.splice(index, 1);
      collectedCoins++;
      scoreCounter.innerHTML = `Score: ${collectedCoins}`;
    }
  });

  if (collectedCoins == 10) {
    speed = 1.3;
  } else if (collectedCoins == 20) {
    speed = 1.5;
  } else if (collectedCoins == 35) {
    speed = 1.7;
  } else if (collectedCoins == 50) {
    speed = 1.9;
  } else if (collectedCoins == 70) {
    speed = 2.1;
  }
};

const moveLeft = (hero, repeat) => {
  if (!repeat) {
    clearInterval(leftMoveInterval);
    isMovingLeft = true;
    hero.style.transform = "scaleX(-1)";

    if (isOnPlatform || isOnStartGrass) {
      hero.style.backgroundImage = "url(./img/sonicRun.gif)";
    }

    leftMoveInterval = setInterval(() => {
      if (heroLeft >= 0 && (isJumping || isFalling)) {
        heroLeft -= 0.65 + speed * 0.2;
        hero.style.left = heroLeft + "vw";
      } else if (heroLeft >= 0) {
        heroLeft -= 0.5;
        hero.style.left = heroLeft + "vw";
      }
      if (isOnPlatform) {
        checkOffPlatform(hero);
        collectingCoins(scoreCounter);
      }
    }, 25);
  }
};

const moveRight = (hero, repeat) => {
  if (!repeat) {
    clearInterval(rightMoveInterval);
    isMovingRight = true;

    hero.style.transform = "scaleX(1)";

    if (isOnPlatform || isOnStartGrass) {
      hero.style.backgroundImage = "url(./img/sonicRun.gif)";
    }

    rightMoveInterval = setInterval(() => {
      if (heroLeft <= 92.5 && (isJumping || isFalling)) {
        heroLeft += 0.65 + speed * 0.2;
        hero.style.left = heroLeft + "vw";
      } else if (heroLeft <= 92.5) {
        heroLeft += 0.5;
        hero.style.left = heroLeft + "vw";
      }

      if (isOnPlatform) {
        checkOffPlatform(hero);
        collectingCoins(scoreCounter);
      }
    }, 25);
  }
};

const fallItems = (hero) => {
  if (collectedCoins >= 2) {
    platforms.forEach((platform) => {
      let platformBottomMove = +platform.style.bottom.slice(0, -2);
      platformBottomMove -= 0.3 * speed;
      platform.style.bottom = platformBottomMove + "vh";

      if (platformBottomMove < 10) {
        let bottomPlatform = platforms[0];
        bottomPlatform.classList.remove("platform");
        platforms.shift();
        createNewPlatformWithCoin();
      }
    });

    coins.forEach((coin) => {
      let coinBottomMove = +coin.style.bottom.slice(0, -2);
      coinBottomMove -= 0.3 * speed;
      coin.style.bottom = coinBottomMove + "vh";

      if (coinBottomMove < 13) {
        let bottomCoin = coins[0];
        bottomCoin.classList.remove("score");
        coins.shift();
      }
    });

    if (isOnPlatform) {
      heroBottom -= 0.3 * speed;
      hero.style.bottom = heroBottom + "vh";
      startHeight = heroBottom;
    }

    if (heroBottom <= 12) {
      isCanCollectCoins = false;
      stopCollectingCoins();
    }
  }
};

const createScoreCounter = () => {
  scoreCounter = document.createElement("div");
  scoreCounter.classList.add("score-counter");
  document.body.insertAdjacentElement("afterbegin", scoreCounter);
};

const stopCollectingCoins = () => {
  clearInterval(leftMoveInterval);
  clearInterval(rightMoveInterval);
  clearInterval(jumpMoveInterval);
  clearInterval(fallingMoveInterval);
  clearInterval(fallItemsInterval);
  document.body.innerHTML = "";
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
  <section class="congrats">
    <div class="congrats__score">Your score : ${collectedCoins}</div>
    <div class="congrats__better">I know you'll get more next time</div>
    <button class="congrats__button"><a href="index.html">Try again</a></button>
  </section>
  `
  );
};

export { jump, moveLeft, moveRight, stand, fallItems, createScoreCounter };

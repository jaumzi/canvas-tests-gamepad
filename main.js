import { Canvas } from "./src/classes/Canvas.js";
import { hideComponent, loadComponent, loadJS, showComponent } from "./src/classes/Utils.js";

const registerButtonBack = (callback = () => {}) => {
  showComponent('button-back');

  document.getElementById('button-back').onclick = async () => {
    await loadComponent('./src/pages/Home/Home.html');
  
    loadJS('./src/pages/Home/Home.js', () => {
      hideComponent('button-back');
      callback();
    });
  };
};

document.getElementById('gamepad-test').onclick = async () => {
  // hideComponent('menu-root');

  registerButtonBack();

  await loadComponent('./src/pages/GamepadTest/GamepadTest.html');

  loadJS('./src/pages/GamepadTest/GamepadTest.js', () => {
    // hideComponent('loading-root');
    // showComponent('game-root');
  });
};



/////////////////

// const canvas = new Canvas("root-crop");

// canvas.registerCanvas();
// canvas.registerResizeListener();

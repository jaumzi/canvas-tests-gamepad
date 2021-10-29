import { Canvas } from "./src/classes/Canvas.js";
// import { hideComponent, loadComponent, loadJS, showComponent } from "./src/classes/Utils.js";

// const registerButtonBack = (callback = () => {}) => {
//   showComponent('button-back');

//   document.getElementById('button-back').onclick = async () => {
//     await loadComponent('./src/pages/Home/Home.html');
  
//     loadJS('./src/pages/Home/Home.js', () => {
//       hideComponent('button-back');
//       callback();
//     });
//   };
// };

/////////////////

const canvas = new Canvas("root-crop");

canvas.registerCanvas();
canvas.registerResizeListener();
canvas.registerGamepadListener();

canvas.run();

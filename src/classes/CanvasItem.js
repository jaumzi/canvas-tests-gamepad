import { convertObjectInArray } from "./Utils.js";

export class CanvasItem {
  rootCanvasRefName;
  canvasRefName;
  rootElement;
  canvas;
  context;
  commands = {};

  constructor(rootCanvasRefName, canvasRefName) {
    this.rootCanvasRefName = rootCanvasRefName;
    this.canvasRefName = canvasRefName;
  }

  registerCanvas() {
    this.rootElement = document.getElementById(this.rootCanvasRefName);

    const canvasHtml = document.createElement("canvas");
    canvasHtml.id = 'canvas-crop';
    this.rootElement.appendChild(canvasHtml);

    this.canvas = document.getElementById(this.canvasRefName);

    this.canvas.width = this.rootElement.offsetWidth;
    this.canvas.height = this.rootElement.offsetHeight;

    this.context = this.canvas.getContext('2d');
  }

  registerGamepadListener() {
    window.CommandGamepadEvent = {};


    window.addEventListener("gamepadconnected", ({ gamepad }) => {
      console.log('conectou');
      if (!(gamepad.index in window.CommandGamepadEvent)) {
        window.CommandGamepadEvent[gamepad.index] = gamepad;
      }
    });

    window.addEventListener("gamepaddisconnected", ({ gamepad }) => {
      console.log('Desconectou');
      delete window.CommandGamepadEvent[gamepad.index];
    });
  }
  updateGamepadsConnecteds() {
    const gamepads = navigator.getGamepads
      ? convertObjectInArray(navigator.getGamepads())
      : (
        navigator.webkitGetGamepads
          ? convertObjectInArray(navigator.webkitGetGamepads())
          : []
      );

    gamepads.forEach(gamepad => {
      window.CommandGamepadEvent[gamepad.index] = gamepad;
    });
  }
  verifyGamepadCommands() {
    this.updateGamepadsConnecteds();

    const CommandGamepadEvents = convertObjectInArray(window.CommandGamepadEvent);
    const axesTolerance = 0.1;

    for (var i = 0; i < CommandGamepadEvents.length; i++) {
      const gamepad = CommandGamepadEvents[i];
      if (gamepad) {

        // setinhas esquerdas não mapeadas :(

        if(gamepad.axes[0].toFixed(4) < -axesTolerance){
          console.log("ANALOGICO ESQUERDO ESQUERDA");
        }
        if(gamepad.axes[0].toFixed(4) > axesTolerance){
          console.log("ANALOGICO ESQUERDO DIREITA");
        }
        if(gamepad.axes[1].toFixed(4) < -axesTolerance){
          console.log("ANALOGICO ESQUERDO CIMA");
        }
        if(gamepad.axes[1].toFixed(4) > axesTolerance){
          console.log("ANALOGICO ESQUERDO BAIXO");
        }

        if(gamepad.axes[2].toFixed(4) < -axesTolerance){
          console.log("ANALOGICO DIREITO ESQUERDA");
        }
        if(gamepad.axes[2].toFixed(4) > axesTolerance){
          console.log("ANALOGICO DIREITO DIREITA");
        }
        if(gamepad.axes[5].toFixed(4) < -axesTolerance){
          console.log("ANALOGICO DIREITO CIMA");
        }
        if(gamepad.axes[5].toFixed(4) > axesTolerance){
          console.log("ANALOGICO DIREITO BAIXO");
        }
        
        gamepad.buttons.forEach((button, index) => {
          let val = button;
          let pressed = val == 1.0;
          if (typeof(button) == "object") {
            pressed = val.pressed;
            val = val.value;
          }

          if (pressed) {
            const strongPressed = Math.round(val * 100);
            if(strongPressed !== 100) {
              console.log("Strong Pressed:", strongPressed); // sla pra q isso acho q é força q apertou botao, coloquei pra aparecer só qnd isso tiver uso mesmo
            }

            if(index === 0){
              console.log("BOTÃO A"); // X
            }
            if(index === 1){
              console.log("BOTÃO B"); // bolinha
            }
            if(index === 3){
              console.log("BOTÃO X"); // quadrado
            }
            if(index === 4){
              console.log("BOTÃO Y"); // triangulo
            }
            if(index === 7){
              console.log("BOTÃO R1");
            }
            if(index === 9){
              console.log("BOTÃO R2");
            }
            if(index === 6){
              console.log("BOTÃO L1");
            }
            if(index === 8){
              console.log("BOTÃO L2");
            }
            if(index === 10){
              console.log("BOTÃO SELECT");
            }
            if(index === 11){
              console.log("BOTÃO START");
            }
            if(index === 14){
              console.log("BOTÃO R3");
            }
            if(index === 13){
              console.log("BOTÃO L3");
            }
          }
        })
      }
    }
  }


  registerKeysListener() {
    window.CommandKeyEvent = {};

    window.addEventListener('keydown', function (event) {
      window.CommandKeyEvent[event.code] = true;
    });

    window.addEventListener('keyup', function (event) {
      delete window.CommandKeyEvent[event.code];
    });
  }
  verifyKeyCommands(key, command) {
    if (key === "*" && Object.values(window.CommandKeyEvent).find(keyPress => keyPress)) {
      command();
    }

    if (!!window.CommandKeyEvent[key]) {
      command();
    }
  }

  registerMouseClickListener() {
    window.CommandMouseEvent = {};

    window.addEventListener('mousedown', function (event) {
      // window.CommandKeyEvent[event.code] = true;
      console.log(event);
    });

    window.addEventListener('mouseup', function (event) {
      // window.CommandKeyEvent[event.code] = false;
      console.log(event);
    });
  }

  registerResizeListener() {
    window.addEventListener('resize', () => {
      const rootElement = document.getElementById(this.rootCanvasRefName);
      const canvas = document.getElementById(this.canvasRefName);

      canvas.width = rootElement.offsetWidth;
      canvas.height = rootElement.offsetHeight;

      this.update();
    })
  }

  removeListeners() {
    window.removeEventListener('keydown');
    window.removeEventListener('keyup');
    window.removeEventListener('mousedown');
    window.removeEventListener('mouseup');
    window.removeEventListener('resize');
  }

  executeComands() {
    this.fluidCommands();
  }

  fluidCommands() {
    // convertObjectInArray(this.commands).forEach(([key, command]) => {
    this.verifyGamepadCommands(); //(key, command);
    // this.verifyKeyCommands(key, command);
    // });
  }
}
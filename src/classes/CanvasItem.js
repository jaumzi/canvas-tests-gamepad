export class CanvasItem {
  rootCanvasRefName;
  canvasRefName;

  rootElement;
  canvas;

  context;

  constructor(rootCanvasRefName, canvasRefName) {
    this.rootCanvasRefName = rootCanvasRefName;
    this.canvasRefName = canvasRefName;
  }

  registerCanvas () {
    this.rootElement = document.getElementById(this.rootCanvasRefName);

    const canvasHtml = document.createElement("canvas");
    canvasHtml.id = 'canvas-crop';
    this.rootElement.appendChild(canvasHtml);

    this.canvas = document.getElementById(this.canvasRefName);

    this.canvas.width = this.rootElement.offsetWidth;
    this.canvas.height = this.rootElement.offsetHeight;

    this.context = this.canvas.getContext('2d');
  }
  
  registerKeysListener() {
    window.keyEvent = { '': false };
    document.addEventListener('keydown', function (event) {
      window.keyEvent[event.code] = true;
    });
    document.addEventListener('keyup', function (event) {
      window.keyEvent[event.code] = false;
    });
  }
  
  registerMouseClickListener() {
    window.keyEvent = { '': false };
    document.addEventListener('mousedown', function (event) {
      window.keyEvent[event.code] = true;
    });
    document.addEventListener('mouseup', function (event) {
      window.keyEvent[event.code] = false;
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

  executeComands() {
    this.fluidCommands();
  }

  fluidCommands() {
    Object.entries(this.commands).forEach(([key, command]) => {
      if (key === "*" && Object.values(window.keyEvent).find(keyPress => keyPress)) {
        command();
      }

      if (!!window.keyEvent[key]) {
        command();
      }
    });
  }
}
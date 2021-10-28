import { CanvasItem } from "./CanvasItem.js";

export class Canvas extends CanvasItem {

  constructor(rootCanvasRefName) {
    super(rootCanvasRefName, 'canvas-crop');

  }


  update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  }

  run() {
    this.update();

    (
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.requestAnimationFrame
    )(() => this.run());
  }
}



import Object from "./object";
import Point from "./point";

abstract class Rect extends Object {
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    public readonly width: number,
    public readonly height: number // color // rotation
  ) {
    super(x, y, vx, vy);
  }

  get center(): Point {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
  }
}

export default Rect;

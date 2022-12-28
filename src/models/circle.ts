import Object from "./object";
import Point from "./point";

abstract class Circle extends Object {
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    public readonly radius: number
  ) {
    super(x, y, vx, vy);
  }

  get center(): Point {
    return { x: this.x + this.radius, y: this.y + this.radius };
  }
}

export default Circle;

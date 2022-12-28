import Point from "./point";

abstract class Object {
  constructor(
    public x: number,
    public y: number,
    public vx: number,
    public vy: number
  ) {}

  abstract get center(): Point;
}

export default Object;

import Point from "../models/point";
import Circle from "./circle";
import { BallOptions } from "../GameOptions";

// interface BallObject extends Circle {
//   position: Point;
//   velocity: Point;
//   readonly radius: number;
// }

class BallObject extends Circle {
  constructor(x: number, y: number, vx: number, vy: number) {
    super(x, y, vx, vy, BallOptions.BALL_RADIUS);
  }
}

export default BallObject;

import Point from "./point";
import Object from "./object";
import Rect from "./rect";
import { PalletOptions } from "../GameOptions";

class PalletObject extends Rect {
  // position: Point;
  // velocity: Point;
  // readonly rotation: number; // degree rotation

  constructor(x: number, y: number, vx: number, vy: number) {
    super(
      x,
      y,
      vx,
      vy,
      PalletOptions.PALLET_WIDTH,
      PalletOptions.PALLET_HEIGHT
    );
  }

  // function to return coordinates of the hit side

}

export default PalletObject;

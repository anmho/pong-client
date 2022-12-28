import React from "react";
// import { PalletState } from "../models";
import PalletObject from "../models/pallet";
import { PalletOptions } from "../GameOptions";
// import PalletObject from "../models/pallet";

interface PalletProps {
  pallet: PalletObject;
}

function Pallet({ pallet }: PalletProps) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: pallet.x,
    top: pallet.y,
    height: pallet.height,
    width: pallet.width,
    backgroundColor: "blue",
  };

  return <div style={style} />;
}

export default Pallet;

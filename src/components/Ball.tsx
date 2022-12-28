import React, { useState } from "react";

import "./Ball.css";
import Point from "../models/point";
import BallObject from "../models/ball";

interface BallProps {
  ball: BallObject;
}

function Ball({ ball }: BallProps) {
  const styles: React.CSSProperties = {
    position: "absolute",
    left: ball.center.x,
    top: ball.center.y,
    width: 2 * ball.radius,
    aspectRatio: "1 / 1",
    borderRadius: "100%",
    backgroundColor: "blue",
  };

  return <div style={styles} />;
}

export default Ball;

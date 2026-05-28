import { useEffect, useRef, useState } from "react";
import Ball from "./components/Ball";
import { BallObject, PalletObject } from "./models";
import "./App.css";
import Pallet from "./components/Pallet";
import useKeyPress from "./hooks/useKeyPress";
import { BallOptions, PalletOptions } from "./GameOptions";

function App() {
  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
  });
  const [ball, setBall] = useState<BallObject>(
    new BallObject(center.x, center.y, -BallOptions.BALL_SPEED, 0)
  );
  const [p1Pallet, setP1Pallet] = useState<PalletObject>(
    new PalletObject(0, center.y, 0, 0)
  );
  const [p2Pallet, setP2Pallet] = useState<PalletObject>(
    new PalletObject(
      window.innerWidth - PalletOptions.PALLET_WIDTH,
      center.y,
      0,
      0
    )
  );
  const [time, setTime] = useState(0);
  const [p1Up, setP1Up] = useState(false);
  const [p1Down, setP1Down] = useState(false);
  const [p2Up, setP2Up] = useState(false);
  const [p2Down, setP2Down] = useState(false);

  const updateBall = () => {
    // pallet collision

    // check distance with pixels on the side

    // collision with pallet 1

    // collision with pallet 2

    setBall((ball) => {
      const p1 = p1Pallet;

      let [newX, newY] = [ball.x + ball.vx, ball.y + ball.vy];
      let [newVX, newVY] = [ball.vx, ball.vy];

      // wall collision
      // up down collisions
      for (let x = 0; x < window.innerWidth; x++) {
        // check distance to ball
        const y = 0;
        const dist = Math.sqrt(
          Math.pow(ball.center.x + ball.vx - x, 2) +
            Math.pow(ball.center.y + ball.vy - y, 2)
        );

        if (dist < ball.radius) {
          console.log(dist);
          newVX = ball.vx;
          newVY = -ball.vy;

          return new BallObject(ball.x, 0, newVX, newVY);
        }
      }

      for (let x = 0; x < window.innerWidth; x++) {
        // check distance to ball
        const y = window.innerHeight;
        const dist = Math.sqrt(
          Math.pow(ball.center.x + ball.vx - x, 2) +
            Math.pow(ball.center.y + ball.vy - y, 2)
        );

        if (dist < ball.radius) {
          console.log(dist);
          newVX = ball.vx;
          newVY = -ball.vy;

          return new BallObject(
            ball.x,
            window.innerHeight - 2 * ball.radius,
            newVX,
            newVY
          );
        }
      }

      // left right collisions

      for (let y = p1.y; y < p1.y + p1.height; y++) {
        // rectangle
        // distance to center of the ball
        const x = p1.x + p1.width - 1;

        const dist = Math.sqrt(
          Math.pow(ball.center.x - x, 2) + Math.pow(ball.center.y - y, 2)
        );
        if (dist < ball.radius) {
          const v = BallOptions.BALL_SPEED;
          const theta = Math.atan(
            (ball.center.y - p1.center.y) / (ball.center.x - p1.center.x)
          );

          // newVX *= -1;
          newVX = v * Math.cos(theta);
          newVY = v * Math.sin(theta);
          // newVY *= -1;

          newX = x;

          return new BallObject(newX, newY, newVX, newVY);
        }
      }

      const p2 = p2Pallet;
      for (let y = p2.y; y < p2.y + p2.height; y++) {
        const x = p2.x;

        if (
          Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2)) < ball.radius
        ) {
          const v = BallOptions.BALL_SPEED;

          // collision angle
          // gives us direction for each vector component, will not dictate
          const theta = Math.atan(
            (ball.center.y - p2.center.y) / (ball.center.x - p2.center.x)
          );

          // newVX *= -1;
          // newVY *= -1;
          newVX = v * -Math.cos(theta);
          newVY = v * -Math.sin(theta);
          newX = x - 3 * ball.radius; // wtf
          newY = y;
          // console.log(theta, Math.cos(theta), Math.sin(theta));

          return new BallObject(newX, newY, newVX, newVY);
        }
      }

      // console.log(newVX, newVY);
      return new BallObject(newX, newY, newVX, newVY);
    });
  };

  const updatePallet = (pallet: PalletObject) => {
    // extract into update function
    let [newX, newY] = [pallet.x + pallet.vx, pallet.y + pallet.vy];
    let [vx, vy] = [pallet.vx, pallet.vy];

    if (newY < 0) newY = 0;
    else if (newY >= window.innerHeight - pallet.height - 1)
      newY = window.innerHeight - pallet.height - 1;

    return new PalletObject(newX, newY, vx, vy);
  };

  const updatePallets = () => {
    setP1Pallet((player1Pallet) => updatePallet(player1Pallet));
    setP2Pallet((player2Pallet) => updatePallet(player2Pallet));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
      updateBall();
      updatePallets();
    }, 1000 / 60);

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          setP1Up(true);
          break;
        case "s":
          setP1Down(true);
          break;
        case "ArrowUp":
          setP2Up(true);
          break;
        case "ArrowDown":
          setP2Down(true);
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          setP1Up(false);
          break;
        case "s":
          setP1Down(false);
          break;
        case "ArrowUp":
          setP2Up(false);
          break;
        case "ArrowDown":
          setP2Down(false);
          break;
      }
    });

    return () => clearInterval(interval);
  }, [p1Pallet, p2Pallet, ball]);

  useEffect(() => {
    console.log(p1Up, p1Down, p2Up, p2Down);
    let direction1 = 0;
    let direction2 = 0;

    if (p1Up && !p1Down) direction1 = -1;
    else if (!p1Up && p1Down) direction1 = 1;

    if (p2Up && !p2Down) direction2 = -1;
    else if (!p2Up && p2Down) direction2 = 1;

    const p1 = p1Pallet;
    const p2 = p2Pallet;

    setP1Pallet(
      new PalletObject(
        p1.x,
        p1.y,
        p1.vx,
        PalletOptions.PALLET_SPEED * direction1
      )
    );

    setP2Pallet(
      new PalletObject(
        p2.x,
        p2.y,
        p2.vx,
        PalletOptions.PALLET_SPEED * direction2
      )
    );
  }, [p1Up, p1Down, p2Up, p2Down]);

  return (
    <div>
      <Pallet pallet={p1Pallet} />
      <Pallet pallet={p2Pallet} />
      <Ball ball={ball} />
    </div>
  );
}

export default App;

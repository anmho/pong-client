import { useEffect, useRef, useState } from "react";
import Ball from "./components/Ball";
import { BallObject, PalletObject } from "./models";
import "./App.css";
import Pallet from "./components/Pallet";
import useKeyPress from "./hooks/useKeyPress";
import { BallOptions, PalletOptions } from "./GameOptions";

function App() {
  // could keep state in context
  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
  });
  // const [ball, setBall] = useState<BallState>({
  //   position: { x: center.x, y: center.y },
  //   velocity: { x: -5, y: 0 },
  //   radius: 10,
  // });

  const [ball, setBall] = useState<BallObject>(
    new BallObject(center.x, center.y, -2 * BallOptions.BALL_SPEED, 0)
  );
  const [player1Pallet, setPlayer1Pallet] = useState<PalletObject>(
    new PalletObject(0, center.y, 0, 0)
  );
  const [player2Pallet, setPlayer2Pallet] = useState<PalletObject>(
    new PalletObject(
      window.innerWidth - PalletOptions.PALLET_WIDTH,
      center.y,
      0,
      0
    )
  );
  const [time, setTime] = useState(0);
  const [player1Up, setPlayer1Up] = useState(false);
  const [player1Down, setPlayer1Down] = useState(false);
  const [player2Up, setPlayer2Up] = useState(false);
  const [player2Down, setPlayer2Down] = useState(false);

  const updateBall = () => {
    // pallet collision

    // check distance with pixels on the side

    // collision with pallet 1

    // collision with pallet 2

    setBall((ball) => {
      const p1 = player1Pallet;

      let [newX, newY] = [ball.x + ball.vx, ball.y + ball.vy];
      let [newVX, newVY] = [ball.vx, ball.vy];
      let collision = false;

      for (let y = p1.y; y < p1.y + p1.height; y++) {
        // rectangle
        // distance to center of the ball
        const x = p1.x + p1.width - 1;

        const dist = Math.sqrt(
          Math.pow(ball.center.x - x, 2) + Math.pow(ball.center.y - y, 2)
        );
        if (dist < ball.radius) {
          console.log(x, y);
          newVX *= -1;
          newVY *= -1;
          collision = true;
          console.log(collision, newVX, newVY);
          newX = x;
          return new BallObject(newX, newY, newVX, newVY);
        }
      }

      const p2 = player2Pallet;
      for (let y = p2.y; y < p2.y + p2.height; y++) {
        // every coord on the left of the pallet
        const x = p2.x;

        if (
          Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2)) < ball.radius
        ) {
          newVX *= -1;
          newVY *= -1;
          newX = x;
          newY = y;

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
    setPlayer1Pallet((player1Pallet) => updatePallet(player1Pallet));
    setPlayer2Pallet((player2Pallet) => updatePallet(player2Pallet));
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
          setPlayer1Up(true);
          break;
        case "s":
          setPlayer1Down(true);
          break;
        case "ArrowUp":
          setPlayer2Up(true);
          break;
        case "ArrowDown":
          setPlayer2Down(true);
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          setPlayer1Up(false);
          break;
        case "s":
          setPlayer1Down(false);
          break;
        case "ArrowUp":
          setPlayer2Up(false);
          break;
        case "ArrowDown":
          setPlayer2Down(false);
          break;
      }
    });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(player1Up, player1Down, player2Up, player2Down);
    let direction1 = 0;
    let direction2 = 0;

    if (player1Up && !player1Down) direction1 = -1;
    else if (!player1Up && player1Down) direction1 = 1;

    if (player2Up && !player2Down) direction2 = -1;
    else if (!player2Up && player2Down) direction2 = 1;

    const p1 = player1Pallet;
    const p2 = player2Pallet;

    setPlayer1Pallet(
      new PalletObject(
        p1.x,
        p1.y,
        p1.vx,
        PalletOptions.PALLET_SPEED * direction1
      )
    );

    setPlayer2Pallet(
      new PalletObject(
        p2.x,
        p2.y,
        p2.vx,
        PalletOptions.PALLET_SPEED * direction2
      )
    );
  }, [player1Up, player1Down, player2Up, player2Down]);

  return (
    <div>
      <Pallet pallet={player1Pallet} />
      <Pallet pallet={player2Pallet} />
      <Ball ball={ball} />
    </div>
  );
}

export default App;

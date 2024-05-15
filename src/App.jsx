/* eslint-disable react/no-unknown-property */
import "./App.css";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import useAssets from "./components/UseAssets";
import Player from "./components/Player";
import World from "./components/World";

import { Physics } from "@react-three/rapier";

const App = () => {
  const { visuals, colliders, players } = useAssets("/glb/world0.glb");
  const playerRef = useRef();
  const worldRef = useRef();

  return (
    <div id="game">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.9} />
        <directionalLight color="white" position={[0, 5, 5]} />
        <Suspense fallback={null}>
          <Physics debug>
            <World ref={worldRef} visuals={visuals} colliders={colliders} />
            <Player ref={playerRef} mesh={players[0]} />
          </Physics>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;

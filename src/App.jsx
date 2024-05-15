/* eslint-disable react/no-unknown-property */
import "./App.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import useAssets from "./components/UseAssets";
import Player from "./components/Player";
import World from "./components/World";

import { Physics } from "@react-three/rapier";

const App = () => {
  const { visuals, colliders, players } = useAssets("/glb/world0.glb");

  return (
    <div id="game">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.9} />
        <directionalLight color="white" position={[0, 5, 5]} />
        <Suspense
          fallback={
            <mesh position={[0, 0, 0]}>
              <Text color="black">Loading...</Text>
            </mesh>
          }
        >
          <Physics debug>
            <World visuals={visuals} colliders={colliders} />
            <Player mesh={players[0]} />
          </Physics>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;

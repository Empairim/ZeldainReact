/* eslint-disable react/no-unknown-property */
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Text } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import useAssets from "./components/UseAssets";
import Player from "./components/Player";
import World from "./components/World";

const App = () => {
  const { visuals, colliders, players } = useAssets("/glb/world0.glb");

  return (
    <div id="game">
      <Canvas shadows>
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[0, 5, 0]}
          intensity={1.5}
          castShadow
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-mapSize-width={1024}
        />
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
      </Canvas>
    </div>
  );
};

export default App;

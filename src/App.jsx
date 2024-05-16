/* eslint-disable react/no-unknown-property */
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Text } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import UseWorldAssets from "./components/UseWorldAssets";
import World from "./components/World";
import Player from "./components/Player";

const App = () => {
  const { visuals, colliders } = UseWorldAssets("/glb/world0.glb");

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
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001} // reduces self-shadowing
        />
        <Suspense
          fallback={
            <mesh position={[0, 0, 0]}>
              <Text color="red">Loading...</Text>
            </mesh>
          }
        >
          <Physics debug>
            <World visuals={visuals} colliders={colliders} />
            <Player />
          </Physics>
        </Suspense>
        <OrbitControls enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default App;

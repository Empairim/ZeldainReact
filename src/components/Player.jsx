import { RigidBody } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import Controller from "./Controller";
import { Model } from "./Char"; // assuming Model is in the same directory

const Player = () => {
  const rigidBody = useRef();

  return (
    <>
      <Suspense fallback={null}>
        <Controller playerRef={rigidBody} />
        <RigidBody
          ref={rigidBody}
          type="dynamic"
          friction={3}
          linearDamping={0.5}
          fixedRotations={[true, false, true]}
        >
          <Model />
        </RigidBody>
      </Suspense>
    </>
  );
};

Player.displayName = "Player";

export default Player;

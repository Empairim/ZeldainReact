/* eslint-disable react/prop-types */
import { useThree, useFrame, extend } from "@react-three/fiber";
import { useState, useEffect, useRef, Suspense } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useGLTF, useAnimations } from "@react-three/drei"; // Import useGLTF and useAnimations hooks
import * as THREE from "three";
import { Model } from "./Char";

extend({ OrbitControls });

const Controller = ({ playerRef }) => {
  const { camera } = useThree();
  const [keysPressed, setKeysPressed] = useState({
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false, // Add Space key
  });

  const { animations } = useGLTF("/glb/character.glb"); // Load GLB animations
  const actionsRef = useRef();
  const MOVEMENT_SPEED = 0.1;
  const MAX_VEL = 1.75;
  let currentAction = null;

  //Camera follows the player
  useFrame(() => {
    if (!playerRef.current) return;

    const targetPosition = playerRef.current.translation();
    const lerpFactor = 0.01;
    // Interpolate the camera's position towards the target position
    camera.position.x += (targetPosition.x - camera.position.x) * lerpFactor;
    camera.position.y +=
      (targetPosition.y + 5.4 - camera.position.y) * lerpFactor;
    camera.position.z +=
      (targetPosition.z + 9 - camera.position.z) * lerpFactor;
    // Create a quaternion representing the rotation from the camera to the target position
    const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(camera.position, targetPosition, camera.up)
    );

    // Interpolate the camera's quaternion towards the target quaternion
    camera.quaternion.slerp(targetQuaternion, lerpFactor);

    const impulse = { x: 0, y: 0, z: 0 };
    const linvel = playerRef.current.linvel();
    let changeRotation = false;
    //Player movement

    if (keysPressed.ArrowRight && linvel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
      if (actionsRef.current?.run) {
        actionsRef.current.run.play();
      }
    } else {
      if (actionsRef.current?.run) {
        actionsRef.current.run.stop();
      }
    }

    if (keysPressed.Space) {
      if (actionsRef.current?.attack1) {
        if (currentAction) {
          currentAction.stop();
        }
        currentAction = actionsRef.current.attack1;
        currentAction.play(); // Play attack1 animation
      }
    }
    if (keysPressed.ArrowLeft && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (keysPressed.ArrowDown && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (keysPressed.ArrowUp && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }

    playerRef.current.applyImpulse(impulse, true);
    if (changeRotation) {
      if (impulse.x !== 0 || impulse.z !== 0) {
        const angle = Math.atan2(-impulse.z, impulse.x);
        playerRef.current.rotation.y = angle;
      }
    }
  });
  //Key press event
  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((keys) => ({ ...keys, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((keys) => ({ ...keys, [event.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <group>
      {/*
        Wrap the Model component with Suspense to ensure the GLB model and animations are loaded properly.
        Pass animations prop to Model component.
      */}
      <Suspense fallback={null}>
        <Model animations={animations} actionsRef={actionsRef} />
      </Suspense>
    </group>
  );
};

export default Controller;

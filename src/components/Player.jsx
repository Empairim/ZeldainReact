import { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const Player = () => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/glb/character.glb");

  const currentAction = useRef(null);
  const [keysPressed, setKeysPressed] = useState({
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
  });

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

  // useFrame((state, delta) => {
  //   if (mixer) {
  //     const elapsedTime = state.clock.getElapsedTime();
  //     mixer.update(elapsedTime);
  //   }

  //   if (!group.current) return;

  //  const impulse = new THREE.Vector3();
  //   const linvel = group.current.linvel();
  //   const MOVEMENT_SPEED = 0.1;
  //   const MAX_VEL = 1.75;
  //   let changeRotation = false;

  //   if (keysPressed["w"] && linvel.z < MAX_VEL) {
  //     impulse.z += MOVEMENT_SPEED;
  //     actions?.run.play();
  //   }

  //   if (keysPressed["s"] && linvel.z < MAX_VEL) {
  //     impulse.z -= MOVEMENT_SPEED;
  //     if (animations?.actions["run"]) {
  //       currentAction.current = animations.actions["run"];
  //       currentAction.current.play();
  //     }
  //   }

  //   if (keysPressed["a"] && linvel.x < MAX_VEL) {
  //     impulse.x -= MOVEMENT_SPEED;
  //     // if (animations?.actions["straf"]) {
  //     //   currentAction.current = animations.actions["straf"];
  //     //   currentAction.current.play();
  //     // }
  //   }

  //   if (keysPressed["d"] && linvel.x < MAX_VEL) {
  //     impulse.x += MOVEMENT_SPEED;
  //     if (animations?.actions["straf"]) {
  //       currentAction.current = animations.actions["straf"];
  //       currentAction.current.play();
  //     }
  //   }

  //   if (keysPressed["Space"]) {
  //     if (animations?.actions["jump"]) {
  //       currentAction.current = animations.actions["jump"];
  //       currentAction.current.play();
  //     }
  //   }

  //   if (keysPressed["1"]) {
  //     if (animations?.actions["attack1"]) {
  //       currentAction.current = animations.actions["attack1"];
  //       currentAction.current.play();
  //     }
  //   }

  //   group.current.applyImpulse(impulse, true);

  //   // Add your rotation logic here...

  //   const targetPosition = group.current.translation();
  //   const lerpFactor = 0.1;

  //   camera.position.x += (targetPosition.x - camera.position.x) * lerpFactor;
  //   camera.position.y +=
  //     (targetPosition.y + 3 - camera.position.y) * lerpFactor;
  //   camera.position.z +=
  //     (targetPosition.z + 6 - camera.position.z) * lerpFactor;

  //   camera.lookAt(
  //     new THREE.Vector3(
  //       targetPosition.x,
  //       targetPosition.y + 2,
  //       targetPosition.z
  //     )
  //   );
  // });
  const { scene, camera } = useThree();
  const mixerRef = useRef(null);
  const actionsRef = useRef({});
  const groupRef = useRef(null); // Assuming group is a ref to your character's group
  const impulse = new THREE.Vector3();
  const MOVEMENT_SPEED = 0.1;

  useEffect(() => {
    mixerRef.current = new THREE.AnimationMixer(scene);
    animations.forEach((clip) => {
      const action = mixerRef.current.clipAction(clip);
      actionsRef.current[clip.name] = action;
    });
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "w" && actionsRef.current["run"]) {
        impulse.z += MOVEMENT_SPEED;
        actionsRef.current["run"].play();
      }
      if (event.key === "s" && actionsRef.current["run"]) {
        impulse.z -= MOVEMENT_SPEED;
        actionsRef.current["run"].play();
      }
      if (event.key === "a" && actionsRef.current["straf"]) {
        impulse.x -= MOVEMENT_SPEED;
        actionsRef.current["straf"].play();
      }
      if (event.key === "d" && actionsRef.current["straf"]) {
        impulse.x += MOVEMENT_SPEED;
        actionsRef.current["straf"].play();
      }
      if (event.key === " ") {
        actionsRef.current["jump"].play();
      }
      if (event.key === "k") {
        actionsRef.current["attack1"].play();
      }
      if (event.key === "l") {
        actionsRef.current["attack2"].play();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "w" && actionsRef.current["run"]) {
        impulse.z -= MOVEMENT_SPEED;
        actionsRef.current["run"].stop();
      }
      if (event.key === "s" && actionsRef.current["run"]) {
        impulse.z += MOVEMENT_SPEED;
        actionsRef.current["run"].stop();
      }
      if (event.key === "a" && actionsRef.current["straf"]) {
        impulse.x += MOVEMENT_SPEED;
        actionsRef.current["straf"].stop();
      }
      if (event.key === "d" && actionsRef.current["straf"]) {
        impulse.x -= MOVEMENT_SPEED;
        actionsRef.current["straf"].stop();
      }
      if (event.key === " ") {
        actionsRef.current["jump"].stop();
      }
      if (event.key === "k") {
        actionsRef.current["attack1"].stop();
      }
      if (event.key === "l") {
        actionsRef.current["attack2"].stop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.applyImpulse(impulse, true);
      const targetPosition = groupRef.current.translation();
      const lerpFactor = 0.1;

      camera.position.x += (targetPosition.x - camera.position.x) * lerpFactor;
      camera.position.y +=
        (targetPosition.y + 3 - camera.position.y) * lerpFactor;
      camera.position.z +=
        (targetPosition.z + 6 - camera.position.z) * lerpFactor;

      camera.lookAt(
        new THREE.Vector3(
          targetPosition.x,
          targetPosition.y + 2,
          targetPosition.z
        )
      );
    }
  });
  return (
    <RigidBody ref={group}>
      <group name="Scene">
        <group name="ArmatureCharacter">
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials.Material}
            skeleton={nodes.body.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </RigidBody>
  );
};

useGLTF.preload("/glb/character.glb");

export default Player;

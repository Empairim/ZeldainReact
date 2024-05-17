import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { RigidBody, euler, quat } from "@react-three/rapier";
import * as THREE from "three";

const Player = () => {
  //const and refs for animation destrukturing
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/glb/character.glb");
  const { scene, camera } = useThree();
  const mixerRef = useRef(null);
  const actionsRef = useRef({});
  const impulse = new THREE.Vector3();
  const MOVEMENT_SPEED = 0.4;

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
    mixerRef.current = new THREE.AnimationMixer(scene);
    animations.forEach((clip) => {
      const action = mixerRef.current.clipAction(clip);
      actionsRef.current[clip.name] = action;
      if (clip.name === "idle") {
        action.play(); // Play the "idle" animation by default
      }
    });
  }, [animations, scene]);
  const MAX_SPEED = 10;
  // animation and controls
  // animation and controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (group.current && actionsRef.current["run"]) {
        const currentSpeed = 0;

        if (currentSpeed < MAX_SPEED) {
          // Only apply an impulse if the current speed is less than the maximum speed
          if (event.key === "w") {
            group.current.applyImpulse(
              { x: 0, y: 0, z: -MOVEMENT_SPEED },
              true
            );
            actionsRef.current["run"].fadeIn().play();
            group.current.setRotation(quat({ x: 0, y: Math.PI, z: 0 }), true); // Snap rotation
          }
          if (event.key === "s") {
            group.current.applyImpulse({ x: 0, y: 0, z: MOVEMENT_SPEED }, true);
            actionsRef.current["run"].fadeIn().play();
            group.current.setRotation(quat({ x: 0, y: 0, z: 0 }), true); // Face backward
          }
          if (event.key === "a") {
            group.current.applyImpulse(
              { x: -MOVEMENT_SPEED, y: 0, z: 0 },
              true
            );
            actionsRef.current["run"].fadeIn().play();

            group.current.setRotation(
              quat({ x: 0, y: -Math.PI / 2, z: 0 }),
              true
            ); // Face left
          }
          if (event.key === "d") {
            group.current.applyImpulse({ x: MOVEMENT_SPEED, y: 0, z: 0 }, true);
            actionsRef.current["run"].fadeIn().play();

            group.current.setRotation(
              quat({ x: 0, y: Math.PI / 2, z: 0 }),
              true
            ); // Face right
          }
        }

        if (event.key === " ") {
          actionsRef.current["jump"].fadeIn().play();
        }
        if (event.key === "k") {
          actionsRef.current["attack1"].fadeIn().play();
        }
        if (event.key === "l") {
          actionsRef.current["attack2"].fadeIn().play();
        }
      }
    };
    const handleKeyUp = (event) => {
      if (group.current && actionsRef.current["run"]) {
        if (event.key === "w" || event.key === "s") {
          group.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          actionsRef.current["run"].fadeOut().stop();
        }
        if (event.key === "a" || event.key === "d") {
          group.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          actionsRef.current["run"].fadeOut().stop();
        }
        if (event.key === " ") {
          actionsRef.current["jump"].fadeOut().stop();
        }
        if (event.key === "k") {
          actionsRef.current["attack1"].fadeOut().stop();
        }
        if (event.key === "l") {
          actionsRef.current["attack2"].fadeOut().stop();
        }
        actionsRef.current["idle"].fadeIn().play(); // Play the "idle" animation when no keys are pressed
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });
  //////
  //camera follow
  useFrame(() => {
    if (group.current) {
      group.current.applyImpulse(impulse, true);
      const targetPosition = group.current.translation();
      const lerpFactor = 0.1;

      camera.position.x += (targetPosition.x - camera.position.x) * lerpFactor;
      camera.position.y +=
        (targetPosition.y + 3 - camera.position.y) * lerpFactor;
      camera.position.z +=
        (targetPosition.z + 6 - camera.position.z) * lerpFactor;

      camera.lookAt(
        new THREE.Vector3(
          targetPosition.x,
          targetPosition.y + 3,
          targetPosition.z
        )
      );
    }
  });
  ////
  //rigid body
  return (
    <RigidBody
      ref={group}
      type="Dynamic"
      enabledRotations={[false, true, false]}
      colliders={"cuboid"}
      setRotation={euler(0, 0, 0)}
    >
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

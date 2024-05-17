// import { useEffect, useRef, useState } from "react";
// import { useThree, useFrame } from "@react-three/fiber";
// import { usePlayer } from "./PlayerContext";
// import * as THREE from "three";

// const Controller = ({ playerRef }) => {
//   const { camera } = useThree();
//   const { animations } = usePlayer();
//   const [keysPressed, setKeysPressed] = useState({
//     ArrowRight: false,
//     ArrowLeft: false,
//     ArrowUp: false,
//     ArrowDown: false,
//     Space: false,
//   });
//   const currentAction = useRef(null);
//   const mixer = useRef(null);

//   useEffect(() => {
//     if (animations && animations.actions) {
//       mixer.current = animations.mixer;
//       console.log("Animations loaded:", animations.names);
//     }
//   }, [animations]);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       setKeysPressed((keys) => ({ ...keys, [event.key]: true }));
//     };

//     const handleKeyUp = (event) => {
//       setKeysPressed((keys) => ({ ...keys, [event.key]: false }));
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   useFrame((state, delta) => {
//     if (mixer.current) {
//       mixer.current.update(delta);
//     }

//     if (!playerRef.current) return;

//     const impulse = new THREE.Vector3();
//     const linvel = playerRef.current.linvel();
//     const MOVEMENT_SPEED = 0.1;
//     const MAX_VEL = 1.75;
//     let changeRotation = false;

//     if (keysPressed.ArrowRight && linvel.x < MAX_VEL) {
//       impulse.x += MOVEMENT_SPEED;
//       changeRotation = true;
//       if (animations?.actions["run_shield"]) {
//         if (currentAction.current !== animations.actions["run_shield"]) {
//           if (currentAction.current) {
//             currentAction.current.fadeOut(0.5);
//           }
//           currentAction.current = animations.actions["run_shield"];
//           currentAction.current.reset().fadeIn(0.5).play();
//           console.log("Playing run_shield animation");
//         }
//       }
//     }
//     if (keysPressed.ArrowLeft && linvel.x > -MAX_VEL) {
//       impulse.x -= MOVEMENT_SPEED;
//       changeRotation = true;
//       if (animations?.actions["run"]) {
//         if (currentAction.current !== animations.actions["run"]) {
//           if (currentAction.current) {
//             currentAction.current.fadeOut(0.5);
//           }
//           currentAction.current = animations.actions["run"];
//           currentAction.current.reset().fadeIn(0.5).play();
//           console.log("Playing run animation");
//         }
//       }
//     }
//     if (keysPressed.ArrowDown && linvel.z < MAX_VEL) {
//       impulse.z += MOVEMENT_SPEED;
//       changeRotation = true;
//       if (animations?.actions["run"]) {
//         if (currentAction.current) {
//           currentAction.current.fadeOut(0.5);
//         }
//         currentAction.current = animations.actions["run"];
//         currentAction.current.reset().fadeIn(0.5).play();
//         console.log("Playing run animation");
//       }
//     }
//     if (keysPressed.ArrowUp && linvel.z > -MAX_VEL) {
//       impulse.z -= MOVEMENT_SPEED;
//       changeRotation = true;
//       if (animations?.actions["run"]) {
//         if (currentAction.current) {
//           currentAction.current.fadeOut(0.5);
//         }
//         currentAction.current = animations.actions["run"];
//         currentAction.current.reset().fadeIn(0.5).play();
//         console.log("Playing run animation");
//       }
//     }

//     playerRef.current.applyImpulse(impulse, true);

//     if (changeRotation) {
//       if (impulse.x !== 0 || impulse.z !== 0) {
//         const angle = Math.atan2(-impulse.z, impulse.x);
//         playerRef.current.setRotation(
//           new THREE.Quaternion().setFromAxisAngle(
//             new THREE.Vector3(0, 1, 0),
//             angle
//           )
//         );
//       }
//     }

//     if (
//       !changeRotation &&
//       currentAction.current === animations.actions["run"]
//     ) {
//       currentAction.current.fadeOut(0.5);
//       currentAction.current = null;
//       console.log("Stopping run animation");
//     }

//     const targetPosition = playerRef.current.translation();
//     const lerpFactor = 0.1;

//     camera.position.x += (targetPosition.x - camera.position.x) * lerpFactor;
//     camera.position.y +=
//       (targetPosition.y + 3 - camera.position.y) * lerpFactor;
//     camera.position.z +=
//       (targetPosition.z + 6 - camera.position.z) * lerpFactor;

//     camera.lookAt(
//       new THREE.Vector3(
//         targetPosition.x,
//         targetPosition.y + 2,
//         targetPosition.z
//       )
//     );
//   });

//   return null;
// };

// export default Controller;
import { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { usePlayer } from "./PlayerContext";
import * as THREE from "three";

const Controller = ({ playerRef }) => {
  const { camera } = useThree();
  const { animations } = usePlayer();
  const currentAction = useRef(null);
  const mixer = useRef(null);
  console.log("animations", animations);

  useEffect(() => {
    if (animations && animations.actions) {
      mixer.current = animations.mixer;
      console.log("Animations loaded:", animations.names);
    }
  }, [animations]);

  useEffect(() => {
    const handleClick = () => {
      if (animations?.actions["run"]) {
        if (currentAction.current) {
          currentAction.current.fadeOut(0.5);
        }
        currentAction.current = animations.actions["run"];
        currentAction.current.reset().fadeIn(0.5).play();
        console.log("Playing run animation");
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [animations]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return null;
};

export default Controller;

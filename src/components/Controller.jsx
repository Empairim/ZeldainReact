// import { useKeyboardControls } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const MOVEMENT_SPEED = 0.1;
// const MAX_VEL = 3;

// export const CharacterController = ({ rigidBody }) => {
//   const leftPressed = useKeyboardControls((state) => state && state["a"]);
//   const rightPressed = useKeyboardControls((state) => state && state["d"]);
//   const backPressed = useKeyboardControls((state) => state && state["s"]);
//   const forwardPressed = useKeyboardControls((state) => state && state["w"]);

//   useFrame(() => {
//     const impulse = { x: 0, y: 0, z: 0 };

//     const linvel = rigidBody.current.linvel();
//     if (rightPressed && linvel.x < MAX_VEL) {
//       impulse.x += MOVEMENT_SPEED;
//     }
//     if (leftPressed && linvel.x > -MAX_VEL) {
//       impulse.x -= MOVEMENT_SPEED;
//     }
//     if (backPressed && linvel.z < MAX_VEL) {
//       impulse.z += MOVEMENT_SPEED;
//     }
//     if (forwardPressed && linvel.z > -MAX_VEL) {
//       impulse.z -= MOVEMENT_SPEED;
//     }

//     rigidBody.current.applyImpulse(impulse, true);
//   });

//   return null;
// };

// export default CharacterController;

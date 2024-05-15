/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
// import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";
import { RigidBody, BallCollider } from "@react-three/rapier";

const Player = forwardRef(({ mesh }, ref) => {
  if (!mesh || !mesh.position) {
    console.error("Invalid mesh:", mesh);
    return null;
  }

  // Rest of your code...

  // Reset the mesh's position and enable shadows

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  // Add the mesh to the player
  return (
    <RigidBody type="DYNAMIC" position={[0, 10, 0]}>
      <primitive object={mesh} ref={ref} />
    </RigidBody>
  );
});

Player.propTypes = {
  mesh: PropTypes.shape({
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default Player;

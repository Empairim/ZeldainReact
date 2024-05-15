/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import Controller from "./Controller";

const Player = ({ mesh }) => {
  if (!mesh || !mesh.position) {
    console.error("Invalid mesh:", mesh);
    return null;
  }
  const rigidBody = useRef();

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  // Add the mesh to the player
  return (
    <>
      <Controller playerRef={rigidBody} />
      <RigidBody
        ref={rigidBody}
        type="DYNAMIC"
        position={[0, 10, 0]}
        colliders={"hull"}
        friction={3}
        linearDamping={0.5}
        fixedRotations={[true, true, true]}
      >
        <primitive object={mesh} />
      </RigidBody>
    </>
  );
};

// propTypes to validate the props passed to the Player component
Player.displayName = "Player";
Player.propTypes = {
  mesh: PropTypes.shape({
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
    }).isRequired,
    castShadow: PropTypes.bool,
    receiveShadow: PropTypes.bool,
  }).isRequired,
};

export default Player;

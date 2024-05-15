/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

const Player = ({ mesh }) => {
  if (!mesh || !mesh.position) {
    console.error("Invalid mesh:", mesh);
    return null;
  }
  const rigidBody = useRef();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (rigidBody.current) {
        switch (event.key) {
          case "w":
            // forward
            rigidBody.current.setLinvel({ x: 0, y: 0, z: 1 }, true);
            break;
          case "a":
            // left
            rigidBody.current.setLinvel({ x: -1, y: 0, z: 0 }, true);
            break;
          case "s":
            // backward
            rigidBody.current.setLinvel({ x: 0, y: 0, z: -1 }, true);
            break;
          case "d":
            // right
            rigidBody.current.setLinvel({ x: 1, y: 0, z: 0 }, true);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  console.log(rigidBody);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  // Add the mesh to the player
  return (
    <>
      <RigidBody ref={rigidBody} type="DYNAMIC" position={[0, 10, 0]}>
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

/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { RigidBody } from "@react-three/rapier";

const World = ({ visuals }) => {
  // Add shadows to the visuals
  visuals.forEach((mesh) => {
    mesh.receiveShadow = true;
    mesh.castShadow = true;
  });

  // Add the meshes to the world
  return visuals.map((mesh, index) => (
    <RigidBody key={index} type="fixed" colliders={"trimesh"}>
      <primitive object={mesh} />
    </RigidBody>
  ));
};

// propTypes to validate the props passed to the World component
World.displayName = "World";
World.propTypes = {
  visuals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default World;

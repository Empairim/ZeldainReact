/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { RigidBody, TrimeshCollider } from "@react-three/rapier";

const World = forwardRef(({ visuals }) => {
  // Initialize physics...

  // Initialize visuals
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
});

World.displayName = "World";

World.propTypes = {
  visuals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default World;

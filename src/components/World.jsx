import PropTypes from "prop-types";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

const World = () => {
  const glb = useGLTF("/glb/world1.glb");
  const visuals = [];
  const colliders = [];

  glb.scene.traverse((mesh) => {
    const name = mesh.name;
    if (name.includes("visual")) {
      visuals.push(mesh);
    } else if (name.includes("collider")) {
      colliders.push(mesh);
    }
  });

  // Add shadows to the visuals
  visuals.forEach((mesh) => {
    mesh.receiveShadow = true;
    mesh.castShadow = true;
  });

  // Add the meshes to the world
  return visuals.map((mesh, index) => (
    <RigidBody key={index} friction={0.5} type="fixed" colliders={"trimesh"}>
      <primitive object={mesh} />
    </RigidBody>
  ));
};

export default World;

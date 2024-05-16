import { useGLTF } from "@react-three/drei";

const UseWorldAssets = (path) => {
  const glb = useGLTF(path);
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

  return { visuals, colliders };
};

export default UseWorldAssets;

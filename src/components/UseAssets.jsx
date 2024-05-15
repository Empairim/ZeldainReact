import { useGLTF } from "@react-three/drei";

const useAssets = (path) => {
  const glb = useGLTF(path);
  const visuals = [];
  const colliders = [];
  const players = [];

  glb.scene.traverse((mesh) => {
    const name = mesh.name;
    if (name.includes("visual")) {
      visuals.push(mesh);
    } else if (name.includes("collider")) {
      // Add the args property to the mesh
      mesh.args = [1, 1, 1]; // Replace with the actual dimensions
      colliders.push(mesh);
    } else if (name.includes("player")) {
      players.push(mesh);
    }
  });

  return { visuals, colliders, players };
};

export default useAssets;

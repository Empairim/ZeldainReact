import { useGLTF } from "@react-three/drei";
import { Group } from "three";

const UsePlayerAssets = (path) => {
  const glb = useGLTF(path);
  let player = new Group();

  if (glb.scene) {
    glb.scene.traverse((mesh) => {
      player.add(mesh);
    });
  }
  console.log("player", player);
  return player;
};

export default UsePlayerAssets;

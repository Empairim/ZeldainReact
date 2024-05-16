/* eslint-disable react/no-unknown-property */

import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/glb/character.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="ArmatureCharacter">
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials.Material}
            skeleton={nodes.body.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/glb/character.glb");

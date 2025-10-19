import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['tripo_node_3e6cbe95-6b4a-40f5-8b0d-ec64afdd6748']: THREE.Mesh
  }
  materials: {
    ['tripo_mat_3e6cbe95-6b4a-40f5-8b0d-ec64afdd6748']: THREE.MeshStandardMaterial
  }
}

export function Model(props: React.ComponentProps<'group'>) {
  const { nodes, materials } = useGLTF('/garrafadeágua3d.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['tripo_node_3e6cbe95-6b4a-40f5-8b0d-ec64afdd6748'].geometry}
        material={materials['tripo_mat_3e6cbe95-6b4a-40f5-8b0d-ec64afdd6748']}
      />
    </group>
  )
}

useGLTF.preload('/garrafadeágua3d.glb')
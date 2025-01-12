import * as THREE from 'three';
import React from 'react';
import { useGraph } from '@react-three/fiber';
import { PerspectiveCamera, useAnimations, useGLTF } from '@react-three/drei';
import { GLTF, SkeletonUtils } from 'three-stdlib';

type ActionName = 'EmptyAction';

interface GLTFAction extends THREE.AnimationClip {
    name: ActionName;
}

type GLTFResult = GLTF & {
    nodes: {
        Mars: THREE.Mesh;
    };
    materials: {
        Mars: THREE.MeshStandardMaterial;
    };
    animations: GLTFAction[];
};

export function MarsModel(props: JSX.IntrinsicElements['group']) {
    const group = React.useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF('/models/mars_ciemniejszy.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as GLTFResult;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { actions } = useAnimations(animations, group);

    let sunLight: THREE.DirectionalLight | null = null;
    clone.traverse(child => {
        if (child.type === 'DirectionalLight' && child.name === 'Sun') {
            sunLight = child as THREE.DirectionalLight;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Empty" position={[0, 0, -1.708]} />
                {sunLight && (
                    <primitive
                        object={sunLight}
                        position={(sunLight as THREE.DirectionalLight).position}
                        rotation={(sunLight as THREE.DirectionalLight).rotation}
                    />
                )}
                <PerspectiveCamera
                    name="Camera"
                    makeDefault={true}
                    far={1000}
                    near={0.1}
                    fov={22.895}
                    position={[-5.743, 2.771, -3.815]}
                    rotation={[-2.324, -1.07, -2.269]}
                />
                <mesh
                    name="Mars"
                    geometry={nodes.Mars.geometry}
                    material={materials.Mars}
                    rotation={[-Math.PI, 0.654, -Math.PI]}
                />
            </group>
        </group>
    );
}

useGLTF.preload('/models/mars_ciemniejszy.glb');

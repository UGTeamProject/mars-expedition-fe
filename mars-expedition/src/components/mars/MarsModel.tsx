import * as THREE from 'three';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { PerspectiveCamera, useAnimations, useGLTF } from '@react-three/drei';
import { GLTF, SkeletonUtils } from 'three-stdlib';

interface GLTFAction extends THREE.AnimationClip {
    name: 'EmptyAction';
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
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF('/models/mars.glb');
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as GLTFResult;
    const { actions } = useAnimations(animations, group);

    // light
    let sunLight: THREE.DirectionalLight | null = null;
    clone.traverse(child => {
        if (child.type === 'DirectionalLight' && child.name === 'Sun') {
            sunLight = child as THREE.DirectionalLight;
            sunLight.intensity = 12;
        }
    });

    // animation
    const animationSpeed = (30 * Math.PI) / 180;
    const speedPerFrame = animationSpeed / 200;
    const marsRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (marsRef.current) {
            marsRef.current.rotation.y += speedPerFrame;
        }
    });

    useEffect(() => {
        if (actions) {
            const action = actions[Object.keys(actions)[0]];
            action?.play();
        }
    }, [actions]);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Empty" position={[0, 0, -1.708]} />
                {sunLight && (
                    <directionalLight
                        color="#fff2dc"
                        position={[2.296, 7.003, -12.178]}
                        rotation={[-2.589, 0.163, 0.129]}
                        target={sunLight}
                    >
                        <primitive object={sunLight} position={[0, 0, -1]} />
                    </directionalLight>
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
                    ref={marsRef}
                    name="Mars"
                    geometry={nodes.Mars.geometry}
                    material={materials.Mars}
                    rotation={[-Math.PI, 0.654, -Math.PI]}
                />
            </group>
        </group>
    );
}

useGLTF.preload('/models/mars.glb');

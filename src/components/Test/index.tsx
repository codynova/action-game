import React, { useRef, useEffect } from 'react';
import { ReactThreeFiber, useThree, useFrame, useRender, useUpdate, Canvas, extend } from 'react-three-fiber';
import { PerspectiveCamera, Geometry } from 'three';
import { useCannon, PhysicsProvider } from 'Hooks';
import { Vector2, Vector3 } from 'Types';
import { CapsuleGeometry } from 'Primitives';
import * as CANNON from 'cannon';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			// capsuleGeometry: ReactThreeFiber.Object3DNode<CapsuleGeometry, typeof CapsuleGeometry>;
			capsuleGeometry: any;
		}
	}
}

extend({ CapsuleGeometry });

const Camera = (props: ReactThreeFiber.Object3DNode<PerspectiveCamera, typeof PerspectiveCamera>) => {
	const cameraRef = useRef<PerspectiveCamera>({} as PerspectiveCamera);
	const { setDefaultCamera } = useThree();

	useEffect(() => {
		setDefaultCamera(cameraRef.current);
	}, []);

	useFrame(() => cameraRef.current.updateMatrixWorld());
	return (
		<perspectiveCamera
			{...props}
			ref={cameraRef}
		/>
	);
};

const Floor = ({
	position,
	width,
	height,
	color,
}: {
	position: Vector3;
	width: number;
	height: number;
	color: string;
}) => {
	const floorRef = useCannon({ mass: 0 }, body => {
		body.addShape(new CANNON.Plane());
		body.position.set(...position);
	});
	return (
		<mesh
			receiveShadow
			ref={floorRef}
		>
			<planeBufferGeometry
				attach="geometry"
				args={[ width, height ]}
			/>
			<meshPhongMaterial
				attach="material"
				color={color}
			/>
		</mesh>
	);
};

// Attempt to make capsule physics based on CANNON.Cylinder

const Capsule = ({
	position = [ 0, 0, 0 ],
	radius = 1,
	height = 2,
	segments = 32,
}: {
	position?: Vector3;
	radius?: number;
	height?: number;
	segments?: number;
}) => {
	const capsuleRef = useCannon({ mass: 10 }, body => {
		body.addShape(new CANNON.Cylinder(radius, radius, height, segments));
		body.position.set(...position);
	});

	return (
		<mesh
			castShadow
			ref={capsuleRef}
		>
			<capsuleGeometry
				attach="geometry"
				args={[ radius, height, segments ]}
			/>
			<meshNormalMaterial
				attach="material"
				color="red"
			/>
		</mesh>
	);
};

const Cube = ({
	position = [ 0, 0, 0 ],
	width = 1,
	height = 1,
	depth = 1,
}: {
	position?: Vector3;
	width?: number;
	height?: number;
	depth?: number;
}) => {
	const cubRef = useCannon({ mass: 10 }, body => {
		body.addShape(new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)));
		body.position.set(...position);
	});
	return (
		<mesh
			castShadow
			receiveShadow
			ref={cubRef}
		>
			<boxGeometry
				attach="geometry"
				args={[ width, height, depth ]}
			/>
			<meshStandardMaterial attach="material" />
		</mesh>
	);
};

const Test = () => {
	return (
		<div style={{ background: 'grey', width: '100%', height: '100%' }}>
			<Canvas shadowMap>
				<ambientLight intensity={0.5} />
				<spotLight
					castShadow
					intensity={0.8}
					position={[ 0, 0, 15 ]}
					angle={0.3}
					penumbra={1}
				/>
				<Camera
					position={[ 0, -15, 10 ]}
					rotation={[ 1, 0, 0 ]}
				/>
				<PhysicsProvider>
					<Cube
						position={[ -0.5, -0.5, 1 ]}
						width={1}
						height={2}
						depth={1}
					/>
					<Cube
						position={[ 0, 0, 5 ]}
						width={2}
						height={1}
						depth={1}
					/>
					<Cube
						position={[ 0.5, 0.5, 7 ]}
						width={1}
						height={1}
						depth={2}
					/>
					<Capsule
						position={[ 0, 0, 2 ]}
						radius={0.5}
						height={1}
						segments={32}
					/>
					<Capsule
						position={[ 0.5, 0.5, 6 ]}
						radius={0.5}
						height={1}
						segments={32}
					/>
					<Capsule
						position={[ 0, 1, 4 ]}
						radius={0.5}
						height={1}
						segments={32}
					/>
					<Floor
						position={[ 0, 0, 0 ]}
						width={10}
						height={10}
						color="#272727"
					/>
				</PhysicsProvider>
			</Canvas>
		</div>
	);
};

export { Test };

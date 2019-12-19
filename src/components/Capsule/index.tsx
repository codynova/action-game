import React from 'react';
import { extend, ReactThreeFiber } from 'react-three-fiber';
import { CapsuleGeometry } from 'Primitives';
import { useCannon } from 'Hooks';
import { Vector3 } from 'Types';
import * as CANNON from 'cannon';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			capsuleGeometry: ReactThreeFiber.Object3DNode<typeof CapsuleGeometry, Parameters<typeof CapsuleGeometry>>;
		}
	}
}

extend({ CapsuleGeometry });

const Capsule = ({
	position = [ 0, 0, 0 ],
	radius = 0.5,
	height = 1,
	segments = 32,
	color = 'white',
}: {
	position?: Vector3;
	radius?: number;
	height?: number;
	segments?: number;
	color?: string;
}) => {
	const capsuleRef = useCannon({ mass: 10 }, body => {
		const sphereShape = new CANNON.Sphere(radius);
		body.addShape(sphereShape, new CANNON.Vec3(0, 0, height * 0.5));
		body.addShape(new CANNON.Cylinder(radius, radius, height, segments));
		body.addShape(sphereShape, new CANNON.Vec3(0, 0, -height * 0.5));
		body.position.set(...position);
	});

	return (
		<mesh
			castShadow
			receiveShadow
			ref={capsuleRef}
		>
			<capsuleGeometry
				attach="geometry"
				args={[ radius, height, segments ]}
			/>
			<meshStandardMaterial
				attach="material"
				color={color}
			/>
		</mesh>
	);
};

export { Capsule };

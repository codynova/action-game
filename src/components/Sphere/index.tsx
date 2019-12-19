import React from 'react';
import { useCannon } from 'Hooks';
import { Vector3 } from 'Types';
import * as CANNON from 'cannon';

const Sphere = ({
	position = [ 0, 0, 0 ],
	radius = 0.5,
}: {
	position?: Vector3;
	radius?: number;
}) => {
	const sphereRef = useCannon({ mass: 10 }, body => {
		body.addShape(new CANNON.Sphere(radius));
		body.position.set(...position);
	});

	return (
		<mesh
			castShadow
			receiveShadow
			ref={sphereRef}
		>
			<sphereGeometry
				attach="geometry"
				args={[ radius ]}
			/>
			<meshStandardMaterial attach="material" />
		</mesh>
	);
};

export { Sphere };

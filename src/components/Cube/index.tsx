import React from 'react';
import { useCannon } from 'Hooks';
import { Vector3 } from 'Types';
import * as CANNON from 'cannon';

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

export { Cube };

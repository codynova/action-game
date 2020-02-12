import React from 'react';

const RaymarchTest = () => {
	return (
		<mesh>
			<sphereGeometry
				attach="geometry"
				args={[ 1.5, 32, 32 ]}
			/>
			<meshNormalMaterial
				attach="material"
			/>
		</mesh>
	);
};

export { RaymarchTest };

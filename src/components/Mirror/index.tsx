import React from 'react';
import { extend, useThree } from 'react-three-fiber';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

extend({ Reflector });

const Mirror = () => {
	const { size: { width, height } } = useThree();

	return (
		<reflector
			position={[ 0, 10, 0 ]}
			rotation={[ Math.PI / 2, 0, 0 ]}
			args={[
				undefined,
				{
					clipBias: 0.003,
					textureWidth: width,
					textureHeight: height,
					recursion: 1,
				},
			]}
		>
			<planeBufferGeometry
				attach="geometry"
				args={[ 40, 40 ]}
			/>
		</reflector>
	);
};

export { Mirror };

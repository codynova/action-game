import React, { useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { Vector3 } from 'Types';
import { RaymarchMetaballShader } from 'Shaders';

const RaymarchMetaball = ({
	width = 1,
	height = 1,
}: {
	width?: number;
	height?: number;
}) => {
	const { size } = useThree();
	const shaderMaterial = useRef<THREE.ShaderMaterial>();

	useFrame(({ clock }) => {
		shaderMaterial.current!.uniforms.time.value = clock.getElapsedTime();
		shaderMaterial.current!.uniforms.resolution.value = [ size.width, size.height ];
	});

	return (
		<mesh>
			<planeBufferGeometry
				attach="geometry"
				args={[ width, height ]}
			/>
			<shaderMaterial
				attach="material"
				args={[ RaymarchMetaballShader ]}
				ref={shaderMaterial}
			/>
		</mesh>
	);
};

export { RaymarchMetaball };

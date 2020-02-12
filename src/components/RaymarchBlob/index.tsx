import React, { useRef, useMemo, useEffect } from 'react';
import { Vector2, Matrix4 } from 'three';
import { useThree, useFrame } from 'react-three-fiber';
import { RaymarchBlobShader, RaymarchTestShader } from 'Shaders';

const RaymarchBlob = ({
	position,
}: {
	position: [number, number, number];
}) => {
	const shaderMaterial = useRef<THREE.ShaderMaterial>();

	useFrame(({ clock }) => {
		shaderMaterial.current!.uniforms.time.value = clock.getElapsedTime();
		// shaderMaterial.current!.extensions.derivatives = true;
	});

	return (
		<mesh
			position={position}
			frustumCulled={false}
		>
			<planeBufferGeometry
				attach="geometry"
				args={[ 2, 2 ]}
			/>
			<rawShaderMaterial
				attach="material"
				args={[ RaymarchBlobShader ]}
				ref={shaderMaterial}
			/>
		</mesh>
	);
};

const RaymarchTest = ({
	position,
}: {
	position: [number, number, number];
}) => {
	const { camera, size: { width, height } } = useThree();
	const shaderMaterial = useRef<THREE.ShaderMaterial>();

	useFrame(({ clock }) => {
		// shaderMaterial.current!.uniforms.time.value = clock.getElapsedTime();
		// shaderMaterial.current!.extensions.derivatives = true;
		shaderMaterial.current!.uniforms.resolution.value = new Vector2(width, height);
		shaderMaterial.current!.uniforms.cameraWorldMatrix.value = camera.matrixWorld;
		shaderMaterial.current!.uniforms.cameraProjectionMatrixInverse.value = new Matrix4().getInverse(camera.projectionMatrix);
	});

	return (
		<mesh
			position={position}
			frustumCulled={false}
		>
			<planeBufferGeometry
				attach="geometry"
				args={[ 2, 2 ]}
			/>
			<rawShaderMaterial
				attach="material"
				args={[ RaymarchTestShader ]}
				ref={shaderMaterial}
			/>
		</mesh>
	);
};

export { RaymarchBlob, RaymarchTest };

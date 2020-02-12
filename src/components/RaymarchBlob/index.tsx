import React, { useRef, useMemo, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
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
		shaderMaterial.current!.uniforms.time.value = clock.getElapsedTime();
		// shaderMaterial.current!.extensions.derivatives = true;
		shaderMaterial.current!.uniforms.resolution.value = [ width, height ];
		// shaderMaterial.current!.uniforms.cameraWorldMatrix.value = camera.matrixWorld;
		// shaderMaterial.current!.uniforms.cameraProjectionMatrixInverse.value = new Matrix4().getInverse(camera.projectionMatrix);
	});

	return (
		<mesh
			position={position}
			frustumCulled={false}
		>
			<planeBufferGeometry
				attach="geometry"
				args={[ 1, 1 ]}
			/>
			<shaderMaterial
				attach="material"
				args={[ RaymarchBlobShader ]}
				ref={shaderMaterial}
			/>
		</mesh>
	);
};

const RaymarchEffect = () => {
	const composer = useRef<EffectComposer>();
	const { scene, gl, size, camera } = useThree();

	useEffect(() => {
		composer.current!.setSize(size.width, size.height);
	}, [ size ]);

	useFrame(() => composer.current!.render(), 1);

	return (
		<effectComposer
			ref={composer}
			args={[ gl ]}
		>
			<renderPass
				attachArray="passes"
				scene={scene}
				camera={camera}
			/>
			<shaderPass
				renderToScreen
				attachArray="passes"
				args={[ RaymarchBlobShader ]}
			/>
		</effectComposer>
	);
};

export { RaymarchBlob, RaymarchTest, RaymarchEffect };

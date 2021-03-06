import React, { useRef, useMemo, useEffect } from 'react';
import { useThree, useFrame, useUpdate } from 'react-three-fiber';
import { SphereGeometry } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { Vector3 } from 'Types';
import { VolumetricLightShader, TestShader } from 'Shaders';

declare let noise: any;

const Effect = () => {
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
				args={[ VolumetricLightShader ]}
			/>
		</effectComposer>
	);
};

const DeformedGeometry = () => {
	const sphereGeometryRef = useUpdate<SphereGeometry>(sphereGeometry => {
		const { vertices } = sphereGeometry;
		const inputScale = 1.3;

		for (let i = 0, verticesLength = vertices.length; i < verticesLength; i++) {
			const p = vertices[i];
			p.normalize().multiplyScalar(1 + (0.3 * noise.perlin3(p.x * inputScale, p.y * inputScale, p.z * inputScale)));
		}

		sphereGeometry.computeVertexNormals();
		sphereGeometry.normalsNeedUpdate = true;
		sphereGeometry.verticesNeedUpdate = true;
	}, []);
	return (
		<mesh>
			<sphereGeometry
				attach="geometry"
				args={[ 1.5, 32, 32 ]}
				ref={sphereGeometryRef}
			/>
			<meshNormalMaterial
				attach="material"
			/>
		</mesh>
	);
};

const AnimatedGeometry = ({
	position,
	faceResolution,
}: {
	position: Vector3;
	faceResolution: number;
}) => {
	const sphereGeometryRef = useRef<SphereGeometry>();
	const inputScale = 1.3;

	useFrame(({ clock }) => {
		const sphereGeometry = sphereGeometryRef.current!;
		const { vertices } = sphereGeometry;
		const time = clock.getElapsedTime();

		for (let i = 0, verticesLength = vertices.length; i < verticesLength; i++) {
			const p = vertices[i];
			p.normalize().multiplyScalar(1 + (0.3 * noise.perlin3((p.x * inputScale) + time, (p.y * inputScale) - time, p.z * inputScale)));
		}

		sphereGeometry.verticesNeedUpdate = true;
		sphereGeometry.computeVertexNormals();
		sphereGeometry.normalsNeedUpdate = true;
	});

	return (
		<mesh position={position}>
			<sphereGeometry
				attach="geometry"
				args={[ 1.5, faceResolution, faceResolution ]}
				ref={sphereGeometryRef}
			/>
			<meshNormalMaterial
				attach="material"
			/>
		</mesh>
	);
};

const ShadedGeometry = ({
	position,
	faceResolution,
}: {
	position: Vector3;
	faceResolution: number;
}) => {
	const shaderMaterial = useRef<THREE.ShaderMaterial>();

	useFrame(({ clock }) => {
		shaderMaterial.current!.uniforms.time.value = clock.getElapsedTime();
		shaderMaterial.current!.extensions.derivatives = true;
	});

	return (
		<mesh position={position}>
			<sphereGeometry
				verticesNeedUpdate
				attach="geometry"
				args={[ 1.5, faceResolution, faceResolution ]}
			/>
			<shaderMaterial
				attach="material"
				args={[ TestShader ]}
				ref={shaderMaterial}
			/>
		</mesh>
	);
};

export {
	DeformedGeometry,
	AnimatedGeometry,
	ShadedGeometry,
};

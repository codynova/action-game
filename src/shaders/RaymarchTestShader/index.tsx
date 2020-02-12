import { Vector2, Matrix4 } from 'three';
import { Shader } from 'Types';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

const RaymarchTestShader: Shader = {
	uniforms: {
		resolution: { value: new Vector2() },
		cameraWorldMatrix: { value: new Matrix4() },
		cameraProjectionMatrixInverse: { value: new Matrix4() },
	},
	vertexShader,
	fragmentShader,
};

export { RaymarchTestShader };

import { Shader } from 'three';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

const TestShader: Shader = {
	uniforms: {
		time: { value: 0.0 },
	},
	vertexShader,
	fragmentShader,
};

export { TestShader };

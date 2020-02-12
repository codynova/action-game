import { Vector2 } from 'three';
import { Shader } from 'Types';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

const VolumetricLightShader: Shader = {
	uniforms: {
		tDiffuse: { value: null },
		lightPosition: { value: new Vector2(0.5, 0.5) },
		exposure: { value: 0.18 },
		decay: { value: 0.95 },
		density: { value: 1.0 },
		weight: { value: 0.4 },
		samples: { value: 50 },
	},
	vertexShader,
	fragmentShader,
};

export { VolumetricLightShader };

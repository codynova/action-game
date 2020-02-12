import { Vector3 } from 'three';
import { Shader } from 'Types';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

const setHex = (hex: number) => {
	hex = Math.floor(hex);
	const r = ((hex >> 16) & 255) / 255;
	const g = ((hex >> 8) & 255) / 255;
	const b = (hex & 255) / 255;

	return new Vector3(r, g, b);
};

const RaymarchBlobShader: Shader = {
	uniforms: {
		time: { value: 0.0 },

		'blobs[0].color': {
			value: setHex(0xffb6b9),
			type: 'v3',
		},
		'blobs[1].color': {
			value: setHex(0xfae3d9),
			type: 'v3',
		},
		'blobs[2].color': {
			value: setHex(0xbbded6),
			type: 'v3',
		},
		'blobs[3].color': {
			value: setHex(0x8ac6d1),
			type: 'v3',
		},
		'blobs[4].color': {
			value: setHex(0xfffcab),
			type: 'v3',
		},

		'blobs[0].pos': {
			value: new Vector3(1.0, 1.0, 1.0),
			type: 'v3',
		},
		'blobs[1].pos': {
			value: new Vector3(1.0, -0.5, -1.0),
			type: 'v3',
		},
		'blobs[2].pos': {
			value: new Vector3(-0.8, 1.0, -0.5),
			type: 'v3',
		},
		'blobs[3].pos': {
			value: new Vector3(-0.4, -1.0, 0.5),
			type: 'v3',
		},
		'blobs[4].pos': {
			value: new Vector3(-0.5, 0.7, 1.0),
			type: 'v3',
		},

		'blobs[0].speed': {
			value: 0.8,
			type: 'f',
		},
		'blobs[1].speed': {
			value: 0.6,
			type: 'f',
		},
		'blobs[2].speed': {
			value: 1.0,
			type: 'f',
		},
		'blobs[3].speed': {
			value: 0.7,
			type: 'f',
		},
		'blobs[4].speed': {
			value: 0.5,
			type: 'f',
		},

	},
	vertexShader,
	fragmentShader,
};

export { RaymarchBlobShader };

// 'blobs[0].color': {
// 	value: setHex(0xffb6b9),
// 	location: null,
// 	type: 'v3',
// },
// 'blobs[1].color': {
// 	value: setHex(0xfae3d9),
// 	location: null,
// 	type: 'v3',
// },
// 'blobs[2].color': {
// 	value: setHex(0xbbded6),
// 	location: null,
// 	type: 'v3',
// },
// 'blobs[3].color': {
// 	value: setHex(0x8ac6d1),
// 	location: null,
// 	type: 'v3',
// },
// 'blobs[4].color': {
// 	value: setHex(0xfffcab),
// 	location: null,
// 	type: 'v3',
// },

// 'blobs[0].pos': {
// 	value: [ 1.0, 1.0, 1.0 ],
// 	location: null,
// 	type: 'v3',
// },
// 'blobs[1].pos': {
// 	value: [ 1.0, -0.5, -1.0 ],
// 	location: null,
// 	type: 'v3',
// },
// 'blobs[2].pos': {
// 	value: [ -0.8, 1.0, -0.5 ],
// 	location: null,
// 	type: 'v3',
// },
// 'blobs[3].pos': {
// 	value: [ -0.4, -1.0, 0.5 ],
// 	location: null,
// 	type: 'v3',
// },
// 'blobs[4].pos': {
// 	value: [ -0.5, 0.7, 1.0 ],
// 	location: null,
// 	type: 'v3',
// },

// 'blobs[0].speed': {
// 	value: 0.8,
// 	location: null,
// 	type: 'f',
// },
// 'blobs[1].speed': {
// 	value: 0.6,
// 	location: null,
// 	type: 'f',
// },
// 'blobs[2].speed': {
// 	value: 1.0,
// 	location: null,
// 	type: 'f',
// },
// 'blobs[3].speed': {
// 	value: 0.7,
// 	location: null,
// 	type: 'f',
// },
// 'blobs[4].speed': {
// 	value: 0.5,
// 	location: null,
// 	type: 'f',
// },

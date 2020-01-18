import { ReactThreeFiber } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CapsuleGeometry } from 'Primitives';

declare global {
	namespace JSX {
		interface IntrinsicElements {
            capsuleGeometry: ReactThreeFiber.Object3DNode<typeof CapsuleGeometry, Parameters<typeof CapsuleGeometry>>;
			effectComposer: ReactThreeFiber.Object3DNode<EffectComposer, typeof EffectComposer>;
			orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
			reflector: ReactThreeFiber.Object3DNode<Reflector, typeof Reflector>;
            renderPass: ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>;
			shaderPass: ReactThreeFiber.Object3DNode<ShaderPass, typeof ShaderPass>;
		}
	}
}

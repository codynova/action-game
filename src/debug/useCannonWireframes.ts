// https://github.com/schteppe/cannon.js/blob/master/tools/threejs/CannonDebugRenderer.js
// https://github.com/schteppe/cannon.js/tree/master/tools/threejs

import React, { useContext } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { MeshBasicMaterial, SphereGeometry, BoxGeometry, PlaneGeometry, Mesh, Geometry, Vector3, Face3 } from 'three';
import { WorldContext } from 'Contexts';
import * as CANNON from 'cannon';

const cannonWireframeRenderer = (scene: THREE.Scene, world: CANNON.World) => {
	const _meshes: THREE.Mesh[] = [];
	const tempVec0 = new CANNON.Vec3();
	const tempQuat0 = new CANNON.Quaternion();

	const _typeMatch = (mesh: THREE.Mesh, shape: CANNON.Shape) => {
		if (!mesh) {
			return false;
		}

		const { geometry } = mesh;

		return (
			(geometry instanceof SphereGeometry && shape instanceof CANNON.Sphere)
            || (geometry instanceof BoxGeometry && shape instanceof CANNON.Box)
            || (geometry instanceof PlaneGeometry && shape instanceof CANNON.Plane)
            || (geometry.id === (shape as any).geometryId && shape instanceof CANNON.ConvexPolyhedron)
            || (geometry.id === (shape as any).geometryId && shape instanceof (CANNON as any).Trimesh)
            || (geometry.id === (shape as any).geometryId && shape instanceof CANNON.Heightfield)
		);
	};

	const _createMesh = (shape: CANNON.Shape) => {
		let mesh: THREE.Mesh = new Mesh();
		const material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
		const { SPHERE, BOX, PLANE, CONVEXPOLYHEDRON } = CANNON.Shape.types;

		switch (shape.type) {
			case SPHERE: {
				mesh = new Mesh(new SphereGeometry(1), material);
				break;
			}

			case BOX: {
				mesh = new Mesh(new BoxGeometry(1, 1, 1), material);
				break;
			}

			case PLANE: {
				mesh = new Mesh(new PlaneGeometry(10, 10, 10, 10), material);
				break;
			}

			case CONVEXPOLYHEDRON: {
				const geometry = new Geometry();

				for (let i = 0, numberOfVertices = (shape as CANNON.ConvexPolyhedron).vertices.length; i < numberOfVertices; i++) {
					const vertex = (shape as CANNON.ConvexPolyhedron).vertices[i];
					geometry.vertices.push(new Vector3(vertex.x, vertex.y, vertex.y));
				}

				for (let i = 0, numberOfFaces = (shape as CANNON.ConvexPolyhedron).faces.length; i < numberOfFaces; i++) {
					const face = (shape as CANNON.ConvexPolyhedron).faces[i];

					const a = face[0];

					for (let j = 1; j < face.length - 1; j++) {
						const b = face[j];
						const c = face[j + 1];
						geometry.faces.push(new Face3(a, b, c));
					}
				}

				geometry.computeBoundingSphere();
				geometry.computeFaceNormals();

				mesh = new Mesh(geometry, material);
				(shape as any).geometryId = geometry.id;
				break;
			}

			default: {
				break;
			}
		}

		scene.add(mesh);
		return mesh;
	};

	const _scaleMesh = (mesh: THREE.Mesh, shape: CANNON.Shape) => {
		const { SPHERE, BOX, PLANE, CONVEXPOLYHEDRON } = CANNON.Shape.types;

		switch (shape.type) {
			case SPHERE: {
				const { radius } = (shape as CANNON.Sphere);
				mesh.scale.set(radius, radius, radius);
				break;
			}

			case BOX: {
				mesh.scale.copy((shape as CANNON.Box).halfExtents as any);
				mesh.scale.multiplyScalar(2);
				break;
			}

			case CONVEXPOLYHEDRON: {
				mesh.scale.set(1, 1, 1);
				break;
			}

			default: {
				break;
			}
		}
	};

	const _updateMesh = (index: number, body: CANNON.Body, shape: CANNON.Shape) => {
		let mesh = _meshes[index];

		if (!_typeMatch(mesh, shape)) {
			if (mesh) {
				scene.remove(mesh);
			}

			const newMesh = _createMesh(shape);
			mesh = newMesh;
			_meshes[index] = newMesh;
		}

		_scaleMesh(mesh, shape);
	};

	const update = () => {
		const bodies = world.bodies;
		const meshes = _meshes;
		const shapeWorldPosition = tempVec0;
		const shapeWorldQuaternion = tempQuat0;

		let meshIndex = 0;

		for (let i = 0, numberOfBodies = bodies.length; i !== numberOfBodies; i++) {
			const body = bodies[i];

			for (let j = 0, numberOfShapes = body.shapes.length; j !== numberOfShapes; j++) {
				const shape = body.shapes[j];

				_updateMesh(meshIndex, body, shape);
				const mesh = meshes[meshIndex];

				if (mesh) {
					body.quaternion.vmult(body.shapeOffsets[j], shapeWorldPosition);
					body.position.vadd(shapeWorldPosition, shapeWorldPosition);
					body.quaternion.mult(body.shapeOrientations[j], shapeWorldQuaternion);
					mesh.position.copy(shapeWorldPosition as any);
					mesh.quaternion.copy(shapeWorldQuaternion as any);
				}

				meshIndex++;
			}
		}

		for (let i = meshIndex, numberOfMeshes = meshes.length; i < numberOfMeshes; i++) {
			const mesh = meshes[i];

			if (mesh) {
				scene.remove(mesh);
			}
		}

		meshes.length = meshIndex;
	};

	return update;
};

const useCannonWireframes = () => {
	const { scene } = useThree();
	const world = useContext(WorldContext);

	if (!world) {
		throw new Error('useCannonWireframes world was undefined');
	}

	const wireframeRenderer = cannonWireframeRenderer(scene, world);
	useFrame(() => wireframeRenderer());
};

export { useCannonWireframes };

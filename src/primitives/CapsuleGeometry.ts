import { Geometry, Vector3, Vector4, Face3 } from 'three';

const CapsuleGeometry = (radius = 1, height = 2, segments = 32): Geometry => {
    const geometry = new Geometry();
    const TWO_PI = Math.PI * 2;
    const PID2 = 1.570796326794896619231322;
    const normals = [];

    for (let i = 0; i <= segments / 4; i++) {
        for (let j = 0; j <= segments; j++) {
            const theta = j * TWO_PI / segments;
            const phi = -PID2 + Math.PI * i / (segments / 2);
            const vertex = new Vector3();
            const normal = new Vector3();
            vertex.x = radius * Math.cos(phi) * Math.cos(theta);
            vertex.y = radius * Math.cos(phi) * Math.sin(theta);
            vertex.z = radius * Math.sin(phi);
            vertex.z -= height / 2;
            normal.copy(vertex);
            geometry.vertices.push(vertex);
            normals.push(normal);
        }
    }

    for (let i = segments / 4; i <= segments / 2; i++) {
        for (let j = 0; j <= segments; j++) {
            const theta = j * TWO_PI / segments;
            const phi = -PID2 + Math.PI * i / (segments / 2);
            const vertex = new Vector3();
            const normal = new Vector3();
            vertex.x = radius * Math.cos(phi) * Math.cos(theta);
            vertex.y = radius * Math.cos(phi) * Math.sin(theta);
            vertex.z = radius * Math.sin(phi);
            vertex.z += height / 2;
            normal.copy(vertex);
            geometry.vertices.push(vertex);
            normals.push(normal);
        }
    }

    for (let i = 0; i <= segments / 2; i++) {
        for (let j = 0; j < segments; j++) {
            const vector = new Vector4(
                i * (segments + 1) + j,
                i * (segments + 1) + (j + 1),
                (i + 1) * (segments + 1) + (j + 1),
                (i + 1) * (segments + 1) + j,
            );

            let face1: Face3;
            let face2: Face3;

            if (i === segments / 4) {
                face1 = new Face3(
                    vector.x,
                    vector.y,
                    vector.z,
                    [
                        normals[vector.x],
                        normals[vector.y],
                        normals[vector.z],
                    ],
                );

                face2 = new Face3(
                    vector.x,
                    vector.z,
                    vector.w,
                    [
                        normals[vector.x],
                        normals[vector.z],
                        normals[vector.w],
                    ],
                );
            }
            else {
                face1 = new Face3(
                    vector.x,
                    vector.y,
                    vector.z,
                    [
                        normals[vector.x],
                        normals[vector.y],
                        normals[vector.z],
                    ],
                );

                face2 = new Face3(
                    vector.x,
                    vector.z,
                    vector.w,
                    [
                        normals[vector.x],
                        normals[vector.z],
                        normals[vector.w],
                    ],
                );
            }

            geometry.faces.push(face1);
            geometry.faces.push(face2);
        }
    }

    geometry.computeFaceNormals();
    // geometry.computeVertexNormals();
    return geometry;
}

export { CapsuleGeometry };
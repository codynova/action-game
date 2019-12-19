export type Shader = {
    uniforms: {
        [key: string]: {
            value: any;
        }
    }
    vertexShader: string;
    fragmentShader: string;
}

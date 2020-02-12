export type Shader = {
    uniforms: {
        [key: string]: {
            [key: string]: any;
            value: any;
            type?: string;
        }
    }
    vertexShader: string;
    fragmentShader: string;
}

uniform float time;
varying vec3 vPos;

void main ()
{
	vec3 surfaceNormal = normalize(cross(dFdx(vPos), dFdy(vPos)));
	gl_FragColor = vec4(surfaceNormal, 1.0);
}
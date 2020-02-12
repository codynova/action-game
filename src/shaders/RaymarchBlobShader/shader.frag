precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float wheel;

const float PI = 3.14159265359;

struct pc { // perspective camera
	vec3 origin;
	vec3 dir;
};

mat3 lookAt (vec3 eye, vec3 center, vec3 up)
{
	// Based on gluLookAt man page
	vec3 f = normalize(center - eye);
	vec3 s = normalize(cross(f, up));
	vec3 u = cross(s, f);
	return mat3(s, u, -f);
}

pc setCamera (float fov, vec3 ro, vec3 centerPos)
{
	vec2 xy = gl_FragCoord.xy - resolution / 2.0;
	float z = resolution.y / tan(radians(fov) / 2.0);
	vec3 viewDir = normalize(vec3(xy, -z));
	mat3 viewToWorld = lookAt(ro, centerPos, vec3(0.0, 1.0, 0.0));

	vec3 worldDir = viewToWorld * viewDir;

	return pc(ro, worldDir);
}

mat4 rotateX (float theta)
{
	float c = cos(theta);
	float s = sin(theta);

	return mat4(
		vec4(1, 0, 0, 0),
		vec4(0, c, -s, 0),
		vec4(0, s, c, 0),
		vec4(0, 0, 0, 1)
	);
}

mat4 rotateY (float theta)
{
	float c = cos(theta);
	float s = sin(theta);

	return mat4(
		vec4(c, 0, s, 0),
		vec4(0, 1, 0, 0),
		vec4(-s, 0, c, 0),
		vec4(0, 0, 0, 1)
	);
}

mat4 rotateZ (float theta)
{
	float c = cos(theta);
	float s = sin(theta);

	return mat4(
		vec4(c, -s, 0, 0),
		vec4(s, c, 0, 0),
		vec4(0, 0, 1, 0),
		vec4(0, 0, 0, 1)
	);
}

float sdPlane (vec3 p, vec4 n)
{
	// n must be normalized
	return dot(p, n.xyz) + n.w;
}


float sdSphere (in vec3 p, in vec3 c, float r)
{
	return length(p - c) - r;
}


float sdTorus (vec3 p, vec3 c, vec2 t)
{
	vec3 pos = p - c;
	vec2 q = vec2(length(pos.xz)-t.x,pos.y);
	return length(q)-t.y;
}

float sdBox (vec3 p, vec3 c, vec3 b)
{
	vec3 d = abs(p - c) - b;
	return length(max(d,0.0))
		+ min(max(d.x,max(d.y,d.z)),0.0); // remove this line for an only partially signed sdf 
}

float sdRoundBox (vec3 p, vec3 c, vec3 b, float r)
{
	vec3 d = abs(p - c) - b;
	return length(max(d,0.0)) - r
		+ min(max(d.x,max(d.y,d.z)),0.0); // remove this line for an only partially signed sdf 
}

float unite (float a, float b)
{
	return min(a, b);
}

float subtract (float a, float b)
{
	return max(-a, b);
}

float intersect (float a, float b)
{
	return max(a, b);
}

float smoothUnion_h (float d1, float d2, float k)
{
	return clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
}

float smoothUnion (float d1, float d2, float k)
{
	float h = smoothUnion_h(d1, d2, k);
	return mix( d2, d1, h ) - k*h*(1.0-h); 
}

float smoothSubtraction (float d1, float d2, float k)
{
	float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
	return mix( d2, -d1, h ) + k*h*(1.0-h); 
}

float smoothIntersection (float d1, float d2, float k)
{
	float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
	return mix( d2, d1, h ) + k*h*(1.0-h); 
}

float expFog (float d, float density)
{
	float dd = d * density;
	return exp(-dd * dd);
}

float cubicOut (float t)
{
	float f = t - 1.0;
	return f * f * f + 1.0;
}

float cubicIn (float t)
{
	return t * t * t;
}

float cubicInOut (float t)
{
	return t < 0.5
		? 4.0 * t * t * t
		: 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

float quadraticOut (float t)
{
	return -t * (t - 2.0);
}

float quarticInOut (float t)
{
	return t < 0.5
		? +8.0 * pow(t, 4.0)
		: -8.0 * pow(t - 1.0, 4.0) + 1.0;
}




// END COMMON




#define NUM_BLOBS 5
const vec3 light_position = vec3(2000.0, -5000.0, 3000.0);

const vec3 bgColor = vec3(1.0, 0.9, 0.9);

float gamma = 1.8;

struct bStruct {
	vec3 color;
	vec3 pos;
	float speed;
};

uniform bStruct blobs[NUM_BLOBS];
float numBlobs = float(NUM_BLOBS);

float smoothIntensity = 0.8;

vec3 blobPos (int i, bStruct blob)
{
	float radian = 50.0 * PI/numBlobs * float(i);
	vec3 pos = vec3(
		sin(radian + time * blob.speed * 0.5), 
		cos(radian + time * blob.speed * 0.5), 
		sin(radian + time * blob.speed * 0.5) * 0.8
	);

	return pos * blob.pos * 1.3;
}

float blobRadius (float speed)
{
	return (sin(time + speed * PI * 2.0) * 0.5 + 0.5) * 0.5 + 0.5;
}

vec4 mapTheWorld (in vec3 p)
{
	vec3 samplePoint = p;
	samplePoint = (rotateY(time * 0.3) * vec4(samplePoint, 1.0)).xyz;

	// for (int i = 0; i < numBlobs; i++) {
	// 	const offset = float(i) / float(numBlobs);
	// }

	vec3 totalColor = blobs[0].color;

	float totalDb = sdSphere(samplePoint, blobPos(0, blobs[0]), blobRadius(blobs[0].speed));

	for (int i = 1; i < NUM_BLOBS; ++i) {
		
		float sphere_1 = sdSphere(samplePoint, blobPos(i, blobs[i]), blobRadius(blobs[i].speed));

		float h = smoothUnion_h(totalDb, sphere_1, smoothIntensity);

		totalDb = mix( sphere_1, totalDb, h ) - smoothIntensity *h * (1.0-h); 

		totalColor = mix(blobs[i].color, totalColor, h);
	}
	

	return vec4(totalColor, totalDb);
}

vec3 calculateNormal (in vec3 p)
{
	const vec3 small_step = vec3(0.001, 0.0, 0.0);

	float gradient_x = mapTheWorld(p + small_step.xyy).w - mapTheWorld(p - small_step.xyy).w;
	float gradient_y = mapTheWorld(p + small_step.yxy).w - mapTheWorld(p - small_step.yxy).w;
	float gradient_z = mapTheWorld(p + small_step.yyx).w - mapTheWorld(p - small_step.yyx).w;

	vec3 normal = vec3(gradient_x, gradient_y, gradient_z);

	return normalize(normal);
}

const vec3 dirLight = vec3(1.0);
const vec3 dirLightPos = vec3(-4, 6, -10);

// vec3 calcIrradiance_hemi (vec3 normal, vec3 lightPos, vec3 grd, vec3 sky)
// {
// 	float dotNL = clamp(dot(normal, normalize(lightPos)), 0.0, 1.0);
// 	return mix(grd, sky, dotNL);
// }

vec3 calcIrradiance_dir (vec3 normal, vec3 lightPos, vec3 light)
{
	float dotNL = dot(normal, normalize(lightPos)) * 0.5 + 0.5;
	// vec3 diffuse = vec3(1.0);
	return light * dotNL;
}

vec3 rayMarch (in vec3 ro, in vec3 rd)
{
	float total_distance_traveled = 0.0;
	const int NUMBER_OF_STEPS = 64;
	const float MINIMUM_HIT_DISTANCE = 0.01;
	const float MAXIMUM_TRACE_DISTANCE = 1000.0;

	for (int i = 0; i < NUMBER_OF_STEPS; ++i) {
		vec3 currentPos = ro + total_distance_traveled * rd;

		vec4 distance_to_closest = mapTheWorld(currentPos);

		if (distance_to_closest.w < MINIMUM_HIT_DISTANCE) {
			// return vec3(1.0, 0.0, 0.0);
			vec3 normal = calculateNormal(currentPos);

			vec3 dirColor = calcIrradiance_dir(normal, dirLightPos, dirLight);

			dirColor = 0.6 + 0.4 * dirColor;

			vec3 halfLE = normalize(dirLightPos + ro);
			float specular = pow(clamp(dot(normal, halfLE), 0.0, 1.0), 80.0);
			// specular *= 2.0;


			vec3 color = distance_to_closest.xyz;

			color += 0.1;

			// color *= min(vec3(1.0), hemiColor * 1.06);
			color *= dirColor;
			color += specular * 0.2;

			// color *= diffuseIntensity;

			float fog_intensity = expFog(total_distance_traveled, 0.03);

			color = mix(bgColor, color, fog_intensity);

			return color;
		}

		if (total_distance_traveled > MAXIMUM_TRACE_DISTANCE) {
			break;
		}

		total_distance_traveled += distance_to_closest.w;
	}

	return bgColor;
}

void main (void)
{
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

	vec3 camera_position = vec3(0.0, 0.0, -4.0);
	vec3 ro = camera_position;  // ray's origin
	vec3 rd = normalize(vec3(p, 1.0));  // ray's direction

	vec3 color = rayMarch(ro, rd);
	color = pow(color, vec3(1.0 / gamma));

	gl_FragColor = vec4(color, 1.0);
}

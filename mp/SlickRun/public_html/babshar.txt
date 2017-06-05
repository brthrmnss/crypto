precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 world;
uniform mat4 worldViewProjection;

// Varying
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec2 vUV;
/*
void main(void) {
    vec4 outPosition = worldViewProjection * vec4(position, 1.0);
    gl_Position = outPosition;

    vPositionW = vec3(world * vec4(position, 1.0));
    vNormalW = normalize(vec3(world * vec4(normal, 0.0)));
}

  */

void main(void)
{
    //vec4 outPosition = worldViewProjection * vec4(position, 1.0);
  //  gl_Position = outPosition;
  //gl_TexCoord[0] = gl_MultiTexCoord0;
      vec4 outPosition = worldViewProjection * vec4(position, 1.0);
    gl_Position = outPosition;

    vPositionW = vec3(world * vec4(position, 1.0));
    vNormalW = normalize(vec3(world * vec4(normal, 0.0)));

    vUV = uv;
}

///////////////////////////////////



precision highp float;

// Lights
varying vec3 vPositionW;
varying vec3 vNormalW;

// Refs
uniform vec3 cameraPosition;
uniform sampler2D textureSampler;


//uniform sampler2D tex0;
float time;
float rt_w;
float rt_h;
float stitching_size = 6.0;
int invert = 0;

varying vec2 vUV;
//attribute vec2 uv;

//*/

vec4 PostFXS() {
    vec4 c = vec4(0.0);
    return c;
}

 vec4 PostFX2(sampler2D tex, vec2 uv, float time) {
    //vec4 c = vec4(0.0);
    //return c;


    //vec4 c = vec4(0.0);
    //return c;
   /* vec3 color = vec3(1., 1., 1.);
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Fresnel
	float fresnelTerm = dot(viewDirectionW, vNormalW);
	fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);

    c = vec4(color * fresnelTerm, 1.);
*/

    //vec4 c = vec4(0.0);
    vec4 c = vec4(0.0);
    float size = stitching_size;
    vec2 cPos = vUV  * vec2(rt_w, rt_h);
    vec2 tlPos = floor(cPos / vec2(size, size));
    tlPos *= size;
    int remX = int(mod(cPos.x, size));
    int remY = int(mod(cPos.y, size));

    //int remX = int(mod(cPos.x, size));
    //int remY = int(mod(cPos.y, size));
    if (remX == 0 && remY == 0) {
     tlPos = cPos;
    }
    vec2 blPos = tlPos;
    blPos.y += (size - 1.0);
    if ((remX == remY) ||
        (((int(cPos.x) - int(blPos.x)) == (int(blPos.y) - int(cPos.y)))))
    {
    if (invert == 1)
      c = vec4(0.2, 0.15, 0.05, 1.0);
    else
      c = texture2D(textureSampler, tlPos * vec2(1.0/rt_w, 1.0/rt_h)) * 1.4;
    }
    else
    {
    if (invert == 1)
        c = texture2D(textureSampler, tlPos * vec2(1.0/rt_w, 1.0/rt_h)) * 1.4;
    else
        c = vec4(0.0, 0.0, 0.0, 1.0);
    }
    return c;
 }

void main(void) {
    vec3 color = vec3(1., 1., 1.);
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Fresnel
	float fresnelTerm = dot(viewDirectionW, vNormalW);
	fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);

	if (vUV.y > 0.5)
    {
       // df.d
        vec4 cd = vec4(0.0);
        cd = PostFXS();
        cd =  PostFX2(textureSampler, vUV, 0.0);
         gl_FragColor =cd;
        //cd = PostFXS();
        //cd =   PostFX(textureSampler, vUV, 0.0);
        // gl_FragColor = PostFX(textureSampler, vUV, 0.0);
    } else {
        //gl_FragColor = vec4(color * fresnelTerm, 1.);
        //vUV.y += 0.5;
        vec4 c1 = texture2D(textureSampler, vUV);
        gl_FragColor = c1;
    }
}

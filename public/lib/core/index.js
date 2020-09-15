(function(exports){"use strict";function assertTrue(condition,message="assertTrue failure"){if(!condition){throw new Error(message)}return condition}const arrayBuffer=new ArrayBuffer(12*16);const floatArray=new Float32Array(arrayBuffer);const intArray=new Int32Array(arrayBuffer);function hashFloat1(v){floatArray[0]=v;return intArray[0]}function hashFloat2(v0,v1){floatArray[0]=v0;floatArray[1]=v1;const hash=intArray[0];return hash*397^intArray[1]}function hashFloat3(v0,v1,v2){floatArray[0]=v0;floatArray[1]=v1;floatArray[2]=v2;let hash=intArray[0]|0;hash=hash*397^(intArray[1]|0);return hash*397^(intArray[2]|0)}function hashFloat4(v0,v1,v2,v3){floatArray[0]=v0;floatArray[1]=v1;floatArray[2]=v2;floatArray[3]=v3;let hash=intArray[0]|0;hash=hash*397^(intArray[1]|0);hash=hash*397^(intArray[2]|0);return hash*397^(intArray[3]|0)}function hashFloatArray(elements){for(let i=0;i<elements.length;i++){floatArray[i]=elements[i]}let hash=intArray[0]|0;for(let i=1;i<16;i++){hash=hash*397^(intArray[i]|0)}return hash}function clamp(value,min,max){return Math.min(Math.max(value,min),max)}class Vector2{constructor(x=0,y=0){this.x=x;this.y=y}get width(){return this.x}set width(width){this.x=width}get height(){return this.y}set height(height){this.y=height}getHashCode(){return hashFloat2(this.x,this.y)}set(x,y){this.x=x;this.y=y;return this}clone(){return(new Vector2).copy(this)}copy(v){return this.set(v.x,v.y)}add(v){this.x+=v.x;this.y+=v.y;return this}addScalar(s){this.x+=s;this.y+=s;return this}sub(v){this.x-=v.x;this.y-=v.y;return this}multiplyByScalar(s){this.x*=s;this.y*=s;return this}negate(){this.x*=-1;this.y*=-1;return this}normalize(){const length=this.length();return this.multiplyByScalar(length===0?1:0)}getComponent(index){if(index===0){return this.x}else if(index===1){return this.y}else{throw new Error(`index of our range: ${index}`)}}setComponent(index,value){if(index===0){this.x=value}else if(index===1){this.y=value}else{throw new Error(`index of our range: ${index}`)}return this}dot(v){return this.x*v.x+this.y*v.y}length(){return Math.sqrt(this.lengthSquared())}lengthSquared(){return this.x*this.x+this.y*this.y}min(v){this.x=Math.min(this.x,v.x);this.y=Math.min(this.y,v.y);return this}max(v){this.x=Math.max(this.x,v.x);this.y=Math.max(this.y,v.y);return this}clamp(min,max){this.x=clamp(this.x,min.x,max.x);this.y=clamp(this.y,min.y,max.y);return this}equals(v){return v.x===this.x&&v.y===this.y}setFromArray(array,offset){this.x=array[offset+0];this.y=array[offset+1]}toArray(array,offset){array[offset+0]=this.x;array[offset+1]=this.y}}class Vector3{constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}get width(){return this.x}set width(width){this.x=width}get height(){return this.y}set height(height){this.y=height}get depth(){return this.z}set depth(depth){this.z=depth}get r(){return this.x}set r(r){this.x=r}get g(){return this.y}set g(g){this.y=g}get b(){return this.z}set b(b){this.z=b}getHashCode(){return hashFloat3(this.x,this.y,this.z)}set(x,y,z){this.x=x;this.y=y;this.z=z;return this}clone(){return(new Vector3).copy(this)}copy(v){return this.set(v.x,v.y,v.z)}add(v){this.x+=v.x;this.y+=v.y;this.z+=v.z;return this}addScalar(s){this.x+=s;this.y+=s;this.z+=s;return this}sub(v){this.x-=v.x;this.y-=v.y;this.z-=v.z;return this}multiplyByScalar(s){this.x*=s;this.y*=s;this.z*=s;return this}negate(){this.x*=-1;this.y*=-1;this.z*=-1;return this}lerp(v,alpha){this.x+=(v.x-this.x)*alpha;this.y+=(v.y-this.y)*alpha;this.z+=(v.z-this.z)*alpha;return this}normalize(){const length=this.length();return this.multiplyByScalar(length===0?1:1/length)}getComponent(index){if(index===0){return this.x}else if(index===1){return this.y}else if(index===2){return this.z}else{throw new Error(`index of our range: ${index}`)}}setComponent(index,value){if(index===0){this.x=value}else if(index===1){this.y=value}else if(index===2){this.z=value}else{throw new Error(`index of our range: ${index}`)}return this}dot(v){return this.x*v.x+this.y*v.y+this.z*v.z}cross(v){const ax=this.x,ay=this.y,az=this.z;const bx=v.x,by=v.y,bz=v.z;this.x=ay*bz-az*by;this.y=az*bx-ax*bz;this.z=ax*by-ay*bx;return this}length(){return Math.sqrt(this.lengthSquared())}lengthSquared(){return this.x*this.x+this.y*this.y+this.z*this.z}distanceToSquared(v){const dx=this.x-v.x;const dy=this.y-v.y;const dz=this.z-v.z;return dx*dx+dy*dy+dz*dz}distanceTo(v){return Math.sqrt(this.distanceToSquared(v))}min(v){this.x=Math.min(this.x,v.x);this.y=Math.min(this.y,v.y);this.z=Math.min(this.z,v.z);return this}max(v){this.x=Math.max(this.x,v.x);this.y=Math.max(this.y,v.y);this.z=Math.max(this.z,v.z);return this}clamp(min,max){this.x=clamp(this.x,min.x,max.x);this.y=clamp(this.y,min.y,max.y);this.z=clamp(this.z,min.z,max.z);return this}equals(v){return v.x===this.x&&v.y===this.y&&v.z===this.z}setFromArray(array,offset){this.x=array[offset+0];this.y=array[offset+1];this.z=array[offset+2]}toArray(array,offset){array[offset+0]=this.x;array[offset+1]=this.y;array[offset+2]=this.z}}class WorldSpace{}WorldSpace.Right=new Vector3(1,0,0);WorldSpace.Up=new Vector3(0,1,0);WorldSpace.Forward=new Vector3(0,0,-1);class ClipSpace{}ClipSpace.TopLeftFront=new Vector3(-1,-1,-1);ClipSpace.BottomRightBack=new Vector3(1,1,1);ClipSpace.Top=1;ClipSpace.Bottom=-1;ClipSpace.Left=-1;ClipSpace.Right=1;ClipSpace.Near=-1;ClipSpace.Far=1;class ScreenSpace{}ScreenSpace.TopLeft=new Vector2(0,1);ScreenSpace.TopRight=new Vector2(1,1);ScreenSpace.BottomLeft=new Vector2(0,0);ScreenSpace.BottomRight=new Vector2(1,0);ScreenSpace.Top=1;ScreenSpace.Bottom=0;ScreenSpace.Left=0;ScreenSpace.Right=1;ScreenSpace.Near=0;ScreenSpace.Far=1;class TextureSpace{}TextureSpace.TopLeft=new Vector2(0,0);TextureSpace.TopRight=new Vector2(1,0);TextureSpace.BottomLeft=new Vector2(1,0);TextureSpace.BottomRight=new Vector2(1,1);TextureSpace.Top=0;TextureSpace.Bottom=1;TextureSpace.Left=0;TextureSpace.Right=1;const _lut=[];for(let i=0;i<256;i++){_lut[i]=(i<16?"0":"")+i.toString(16)}function generateUUID(){const d0=Math.random()*4294967296|0;const d1=Math.random()*4294967296|0;const d2=Math.random()*4294967296|0;const d3=Math.random()*4294967296|0;const uuid=_lut[d0&255]+_lut[d0>>8&255]+_lut[d0>>16&255]+_lut[d0>>24&255]+"-"+_lut[d1&255]+_lut[d1>>8&255]+"-"+_lut[d1>>16&15|64]+_lut[d1>>24&255]+"-"+_lut[d2&63|128]+_lut[d2>>8&255]+"-"+_lut[d2>>16&255]+_lut[d2>>24&255]+_lut[d3&255]+_lut[d3>>8&255]+_lut[d3>>16&255]+_lut[d3>>24&255];return uuid.toUpperCase()}exports.ClipSpace=ClipSpace;exports.ScreenSpace=ScreenSpace;exports.TextureSpace=TextureSpace;exports.WorldSpace=WorldSpace;exports.assertTrue=assertTrue;exports.generateUUID=generateUUID;exports.hashFloat1=hashFloat1;exports.hashFloat2=hashFloat2;exports.hashFloat3=hashFloat3;exports.hashFloat4=hashFloat4;exports.hashFloatArray=hashFloatArray;return exports})({});
(function(exports){"use strict";const GL=WebGLRenderingContext;var DataType;(function(DataType){DataType[DataType["Byte"]=GL.BYTE]="Byte";DataType[DataType["UnsignedByte"]=GL.UNSIGNED_BYTE]="UnsignedByte";DataType[DataType["Short"]=GL.SHORT]="Short";DataType[DataType["UnsignedShort"]=GL.UNSIGNED_SHORT]="UnsignedShort";DataType[DataType["Int"]=GL.INT]="Int";DataType[DataType["UnsignedInt"]=GL.UNSIGNED_INT]="UnsignedInt";DataType[DataType["Float"]=GL.FLOAT]="Float"})(DataType||(DataType={}));(function(PixelEncoding){PixelEncoding[PixelEncoding["Linear"]=0]="Linear";PixelEncoding[PixelEncoding["sRGB"]=1]="sRGB";PixelEncoding[PixelEncoding["RGBE"]=2]="RGBE";PixelEncoding[PixelEncoding["RGBD"]=3]="RGBD"})(exports.PixelEncoding||(exports.PixelEncoding={}));class ArrayBufferImage{constructor(data,width,height,dataType=DataType.UnsignedByte,pixelEncoding=exports.PixelEncoding.sRGB){this.data=data;this.width=width;this.height=height;this.dataType=dataType;this.pixelEncoding=pixelEncoding}}const arrayBuffer=new ArrayBuffer(12*16);const floatArray=new Float32Array(arrayBuffer);const intArray=new Int32Array(arrayBuffer);function hashFloat2(v0,v1){floatArray[0]=v0;floatArray[1]=v1;const hash=intArray[0];return hash*397^intArray[1]}function hashFloat3(v0,v1,v2){floatArray[0]=v0;floatArray[1]=v1;floatArray[2]=v2;let hash=intArray[0]|0;hash=hash*397^(intArray[1]|0);return hash*397^(intArray[2]|0)}function hashFloat4(v0,v1,v2,v3){floatArray[0]=v0;floatArray[1]=v1;floatArray[2]=v2;floatArray[3]=v3;let hash=intArray[0]|0;hash=hash*397^(intArray[1]|0);hash=hash*397^(intArray[2]|0);return hash*397^(intArray[3]|0)}function hashFloatArray(elements){for(let i=0;i<elements.length;i++){floatArray[i]=elements[i]}let hash=intArray[0]|0;for(let i=1;i<16;i++){hash=hash*397^(intArray[i]|0)}return hash}class Matrix4{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}getHashCode(){return hashFloatArray(this.elements)}set(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44){const te=this.elements;te[0]=n11;te[4]=n12;te[8]=n13;te[12]=n14;te[1]=n21;te[5]=n22;te[9]=n23;te[13]=n24;te[2]=n31;te[6]=n32;te[10]=n33;te[14]=n34;te[3]=n41;te[7]=n42;te[11]=n43;te[15]=n44;return this}clone(){return(new Matrix4).copy(this)}copy(m){const me=m.elements;return this.set(me[0],me[4],me[8],me[12],me[1],me[5],me[9],me[13],me[2],me[6],me[10],me[14],me[3],me[7],me[11],me[15])}getComponent(index){return this.elements[index]}setComponent(index,value){this.elements[index]=value;return this}multiplyByScalar(s){const te=this.elements;te[0]*=s;te[4]*=s;te[8]*=s;te[12]*=s;te[1]*=s;te[5]*=s;te[9]*=s;te[13]*=s;te[2]*=s;te[6]*=s;te[10]*=s;te[14]*=s;te[3]*=s;te[7]*=s;te[11]*=s;te[15]*=s;return this}makeIdentity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}equals(m){for(let i=0;i<16;i++){if(m.elements[i]!==this.elements[i]){return false}}return true}setFromArray(array,offset){for(let i=0;i<this.elements.length;i++){this.elements[i]=array[offset+i]}}toArray(array,offset){for(let i=0;i<this.elements.length;i++){array[offset+i]=this.elements[i]}}}var EulerOrder;(function(EulerOrder){EulerOrder[EulerOrder["XYZ"]=0]="XYZ";EulerOrder[EulerOrder["YXZ"]=1]="YXZ";EulerOrder[EulerOrder["ZXY"]=2]="ZXY";EulerOrder[EulerOrder["ZYX"]=3]="ZYX";EulerOrder[EulerOrder["YZX"]=4]="YZX";EulerOrder[EulerOrder["XZY"]=5]="XZY";EulerOrder[EulerOrder["Default"]=0]="Default"})(EulerOrder||(EulerOrder={}));function clamp(value,min,max){return Math.min(Math.max(value,min),max)}class Vector3{constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}get width(){return this.x}set width(width){this.x=width}get height(){return this.y}set height(height){this.y=height}get depth(){return this.z}set depth(depth){this.z=depth}get r(){return this.x}set r(r){this.x=r}get g(){return this.y}set g(g){this.y=g}get b(){return this.z}set b(b){this.z=b}getHashCode(){return hashFloat3(this.x,this.y,this.z)}set(x,y,z){this.x=x;this.y=y;this.z=z;return this}clone(){return(new Vector3).copy(this)}copy(v){return this.set(v.x,v.y,v.z)}add(v){this.x+=v.x;this.y+=v.y;this.z+=v.z;return this}addScalar(s){this.x+=s;this.y+=s;this.z+=s;return this}sub(v){this.x-=v.x;this.y-=v.y;this.z-=v.z;return this}multiplyByScalar(s){this.x*=s;this.y*=s;this.z*=s;return this}negate(){this.x*=-1;this.y*=-1;this.z*=-1;return this}lerp(v,alpha){this.x+=(v.x-this.x)*alpha;this.y+=(v.y-this.y)*alpha;this.z+=(v.z-this.z)*alpha;return this}normalize(){const length=this.length();return this.multiplyByScalar(length===0?1:1/length)}getComponent(index){if(index===0){return this.x}else if(index===1){return this.y}else if(index===2){return this.z}else{throw new Error(`index of our range: ${index}`)}}setComponent(index,value){if(index===0){this.x=value}else if(index===1){this.y=value}else if(index===2){this.z=value}else{throw new Error(`index of our range: ${index}`)}return this}dot(v){return this.x*v.x+this.y*v.y+this.z*v.z}cross(v){const ax=this.x,ay=this.y,az=this.z;const bx=v.x,by=v.y,bz=v.z;this.x=ay*bz-az*by;this.y=az*bx-ax*bz;this.z=ax*by-ay*bx;return this}length(){return Math.sqrt(this.lengthSquared())}lengthSquared(){return this.x*this.x+this.y*this.y+this.z*this.z}distanceToSquared(v){const dx=this.x-v.x;const dy=this.y-v.y;const dz=this.z-v.z;return dx*dx+dy*dy+dz*dz}distanceTo(v){return Math.sqrt(this.distanceToSquared(v))}min(v){this.x=Math.min(this.x,v.x);this.y=Math.min(this.y,v.y);this.z=Math.min(this.z,v.z);return this}max(v){this.x=Math.max(this.x,v.x);this.y=Math.max(this.y,v.y);this.z=Math.max(this.z,v.z);return this}clamp(min,max){this.x=clamp(this.x,min.x,max.x);this.y=clamp(this.y,min.y,max.y);this.z=clamp(this.z,min.z,max.z);return this}equals(v){return v.x===this.x&&v.y===this.y&&v.z===this.z}setFromArray(array,offset){this.x=array[offset+0];this.y=array[offset+1];this.z=array[offset+2]}toArray(array,offset){array[offset+0]=this.x;array[offset+1]=this.y;array[offset+2]=this.z}}function makeMatrix4LookAt(eye,target,up,result=new Matrix4){const te=result.elements;const look=eye.clone().sub(target);const lookLength=look.length();if(lookLength===0){look.z=1}else{look.multiplyByScalar(1/lookLength)}const right=up.clone().cross(look);const rightLength=right.length();if(rightLength===0){if(Math.abs(up.z)===1){up.x+=1e-4}else{up.z+=1e-4}up.normalize();right.cross(up)}else{right.multiplyByScalar(1/rightLength)}const up2=look.clone().cross(right);te[0]=right.x;te[4]=up2.x;te[8]=look.x;te[1]=right.y;te[5]=up2.y;te[9]=look.y;te[2]=right.z;te[6]=up2.z;te[10]=look.z;return result}class Vector2{constructor(x=0,y=0){this.x=x;this.y=y}get width(){return this.x}set width(width){this.x=width}get height(){return this.y}set height(height){this.y=height}getHashCode(){return hashFloat2(this.x,this.y)}set(x,y){this.x=x;this.y=y;return this}clone(){return(new Vector2).copy(this)}copy(v){return this.set(v.x,v.y)}add(v){this.x+=v.x;this.y+=v.y;return this}addScalar(s){this.x+=s;this.y+=s;return this}sub(v){this.x-=v.x;this.y-=v.y;return this}multiplyByScalar(s){this.x*=s;this.y*=s;return this}negate(){this.x*=-1;this.y*=-1;return this}normalize(){const length=this.length();return this.multiplyByScalar(length===0?1:0)}getComponent(index){if(index===0){return this.x}else if(index===1){return this.y}else{throw new Error(`index of our range: ${index}`)}}setComponent(index,value){if(index===0){this.x=value}else if(index===1){this.y=value}else{throw new Error(`index of our range: ${index}`)}return this}dot(v){return this.x*v.x+this.y*v.y}length(){return Math.sqrt(this.lengthSquared())}lengthSquared(){return this.x*this.x+this.y*this.y}min(v){this.x=Math.min(this.x,v.x);this.y=Math.min(this.y,v.y);return this}max(v){this.x=Math.max(this.x,v.x);this.y=Math.max(this.y,v.y);return this}clamp(min,max){this.x=clamp(this.x,min.x,max.x);this.y=clamp(this.y,min.y,max.y);return this}equals(v){return v.x===this.x&&v.y===this.y}setFromArray(array,offset){this.x=array[offset+0];this.y=array[offset+1]}toArray(array,offset){array[offset+0]=this.x;array[offset+1]=this.y}}var PixelFormat;(function(PixelFormat){PixelFormat[PixelFormat["RGBA"]=GL.RGBA]="RGBA";PixelFormat[PixelFormat["RGB"]=GL.RGB]="RGB";PixelFormat[PixelFormat["LuminanceAlpha"]=GL.LUMINANCE_ALPHA]="LuminanceAlpha";PixelFormat[PixelFormat["Luminance"]=GL.LUMINANCE]="Luminance";PixelFormat[PixelFormat["Alpha"]=GL.ALPHA]="Alpha";PixelFormat[PixelFormat["DepthComponent"]=GL.DEPTH_COMPONENT]="DepthComponent";PixelFormat[PixelFormat["DepthStencil"]=GL.DEPTH_STENCIL]="DepthStencil"})(PixelFormat||(PixelFormat={}));var TextureFilter;(function(TextureFilter){TextureFilter[TextureFilter["LinearMipmapLinear"]=GL.LINEAR_MIPMAP_LINEAR]="LinearMipmapLinear";TextureFilter[TextureFilter["LinearMipmapNearest"]=GL.LINEAR_MIPMAP_NEAREST]="LinearMipmapNearest";TextureFilter[TextureFilter["Linear"]=GL.LINEAR]="Linear";TextureFilter[TextureFilter["Nearest"]=GL.NEAREST]="Nearest";TextureFilter[TextureFilter["NearestMipmapLinear"]=GL.NEAREST_MIPMAP_LINEAR]="NearestMipmapLinear";TextureFilter[TextureFilter["NearestMipmapNearest"]=GL.NEAREST_MIPMAP_NEAREST]="NearestMipmapNearest"})(TextureFilter||(TextureFilter={}));var TextureTarget;(function(TextureTarget){TextureTarget[TextureTarget["Texture2D"]=GL.TEXTURE_2D]="Texture2D";TextureTarget[TextureTarget["TextureCubeMap"]=GL.TEXTURE_CUBE_MAP]="TextureCubeMap";TextureTarget[TextureTarget["CubeMapPositiveX"]=GL.TEXTURE_CUBE_MAP_POSITIVE_X]="CubeMapPositiveX";TextureTarget[TextureTarget["CubeMapNegativeX"]=GL.TEXTURE_CUBE_MAP_NEGATIVE_X]="CubeMapNegativeX";TextureTarget[TextureTarget["CubeMapPositiveY"]=GL.TEXTURE_CUBE_MAP_POSITIVE_Y]="CubeMapPositiveY";TextureTarget[TextureTarget["CubeMapNegativeY"]=GL.TEXTURE_CUBE_MAP_NEGATIVE_Y]="CubeMapNegativeY";TextureTarget[TextureTarget["CubeMapPositiveZ"]=GL.TEXTURE_CUBE_MAP_POSITIVE_Z]="CubeMapPositiveZ";TextureTarget[TextureTarget["CubeMapNegativeZ"]=GL.TEXTURE_CUBE_MAP_NEGATIVE_Z]="CubeMapNegativeZ"})(TextureTarget||(TextureTarget={}));const _lut=[];for(let i=0;i<256;i++){_lut[i]=(i<16?"0":"")+i.toString(16)}function generateUUID(){const d0=Math.random()*4294967296|0;const d1=Math.random()*4294967296|0;const d2=Math.random()*4294967296|0;const d3=Math.random()*4294967296|0;const uuid=_lut[d0&255]+_lut[d0>>8&255]+_lut[d0>>16&255]+_lut[d0>>24&255]+"-"+_lut[d1&255]+_lut[d1>>8&255]+"-"+_lut[d1>>16&15|64]+_lut[d1>>24&255]+"-"+_lut[d2&63|128]+_lut[d2>>8&255]+"-"+_lut[d2>>16&255]+_lut[d2>>24&255]+_lut[d3&255]+_lut[d3>>8&255]+_lut[d3>>16&255]+_lut[d3>>24&255];return uuid.toUpperCase()}class VirtualTexture{constructor(level=0,magFilter=TextureFilter.Linear,minFilter=TextureFilter.Linear,pixelFormat=PixelFormat.RGBA,dataType=DataType.UnsignedByte,generateMipmaps=true,anisotropicLevels=1){this.level=level;this.magFilter=magFilter;this.minFilter=minFilter;this.pixelFormat=pixelFormat;this.dataType=dataType;this.generateMipmaps=generateMipmaps;this.anisotropicLevels=anisotropicLevels;this.disposed=false;this.uuid=generateUUID();this.version=0;this.name="";this.size=new Vector2}get mipCount(){if(!this.generateMipmaps){return 1}return Math.floor(Math.log2(Math.max(this.size.width,this.size.height)))}dirty(){this.version++}dispose(){if(!this.disposed){this.disposed=true;this.dirty()}}}class CubeMapTexture extends VirtualTexture{constructor(images,level=0,magFilter=TextureFilter.Linear,minFilter=TextureFilter.LinearMipmapLinear,pixelFormat=PixelFormat.RGBA,dataType=DataType.UnsignedByte,generateMipmaps=true,anisotropicLevels=1){super(level,magFilter,minFilter,pixelFormat,dataType,generateMipmaps,anisotropicLevels);this.images=images;if(this.images.length%6!==0||this.images.length===0){throw new Error(`images.length (${this.images.length}) must be a positive multiple of 6`)}this.size=new Vector2(images[0].width,images[0].height)}}const cubeFaceNames=["right","left","top","bottom","back","front"];const cubeFaceTargets=[TextureTarget.CubeMapPositiveX,TextureTarget.CubeMapNegativeX,TextureTarget.CubeMapPositiveY,TextureTarget.CubeMapNegativeY,TextureTarget.CubeMapPositiveZ,TextureTarget.CubeMapNegativeZ];const cubeFaceLooks=[new Vector3(1,0,0),new Vector3(-1,0,0),new Vector3(0,1,0),new Vector3(0,-1,0),new Vector3(0,0,1),new Vector3(0,0,-1)];const cubeFaceUps=[new Vector3(0,-1,0),new Vector3(0,-1,0),new Vector3(0,0,1),new Vector3(0,0,-1),new Vector3(0,1,0),new Vector3(0,-1,0)];function makeMatrix4CubeMapTransform(position,faceIndex,result=new Matrix4){return makeMatrix4LookAt(position,position.clone().add(cubeFaceLooks[faceIndex]),cubeFaceUps[faceIndex],result)}function normalizedByteToFloats(sourceArray,result=undefined){const scale=1/255;if(result===undefined){result=new Float32Array(sourceArray.length)}for(let i=0;i<sourceArray.length;i++){result[i]=sourceArray[i]*scale}return result}function floatsToNormalizedBytes(sourceArray,result=undefined){const scale=255;if(result===undefined){result=new Uint8Array(sourceArray.length)}for(let i=0;i<sourceArray.length;i++){result[i]=sourceArray[i]*scale}return result}class Vector4{constructor(x=0,y=0,z=0,w=0){this.x=x;this.y=y;this.z=z;this.w=w}get r(){return this.x}set r(r){this.x=r}get g(){return this.y}set g(g){this.y=g}get b(){return this.z}set b(b){this.z=b}get a(){return this.w}set a(a){this.w=a}getHashCode(){return hashFloat4(this.x,this.y,this.z,this.w)}set(x,y,z,w){this.x=x;this.y=y;this.z=z;this.w=w;return this}clone(){return(new Vector4).copy(this)}copy(v){return this.set(v.x,v.y,v.z,v.w)}add(v){this.x+=v.x;this.y+=v.y;this.z+=v.z;this.w+=v.w;return this}sub(v){this.x-=v.x;this.y-=v.y;this.z-=v.z;this.w-=v.w;return this}multiplyByScalar(s){this.x*=s;this.y*=s;this.z*=s;this.w*=s;return this}lerp(v,alpha){this.x+=(v.x-this.x)*alpha;this.y+=(v.y-this.y)*alpha;this.z+=(v.z-this.z)*alpha;this.w+=(v.w-this.w)*alpha;return this}normalize(){const length=this.length();return this.multiplyByScalar(length===0?1:1/length)}getComponent(index){if(index===0){return this.x}else if(index===1){return this.y}else if(index===2){return this.z}else if(index===3){return this.w}else{throw new Error(`index of our range: ${index}`)}}setComponent(index,value){if(index===0){this.x=value}else if(index===1){this.y=value}else if(index===2){this.z=value}else if(index===3){this.w=value}else{throw new Error(`index of our range: ${index}`)}return this}dot(v){return this.x*v.x+this.y*v.y+this.z*v.z+this.w*v.w}length(){return Math.sqrt(this.lengthSquared())}lengthSquared(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}equals(v){return v.x===this.x&&v.y===this.y&&v.z===this.z&&v.w===this.w}setFromArray(array,offset){this.x=array[offset+0];this.y=array[offset+1];this.z=array[offset+2];this.w=array[offset+3]}toArray(array,offset){array[offset+0]=this.x;array[offset+1]=this.y;array[offset+2]=this.z;array[offset+3]=this.w}}function rgbeToLinear(source,result=new Vector4){const s=Math.pow(2,source.a*255-128);return result.set(source.r*s,source.g*s,source.b*s,1)}function linearToRgbd(source,maxRange,result=new Vector4){const maxRGB=Math.max(source.r,source.g,source.b);const realD=Math.max(maxRange/maxRGB,1);const normalizedD=clamp(Math.floor(realD)/255,0,1);const s=normalizedD*(255/maxRange);return result.set(source.r*s,source.g*s,source.b*s,normalizedD)}function rgbeToLinearArray(sourceArray,result=undefined){const sourceColor=new Vector4;const destColor=new Vector4;if(result===undefined){result=new Float32Array(sourceArray.length)}for(let i=0;i<sourceArray.length;i+=4){sourceColor.setFromArray(sourceArray,i);rgbeToLinear(sourceColor,destColor);destColor.toArray(result,i)}return result}function linearToRgbdArray(sourceArray,maxRange,result=undefined){const sourceColor=new Vector4;const destColor=new Vector4;if(result===undefined){result=new Float32Array(sourceArray.length)}for(let i=0;i<sourceArray.length;i+=4){sourceColor.setFromArray(sourceArray,i);linearToRgbd(sourceColor,maxRange,destColor);destColor.toArray(result,i)}return result}class Buffer{constructor(data,position){this.data=data;this.position=position}}async function fetchCubeHDRs(urlPattern){const cubeMapFaces=["px","nx","py","ny","pz","nz"];const fetchPromises=[];cubeMapFaces.forEach(face=>{fetchPromises.push(fetchHDR(urlPattern.replace("*",face)))});return Promise.all(fetchPromises)}async function fetchHDR(url){const response=await fetch(url);if(!response.ok){throw new Error("response error: "+response.status+":"+response.statusText)}return parseHDR(await response.arrayBuffer())}function parseHDR(arrayBuffer){const buffer=new Buffer(new Uint8Array(arrayBuffer),0);const header=readHeader(buffer);const pixelData=readRLEPixelData(buffer.data.subarray(buffer.position),header.width,header.height);return new ArrayBufferImage(floatsToNormalizedBytes(linearToRgbdArray(rgbeToLinearArray(normalizedByteToFloats(pixelData)),16)),header.width,header.height,DataType.UnsignedByte,exports.PixelEncoding.RGBE)}function stringFromCharCodes(unicode){let result="";for(let i=0;i<unicode.length;i++){result+=String.fromCharCode(unicode[i])}return result}function fgets(buffer,lineLimit=0,consume=true){lineLimit=lineLimit===0?1024:lineLimit;const chunkSize=128;let p=buffer.position,i=-1,len=0,s="",chunk=stringFromCharCodes(new Uint16Array(buffer.data.subarray(p,p+chunkSize)));while(0>(i=chunk.indexOf("\n"))&&len<lineLimit&&p<buffer.data.byteLength){s+=chunk;len+=chunk.length;p+=chunkSize;chunk+=stringFromCharCodes(new Uint16Array(buffer.data.subarray(p,p+chunkSize)))}if(-1<i){if(false!==consume){buffer.position+=len+i+1}return s+chunk.slice(0,i)}return undefined}class Header{constructor(){this.valid=0;this.string="";this.comments="";this.programType="RGBE";this.format="";this.gamma=1;this.exposure=1;this.width=0;this.height=0}}function readHeader(buffer){const RGBE_VALID_PROGRAMTYPE=1;const RGBE_VALID_FORMAT=2;const RGBE_VALID_DIMENSIONS=4;let line,match;const magicTokenRegex=/^#\?(\S+)$/;const gammaRegex=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/;const exposureRegex=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/;const formatRegex=/^\s*FORMAT=(\S+)\s*$/;const dimensionsRegex=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/;const header=new Header;if(buffer.position>=buffer.data.byteLength||(line=fgets(buffer))===undefined){throw new Error("hrd: no header found")}if((match=line.match(magicTokenRegex))===null){throw new Error("hrd: bad initial token")}header.valid|=RGBE_VALID_PROGRAMTYPE;header.programType=match[1];header.string+=line+"\n";while(true){line=fgets(buffer);if(undefined===line){break}header.string+=line+"\n";if("#"===line.charAt(0)){header.comments+=line+"\n";continue}if((match=line.match(gammaRegex))!==null){header.gamma=parseFloat(match[1])}if((match=line.match(exposureRegex))!==null){header.exposure=parseFloat(match[1])}if((match=line.match(formatRegex))!==null){header.valid|=RGBE_VALID_FORMAT;header.format=match[1]}if((match=line.match(dimensionsRegex))!==null){header.valid|=RGBE_VALID_DIMENSIONS;header.height=parseInt(match[1],10);header.width=parseInt(match[2],10)}if((header.valid&RGBE_VALID_FORMAT)!==0&&(header.valid&RGBE_VALID_DIMENSIONS)!==0){break}}if((header.valid&RGBE_VALID_FORMAT)===0){throw new Error("hrd: missing format specifier")}if((header.valid&RGBE_VALID_DIMENSIONS)===0){throw new Error("hdr: missing image size specifier")}return header}function readRLEPixelData(byteArray,width,height){if(width<8||width>32767||2!==byteArray[0]||2!==byteArray[1]||(byteArray[2]&128)!==0){return byteArray}if(width!==(byteArray[2]<<8|byteArray[3])){throw new Error("hdr: wrong scanline width")}const dataRgba=new Uint8Array(4*width*height);let offset=0;let pos=0;const ptrEnd=4*width;const rgbeStart=new Uint8Array(4);const scanlineBuffer=new Uint8Array(ptrEnd);while(height>0&&pos<byteArray.byteLength){if(pos+4>byteArray.byteLength){throw new Error("hdr: read error")}rgbeStart[0]=byteArray[pos++];rgbeStart[1]=byteArray[pos++];rgbeStart[2]=byteArray[pos++];rgbeStart[3]=byteArray[pos++];if(2!==rgbeStart[0]||2!==rgbeStart[1]||(rgbeStart[2]<<8|rgbeStart[3])!==width){throw new Error("hdr: bad rgbe scanline format")}let ptr=0;while(ptr<ptrEnd&&pos<byteArray.byteLength){let count=byteArray[pos++];const isEncodedRun=count>128;if(isEncodedRun){count-=128}if(0===count||ptr+count>ptrEnd){throw new Error("hdr: bad scanline data")}if(isEncodedRun){const byteValue=byteArray[pos++];for(let i=0;i<count;i++){scanlineBuffer[ptr++]=byteValue}}else{scanlineBuffer.set(byteArray.subarray(pos,pos+count),ptr);ptr+=count;pos+=count}}for(let i=0;i<width;i++){let off=0;dataRgba[offset]=scanlineBuffer[i+off];off+=width;dataRgba[offset+1]=scanlineBuffer[i+off];off+=width;dataRgba[offset+2]=scanlineBuffer[i+off];off+=width;dataRgba[offset+3]=scanlineBuffer[i+off];offset+=4}height--}return dataRgba}function fetchImageElement(url,size=new Vector2){return new Promise((resolve,reject)=>{const image=new Image;if(size.x>0||size.y>0){image.width=size.x;image.height=size.y}image.crossOrigin="anonymous";image.addEventListener("load",()=>resolve(image));image.addEventListener("error",()=>{reject(new Error(`failed to load image: ${url}`))});image.src=url})}function fetchImageBitmap(url){return new Promise((resolve,reject)=>{fetch(url).then(response=>{if(response.status===200){return response.blob()}reject(`Unable to load resource with url ${url}`)}).then(blobData=>{if(blobData!==undefined){return createImageBitmap(blobData)}}).then(imageBitmap=>resolve(imageBitmap),err=>{reject(err)})})}function isImageBitmapSupported(){return"createImageBitmap"in window}function fetchImage(url){if(isImageBitmapSupported()&&!url.includes(".svg")){return fetchImageBitmap(url)}return fetchImageElement(url)}async function fetchCubeImages(urlPattern){const cubeMapFaces=["px","nx","py","ny","pz","nz"];const fetchPromises=[];cubeMapFaces.forEach(face=>{fetchPromises.push(fetchImage(urlPattern.replace("*",face)))});return Promise.all(fetchPromises)}var TextureWrap;(function(TextureWrap){TextureWrap[TextureWrap["MirroredRepeat"]=GL.MIRRORED_REPEAT]="MirroredRepeat";TextureWrap[TextureWrap["ClampToEdge"]=GL.CLAMP_TO_EDGE]="ClampToEdge";TextureWrap[TextureWrap["Repeat"]=GL.REPEAT]="Repeat"})(TextureWrap||(TextureWrap={}));class Texture extends VirtualTexture{constructor(image,wrapS=TextureWrap.ClampToEdge,wrapT=TextureWrap.ClampToEdge,level=0,magFilter=TextureFilter.Linear,minFilter=TextureFilter.LinearMipmapLinear,pixelFormat=PixelFormat.RGBA,dataType=DataType.UnsignedByte,generateMipmaps=true,anisotropicLevels=1){super(level,magFilter,minFilter,pixelFormat,dataType,generateMipmaps,anisotropicLevels);this.image=image;this.wrapS=wrapS;this.wrapT=wrapT;this.size=new Vector2(image.width,image.height)}}function makeTextureFromVideoElement(video){return new Texture(video,TextureWrap.ClampToEdge,TextureWrap.ClampToEdge,0,TextureFilter.Linear,TextureFilter.Linear,PixelFormat.RGB,DataType.UnsignedByte,false,0)}class Matrix3{constructor(){this.elements=[1,0,0,0,1,0,0,0,1]}getHashCode(){return hashFloatArray(this.elements)}set(n11,n12,n13,n21,n22,n23,n31,n32,n33){const te=this.elements;te[0]=n11;te[1]=n21;te[2]=n31;te[3]=n12;te[4]=n22;te[5]=n32;te[6]=n13;te[7]=n23;te[8]=n33;return this}clone(){return(new Matrix3).copy(this)}copy(m){const te=this.elements;const me=m.elements;te[0]=me[0];te[1]=me[1];te[2]=me[2];te[3]=me[3];te[4]=me[4];te[5]=me[5];te[6]=me[6];te[7]=me[7];te[8]=me[8];return this}getComponent(index){return this.elements[index]}setComponent(index,value){this.elements[index]=value;return this}multiplyByScalar(s){const te=this.elements;te[0]*=s;te[3]*=s;te[6]*=s;te[1]*=s;te[4]*=s;te[7]*=s;te[2]*=s;te[5]*=s;te[8]*=s;return this}makeIdentity(){this.set(1,0,0,0,1,0,0,0,1);return this}equals(m){for(let i=0;i<16;i++){if(m.elements[i]!==this.elements[i]){return false}}return true}setFromArray(floatArray,offset){for(let i=0;i<this.elements.length;i++){this.elements[i]=floatArray[offset+i]}}toArray(floatArray,offset){for(let i=0;i<this.elements.length;i++){floatArray[offset+i]=this.elements[i]}}}function makeMatrix3Concatenation(a,b,result=new Matrix3){const ae=a.elements;const be=b.elements;const te=result.elements;const a11=ae[0],a12=ae[3],a13=ae[6];const a21=ae[1],a22=ae[4],a23=ae[7];const a31=ae[2],a32=ae[5],a33=ae[8];const b11=be[0],b12=be[3],b13=be[6];const b21=be[1],b22=be[4],b23=be[7];const b31=be[2],b32=be[5],b33=be[8];te[0]=a11*b11+a12*b21+a13*b31;te[3]=a11*b12+a12*b22+a13*b32;te[6]=a11*b13+a12*b23+a13*b33;te[1]=a21*b11+a22*b21+a23*b31;te[4]=a21*b12+a22*b22+a23*b32;te[7]=a21*b13+a22*b23+a23*b33;te[2]=a31*b11+a32*b21+a33*b31;te[5]=a31*b12+a32*b22+a33*b32;te[8]=a31*b13+a32*b23+a33*b33;return result}function makeMatrix3Translation(t,result=new Matrix3){return result.set(1,0,t.x,0,1,t.y,0,0,1)}function makeMatrix3RotationFromAngle(angle,result=new Matrix3){const c=Math.cos(angle);const s=Math.sin(angle);return result.set(c,-s,0,s,c,0,0,0,1)}function makeMatrix3Scale(s,result=new Matrix3){return result.set(s.x,0,0,0,s.y,0,0,0,1)}var __classPrivateFieldGet=undefined&&undefined.__classPrivateFieldGet||function(receiver,privateMap){if(!privateMap.has(receiver)){throw new TypeError("attempted to get private field on non-instance")}return privateMap.get(receiver)};var __classPrivateFieldSet=undefined&&undefined.__classPrivateFieldSet||function(receiver,privateMap,value){if(!privateMap.has(receiver)){throw new TypeError("attempted to set private field on non-instance")}privateMap.set(receiver,value);return value};var _uvTransform,_uvTransformVersion;class TextureAccessor{constructor(texture=undefined,uvIndex=0,uvScale=new Vector2(1,1),uvRotation=0,uvTranslation=new Vector2){this.texture=texture;this.uvIndex=uvIndex;this.uvScale=uvScale;this.uvRotation=uvRotation;this.uvTranslation=uvTranslation;this.version=0;_uvTransform.set(this,new Matrix3);_uvTransformVersion.set(this,-1)}get uvTransform(){if(__classPrivateFieldGet(this,_uvTransformVersion)<this.version){__classPrivateFieldSet(this,_uvTransform,makeMatrix3Translation(this.uvTranslation,__classPrivateFieldGet(this,_uvTransform)));__classPrivateFieldSet(this,_uvTransform,makeMatrix3Concatenation(__classPrivateFieldGet(this,_uvTransform),makeMatrix3RotationFromAngle(this.uvRotation),__classPrivateFieldGet(this,_uvTransform)));__classPrivateFieldSet(this,_uvTransform,makeMatrix3Concatenation(__classPrivateFieldGet(this,_uvTransform),makeMatrix3Scale(this.uvScale),__classPrivateFieldGet(this,_uvTransform)));__classPrivateFieldSet(this,_uvTransformVersion,this.version)}return __classPrivateFieldGet(this,_uvTransform)}dirty(){this.version++}}_uvTransform=new WeakMap,_uvTransformVersion=new WeakMap;exports.ArrayBufferImage=ArrayBufferImage;exports.CubeMapTexture=CubeMapTexture;exports.Texture=Texture;exports.TextureAccessor=TextureAccessor;exports.VirtualTexture=VirtualTexture;exports.cubeFaceLooks=cubeFaceLooks;exports.cubeFaceNames=cubeFaceNames;exports.cubeFaceTargets=cubeFaceTargets;exports.cubeFaceUps=cubeFaceUps;exports.fetchCubeHDRs=fetchCubeHDRs;exports.fetchCubeImages=fetchCubeImages;exports.fetchHDR=fetchHDR;exports.fetchImage=fetchImage;exports.fetchImageBitmap=fetchImageBitmap;exports.fetchImageElement=fetchImageElement;exports.isImageBitmapSupported=isImageBitmapSupported;exports.makeMatrix4CubeMapTransform=makeMatrix4CubeMapTransform;exports.makeTextureFromVideoElement=makeTextureFromVideoElement;exports.parseHDR=parseHDR;return exports})({});
(function(exports){"use strict";const arrayBuffer=new ArrayBuffer(12*16);const floatArray=new Float32Array(arrayBuffer);const intArray=new Int32Array(arrayBuffer);function hashFloat3(v0,v1,v2){floatArray[0]=v0;floatArray[1]=v1;floatArray[2]=v2;let hash=intArray[0]|0;hash=hash*397^(intArray[1]|0);return hash*397^(intArray[2]|0)}function hashFloat4(v0,v1,v2,v3){floatArray[0]=v0;floatArray[1]=v1;floatArray[2]=v2;floatArray[3]=v3;let hash=intArray[0]|0;hash=hash*397^(intArray[1]|0);hash=hash*397^(intArray[2]|0);return hash*397^(intArray[3]|0)}var EulerOrder;(function(EulerOrder){EulerOrder[EulerOrder["XYZ"]=0]="XYZ";EulerOrder[EulerOrder["YXZ"]=1]="YXZ";EulerOrder[EulerOrder["ZXY"]=2]="ZXY";EulerOrder[EulerOrder["ZYX"]=3]="ZYX";EulerOrder[EulerOrder["YZX"]=4]="YZX";EulerOrder[EulerOrder["XZY"]=5]="XZY";EulerOrder[EulerOrder["Default"]=0]="Default"})(EulerOrder||(EulerOrder={}));class Euler{constructor(x=0,y=0,z=0,order=EulerOrder.Default){this.x=x;this.y=y;this.z=z;this.order=order}getHashCode(){return hashFloat4(this.x,this.y,this.z,this.order)}set(x,y,z,order=EulerOrder.Default){this.x=x;this.y=y;this.z=z;this.order=order;return this}clone(){return(new Euler).copy(this)}copy(e){return this.set(e.x,e.y,e.z,e.order)}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.order===this.order}setFromArray(array,offset){this.x=array[offset+0];this.y=array[offset+1];this.z=array[offset+2];this.order=array[offset+3]}toArray(array,offset){array[offset+0]=this.x;array[offset+1]=this.y;array[offset+2]=this.z;array[offset+3]=this.order}}function clamp(value,min,max){return Math.min(Math.max(value,min),max)}function degToRad(degrees){return degrees*(Math.PI/180)}class Quaternion{constructor(x=0,y=0,z=0,w=1){this.x=x;this.y=y;this.z=z;this.w=w}getHashCode(){return hashFloat4(this.x,this.y,this.z,this.w)}set(x,y,z,w){this.x=x;this.y=y;this.z=z;this.w=w;return this}clone(){return(new Quaternion).copy(this)}copy(q){this.x=q.x;this.y=q.y;this.z=q.z;this.w=q.w;return this}add(q){this.x+=q.x;this.y+=q.y;this.z+=q.z;this.w+=q.w;return this}sub(q){this.x-=q.x;this.y-=q.y;this.z-=q.z;this.w-=q.w;return this}getComponent(index){switch(index){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error(`index of our range: ${index}`)}}setComponent(index,value){switch(index){case 0:this.x=value;break;case 1:this.y=value;break;case 2:this.z=value;break;case 3:this.w=value;break;default:throw new Error(`index of our range: ${index}`)}return this}multiply(q){const qax=this.x,qay=this.y,qaz=this.z,qaw=this.w;const qbx=q.x,qby=q.y,qbz=q.z,qbw=q.w;this.x=qax*qbw+qaw*qbx+qay*qbz-qaz*qby;this.y=qay*qbw+qaw*qby+qaz*qbx-qax*qbz;this.z=qaz*qbw+qaw*qbz+qax*qby-qay*qbx;this.w=qaw*qbw-qax*qbx-qay*qby-qaz*qbz;return this}angleTo(q){return 2*Math.acos(Math.abs(Math.min(Math.max(this.dot(q),-1),1)))}dot(q){return this.x*q.x+this.y*q.y+this.z*q.z+this.w*q.w}conjugate(){this.x*=-1;this.y*=-1;this.z*=-1;return this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}normalize(){let l=this.length();if(l===0){this.x=0;this.y=0;this.z=0;this.w=1}else{l=1/l;this.x*=l;this.y*=l;this.z*=l;this.w*=l}return this}slerp(qb,t){if(t===0){return this}if(t===1){return this.copy(qb)}const x=this.x,y=this.y,z=this.z,w=this.w;let cosHalfTheta=w*qb.w+x*qb.x+y*qb.y+z*qb.z;if(cosHalfTheta<0){this.w=-qb.w;this.x=-qb.x;this.y=-qb.y;this.z=-qb.z;cosHalfTheta=-cosHalfTheta}else{this.copy(qb)}if(cosHalfTheta>=1){this.w=w;this.x=x;this.y=y;this.z=z;return this}const sqrSinHalfTheta=1-cosHalfTheta*cosHalfTheta;if(sqrSinHalfTheta<=Number.EPSILON){const s=1-t;this.w=s*w+t*this.w;this.x=s*x+t*this.x;this.y=s*y+t*this.y;this.z=s*z+t*this.z;this.normalize();return this}const sinHalfTheta=Math.sqrt(sqrSinHalfTheta);const halfTheta=Math.atan2(sinHalfTheta,cosHalfTheta);const ratioA=Math.sin((1-t)*halfTheta)/sinHalfTheta,ratioB=Math.sin(t*halfTheta)/sinHalfTheta;this.w=w*ratioA+this.w*ratioB;this.x=x*ratioA+this.x*ratioB;this.y=y*ratioA+this.y*ratioB;this.z=z*ratioA+this.z*ratioB;return this}equals(q){return q.x===this.x&&q.y===this.y&&q.z===this.z&&q.w===this.w}setFromArray(floatArray,offset){this.x=floatArray[offset+0];this.y=floatArray[offset+1];this.z=floatArray[offset+2];this.w=floatArray[offset+3]}toArray(floatArray,offset){floatArray[offset+0]=this.x;floatArray[offset+1]=this.y;floatArray[offset+2]=this.z;floatArray[offset+3]=this.w}}function makeQuaternionFromEuler(e,result=new Quaternion){const x=e.x,y=e.y,z=e.z,order=e.order;const c1=Math.cos(x/2);const c2=Math.cos(y/2);const c3=Math.cos(z/2);const s1=Math.sin(x/2);const s2=Math.sin(y/2);const s3=Math.sin(z/2);switch(order){case EulerOrder.XYZ:return result.set(s1*c2*c3+c1*s2*s3,c1*s2*c3-s1*c2*s3,c1*c2*s3+s1*s2*c3,c1*c2*c3-s1*s2*s3);case EulerOrder.YXZ:return result.set(s1*c2*c3+c1*s2*s3,c1*s2*c3-s1*c2*s3,c1*c2*s3-s1*s2*c3,c1*c2*c3+s1*s2*s3);case EulerOrder.ZXY:return result.set(s1*c2*c3-c1*s2*s3,c1*s2*c3+s1*c2*s3,c1*c2*s3+s1*s2*c3,c1*c2*c3-s1*s2*s3);case EulerOrder.ZYX:return result.set(s1*c2*c3-c1*s2*s3,c1*s2*c3+s1*c2*s3,c1*c2*s3-s1*s2*c3,c1*c2*c3+s1*s2*s3);case EulerOrder.YZX:return result.set(s1*c2*c3+c1*s2*s3,c1*s2*c3+s1*c2*s3,c1*c2*s3-s1*s2*c3,c1*c2*c3-s1*s2*s3);case EulerOrder.XZY:return result.set(s1*c2*c3-c1*s2*s3,c1*s2*c3-s1*c2*s3,c1*c2*s3+s1*s2*c3,c1*c2*c3+s1*s2*s3);default:throw new Error("unsupported euler order")}}function makeQuaternionFromAxisAngle(axis,angle,result=new Quaternion){const halfAngle=angle/2,s=Math.sin(halfAngle);return result.set(axis.x*s,axis.y*s,axis.z*s,Math.cos(halfAngle))}class Vector3{constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}get width(){return this.x}set width(width){this.x=width}get height(){return this.y}set height(height){this.y=height}get depth(){return this.z}set depth(depth){this.z=depth}get r(){return this.x}set r(r){this.x=r}get g(){return this.y}set g(g){this.y=g}get b(){return this.z}set b(b){this.z=b}getHashCode(){return hashFloat3(this.x,this.y,this.z)}set(x,y,z){this.x=x;this.y=y;this.z=z;return this}clone(){return(new Vector3).copy(this)}copy(v){return this.set(v.x,v.y,v.z)}add(v){this.x+=v.x;this.y+=v.y;this.z+=v.z;return this}addScalar(s){this.x+=s;this.y+=s;this.z+=s;return this}sub(v){this.x-=v.x;this.y-=v.y;this.z-=v.z;return this}multiplyByScalar(s){this.x*=s;this.y*=s;this.z*=s;return this}negate(){this.x*=-1;this.y*=-1;this.z*=-1;return this}lerp(v,alpha){this.x+=(v.x-this.x)*alpha;this.y+=(v.y-this.y)*alpha;this.z+=(v.z-this.z)*alpha;return this}normalize(){const length=this.length();return this.multiplyByScalar(length===0?1:1/length)}getComponent(index){if(index===0){return this.x}else if(index===1){return this.y}else if(index===2){return this.z}else{throw new Error(`index of our range: ${index}`)}}setComponent(index,value){if(index===0){this.x=value}else if(index===1){this.y=value}else if(index===2){this.z=value}else{throw new Error(`index of our range: ${index}`)}return this}dot(v){return this.x*v.x+this.y*v.y+this.z*v.z}cross(v){const ax=this.x,ay=this.y,az=this.z;const bx=v.x,by=v.y,bz=v.z;this.x=ay*bz-az*by;this.y=az*bx-ax*bz;this.z=ax*by-ay*bx;return this}length(){return Math.sqrt(this.lengthSquared())}lengthSquared(){return this.x*this.x+this.y*this.y+this.z*this.z}distanceToSquared(v){const dx=this.x-v.x;const dy=this.y-v.y;const dz=this.z-v.z;return dx*dx+dy*dy+dz*dz}distanceTo(v){return Math.sqrt(this.distanceToSquared(v))}min(v){this.x=Math.min(this.x,v.x);this.y=Math.min(this.y,v.y);this.z=Math.min(this.z,v.z);return this}max(v){this.x=Math.max(this.x,v.x);this.y=Math.max(this.y,v.y);this.z=Math.max(this.z,v.z);return this}clamp(min,max){this.x=clamp(this.x,min.x,max.x);this.y=clamp(this.y,min.y,max.y);this.z=clamp(this.z,min.z,max.z);return this}equals(v){return v.x===this.x&&v.y===this.y&&v.z===this.z}setFromArray(array,offset){this.x=array[offset+0];this.y=array[offset+1];this.z=array[offset+2]}toArray(array,offset){array[offset+0]=this.x;array[offset+1]=this.y;array[offset+2]=this.z}}const zAxis=new Vector3(0,0,1);const q1=new Quaternion(-Math.sqrt(.5),0,0,Math.sqrt(.5));class DeviceOrientation{constructor(){this.disposed=false;this.deviceOrientation=new Euler(0,0,0,EulerOrder.YXZ);this.screenOrientation=0;this.tempValue=new Quaternion;const onDeviceOrientation=event=>{var _a,_b,_c;this.deviceOrientation.set(degToRad((_a=event.beta)!==null&&_a!==void 0?_a:0),degToRad((_b=event.alpha)!==null&&_b!==void 0?_b:0-180),-degToRad((_c=event.gamma)!==null&&_c!==void 0?_c:0),EulerOrder.YXZ)};const onOrientationChange=()=>{console.log("orientation",window.orientation);this.screenOrientation=-degToRad(window.orientation)};if(window.DeviceOrientationEvent!==undefined&&typeof window.DeviceOrientationEvent.requestPermission==="function"){window.DeviceOrientationEvent.requestPermission().then(response=>{if(response==="granted"){window.addEventListener("orientationchange",onOrientationChange,false);window.addEventListener("deviceorientation",onDeviceOrientation,false)}}).catch(()=>{throw new Error("DeviceOrientation API not available.")})}else{window.addEventListener("orientationchange",onOrientationChange,false);window.addEventListener("deviceorientation",onDeviceOrientation,false)}this.onDispose=()=>{window.removeEventListener("orientationchange",onOrientationChange,false);window.removeEventListener("deviceorientation",onDeviceOrientation,false)}}get orientation(){const result=makeQuaternionFromEuler(this.deviceOrientation);result.multiply(q1);result.multiply(makeQuaternionFromAxisAngle(zAxis,this.screenOrientation,this.tempValue));return result}dispose(){if(!this.disposed){this.onDispose();this.disposed=true}}}exports.DeviceOrientation=DeviceOrientation;return exports})({});
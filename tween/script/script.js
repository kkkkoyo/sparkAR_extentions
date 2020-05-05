// Spark AR Studio v87

// Load the modules
const Scene = require('Scene');
const Patches = require('Patches');

const Time = require('Time');
const Animation = require('Animation');


export const Ease = {

	LINEAR: "linear",
	BOUNCE_IN: "easeInBounce",
	BOUNCE_OUT: "easeOutBounce",
	EASE_IN_BACK: "easeInBack",
	EASE_IN_CIRC: "easeInCirc",
	EASE_IN_CUBIC: "easeInCubic",
	EASE_IN_ELASTIC: "easeInElastic",
	EASE_IN_EXPO: "easeInExpo",

	EASE_IN_OUT_BACK: "easeInOutBack",
	EASE_IN_OUT_BOUNCE: "easeInOutBounce",

	EASE_IN_OUT_CIRC: "easeInOutCirc",
	EASE_IN_OUT_ELASTIC: "easeInOutElastic",

	EASE_IN_OUT_EXPO: "easeInOutExpo",
	EASE_IN_OUT_QUAD: "easeInOutQuad",

	EASE_IN_OUT_QUART: "easeInOutQuart",
	EASE_IN_OUT_SINE: "easeInOutSine",

	EASE_IN_QUAD: "easeInQuad",
	EASE_IN_QUART: "easeInQuart",

	EASE_IN_QUINT: "easeInQuint",
	EASE_IN_SINE: "easeInSine",


	EASE_OUT_BACK: "easeOutBack",
	EASE_OUT_CIRC: "easeOutCirc",


	EASE_OUT_CUBIC: "easeOutCubic",
	EASE_OUT_ELASTIC: "easeOutElastic",


	EASE_OUT_EXPO: "easeOutExpo",
	EASE_OUT_QUAD: "easeOutQuad",

	EASE_OUT_QUART: "easeOutQuart",
	EASE_OUT_QUINT: "easeOutQuint",
	EASE_OUT_SINE: "easeOutSine"

};

export class SparkTweener {
	constructor(animation, driver, sub) {
		this.animation = animation;
		this.driver = driver;
		this.sub = sub;
	}

	Kill() {
		this.driver.stop();
		if (this.sub != null) {
			this.sub.unsubscribe();
		}
	}


}
// Load in the Diagnostics module
const Diagnostics = require('Diagnostics');

var mySceneObject = Scene.root.find('rect');
Patches.outputs.getScalar('getVectorValue').then(val=>{

  if(val.lastValue == 1)
  {
    initAnimation();
  }
})
function initAnimation() {
  // 遷移前のposition
  const initX = 0;
  const initY = 0;
  const initZ = 0;
  // 遷移前のrotation
  const initrX = 0;
  const initrY = 0;
  const initrZ = 0;
  // 遷移後のposition
  const X = 100;
  const Y = 0;
  const Z = 0;
  // 遷移後のrotation
  const rX = 0;
  const rY = 0;
  const rZ = 0;

  Time.setTimeout(function (elapsedTime) { 

    // posAnimationTween(mySceneObject,X,Y,Z,rX,rY,rZ,initX,initY,initZ,initrX,initrY,initrZ,null,1.5);
    scaleAnimationTween(mySceneObject,X,Y,Z,initX,initY,initZ,null,1.5);
   }, 2000);
}

function scaleAnimationTween(Obj,posX,posY,posZ, initX = 0,initY = 0,
    initZ = 0,completeCallback = null,duration = 3) {
  
    var degToRad = Math.PI / 180;
    var tweenX = Tween(initX, posX, duration, 1, false, Ease.LINEAR, completeCallback).animation;
    var tweenY = Tween(initY, posY, duration, 1, false, Ease.LINEAR, null).animation;
    // var tweenZ = Tween(initZ, posZ, duration, 1, false, Ease.LINEAR, null).animation;
  
    Obj.transform.scaleX = tweenX;
    Obj.transform.scaleY = tweenY;
    // Obj.transform.scaleZ = tweenZ;
  }

function posAnimationTween(Obj,posX,posY,posZ,roX,roY,roZ,initX = 0,initY = 0,
  initZ = 0,initrX = 0,initrY = 0, initrZ = 0,completeCallback = null,duration = 3) {

  var degToRad = Math.PI / 180;
  var tweenPosX = Tween(initX, posX, duration, 1, false, Ease.LINEAR, completeCallback).animation;
  var tweenPosY = Tween(initY, posY, duration, 1, false, Ease.LINEAR, null).animation;
  var tweenPosZ = Tween(initZ, posZ, duration, 1, false, Ease.LINEAR, null).animation;

  var tweenRX = Tween(initrX * degToRad, roX * degToRad, duration, 1, false, Ease.LINEAR, null).animation;
  var tweenRY = Tween(initrY * degToRad, roY * degToRad, duration, 1, false, Ease.LINEAR, null).animation;
  var tweenRZ = Tween(initrZ * degToRad, roZ * degToRad, duration, 1, false, Ease.LINEAR, null).animation;
  // Diagnostics.log(tweenRX.newValue);
  Obj.transform.x = tweenPosX;
  Obj.transform.y = tweenPosY;
  Obj.transform.z = tweenPosZ;
  Obj.transform.rotationX = tweenRX;
  Obj.transform.rotationY = tweenRY;
  Obj.transform.rotationZ = tweenRZ;
}

export function Tween(startVal, endVal, duration, loopCount, mirror, ease, completeCallback) {

	if (loopCount == -1) {
		loopCount = Infinity;
	}
	var driver = Animation.timeDriver({
		durationMilliseconds: duration * 1000,
		loopCount: loopCount,
		onComplete: completeCallback,
		mirror: mirror
	});
	var sampler;

	try {
		sampler = Animation.samplers[ease](startVal, endVal);
	} catch (e) {
		sampler = Animation.samplers.linear(startVal, endVal);
	}
	var sub = null;

	if (completeCallback != null) {
		var sub = driver.onCompleted().subscribe(completeCallback);
		driver.callback = sub;
	}

	driver.start();

	var tweener = new SparkTweener(Animation.animate(driver, sampler), driver, sub);

	return tweener;
}

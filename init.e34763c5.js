parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iJA9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNextPoopTime=exports.getNextHungerTime=exports.getNextDieTime=exports.default=exports.TICK_RATE=exports.SCENES=exports.RAIN_CHANCE=exports.NIGHT_LENGTH=exports.ICONS=exports.DAY_LENGTH=void 0;const t=["fish","poop","weather"];exports.ICONS=t;const e=1500;exports.TICK_RATE=1500;const o=["sunny","rain"];exports.SCENES=o;const s=.2;exports.RAIN_CHANCE=.2;const r=20;exports.DAY_LENGTH=20;const x=15;exports.NIGHT_LENGTH=15;const p=t=>Math.floor(3*Math.random())+5+t;exports.getNextHungerTime=p;const N=t=>Math.floor(3*Math.random())+3+t;exports.getNextDieTime=N;const n=t=>Math.floor(3*Math.random())+5+t;exports.getNextPoopTime=n;const E=["SLEEP","FEEDING","CELEBRATING","HATCHING"];var T=E;exports.default=T;
},{}],"lA8h":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.writeModal=exports.togglePoopBag=exports.modScene=exports.modFox=void 0;const o=function(o){document.querySelector(".fox").className=`fox fox-${o}`};exports.modFox=o;const e=function(o){document.querySelector(".game").className=`game ${o}`};exports.modScene=e;const t=function(o){document.querySelector(".poop-bag").classList.toggle("hidden",!o)};exports.togglePoopBag=t;const s=function(o=""){document.querySelector(".modal").innerHTML=`<div class="modal-inner">${o}</div>`};exports.writeModal=s;
},{}],"Oo4C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleUserAction=exports.default=void 0;var e=o(require("./constants")),t=require("./ui");function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,o=new WeakMap;return(i=function(e){return e?o:t})(e)}function o(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var o=i(t);if(o&&o.has(e))return o.get(e);var s={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in e)if("default"!==n&&Object.prototype.hasOwnProperty.call(e,n)){var c=r?Object.getOwnPropertyDescriptor(e,n):null;c&&(c.get||c.set)?Object.defineProperty(s,n,c):s[n]=e[n]}return s.default=e,o&&o.set(e,s),s}const s={current:"INIT",clock:1,wakeTime:-1,sleepTime:-1,scene:0,hungryTime:-1,dieTime:-1,poopTime:-1,timeToStartCelebrating:-1,timeToEndCelebrating:-1,tick(){switch(this.clock++,console.log(this.clock),this.clock){case this.wakeTime:this.wake();break;case this.sleepTime:this.sleep();break;case this.hungryTime:this.getHungry();break;case this.dieTime:this.die();break;case this.timeToStartCelebrating:this.startCelebrating();break;case this.timeToEndCelebrating:this.endCelebrating();break;case this.poopTime:this.poop()}return this.clock},startGame(){console.log("hatching"),this.current="HATCHING",this.wakeTime=this.clock+3,(0,t.modFox)("egg"),(0,t.modScene)("day"),(0,t.writeModal)("")},wake(){console.log("hatched  day"),this.current="IDLING",this.wakeTime=-1,(0,t.modFox)("idling"),this.scene=Math.random()>e.RAIN_CHANCE?0:1,(0,t.modScene)(e.SCENES[this.scene]),this.determineFoxState(),this.sleepTime=this.clock+e.DAY_LENGTH,this.hungryTime=(0,e.getNextHungerTime)(this.clock)},sleep(){this.current="SLEEP",this.determineFoxState(),this.clearTimes(),this.wakeTime=this.clock+e.NIGHT_LENGTH},clearTimes(){this.wakeTime=-1,this.sleepTime=-1,this.hungryTime=-1,this.dieTime=-1,this.poopTime=-1,this.timeToStartCelebrating=-1,this.timeToEndCelebrating=-1},getHungry(){this.current="HUNGRY",console.log("fox is now hungry"),this.dieTime=(0,e.getNextDieTime)(this.clock),console.log("Next die time:",this.dieTime),this.hungryTime=-1,(0,t.modFox)("hungry")},die(){console.log("die"),this.current="DEAD",(0,t.modFox)("dead"),(0,t.modScene)("dead"),this.clearTimes(),(0,t.writeModal)("The fox died: ( </br> Press the middle button to restart the game)")},startCelebrating(){this.current="CELEBRATING",(0,t.modFox)("celebrate"),this.timeToStartCelebrating=-1,this.timeToEndCelebrating=this.clock+2,console.log(this.timeToEndCelebrating)},endCelebrating(){console.log("celebration ended"),this.timeToEndCelebrating=-1,this.current="IDLING",this.determineFoxState(),(0,t.togglePoopBag)(!1)},poop(){this.current="POOPING",console.log("Fox needs to poop"),this.poopTime=-1,this.dieTime=(0,e.getNextDieTime)(this.clock),console.log("Next die time:",this.dieTime),(0,t.modFox)("pooping")},determineFoxState(){"IDLING"===this.current&&("rain"===e.SCENES[this.scene]?(0,t.modFox)("rain"):(0,t.modFox)("idling")),"SLEEP"===this.current&&((0,t.modFox)("sleep"),(0,t.modScene)("night"))},handleUserAction(t){if(console.log("current icon is:",t),!e.default.includes(this.current))if("INIT"!==this.current&&"DEAD"!==this.current)switch(t){case"weather":this.changeWeather();break;case"poop":this.cleanUpPoop();break;case"fish":this.feed()}else this.startGame()},changeWeather(){console.log("changeWeather"),this.scene=(1+this.scene)%e.SCENES.length,(0,t.modScene)(e.SCENES[this.scene]),this.determineFoxState()},cleanUpPoop(){console.log("cleanUpPoop"),"POOPING"===this.current&&(this.dieTime=-1,(0,t.togglePoopBag)(!0),this.startCelebrating(),this.hungryTime=(0,e.getNextHungerTime)(this.clock))},feed(){"HUNGRY"===this.current&&(console.log("fox is eating now"),this.current="FEEDING",this.dieTime=-1,this.poopTime=(0,e.getNextPoopTime)(this.clock),console.log("next time to poop",this.poopTime),(0,t.modFox)("eating"),this.timeToStartCelebrating=this.clock+2)}};var r=s;exports.default=r;const n=s.handleUserAction.bind(s);exports.handleUserAction=n;
},{"./constants":"iJA9","./ui":"lA8h"}],"zoTV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var t=require("./constants");const e=(e,n)=>document.querySelector(`.${t.ICONS[e]}-icon`).classList.toggle("highlighted",n);function n(n){let s=0;document.querySelector(".buttons").addEventListener("click",function({target:c}){c.classList.contains("left-btn")?(e(s,!1),s=(2+s)%t.ICONS.length,e(s,!0)):c.classList.contains("right-btn")?(e(s,!1),s=(1+s)%t.ICONS.length,e(s,!0)):n(t.ICONS[s])})}
},{"./constants":"iJA9"}],"FyzG":[function(require,module,exports) {
"use strict";var e=u(require("./gameState")),t=n(require("./button")),r=require("./constants");function n(e){return e&&e.__esModule?e:{default:e}}function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(o=function(e){return e?r:t})(e)}function u(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=o(t);if(r&&r.has(e))return r.get(e);var n={},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var i=u?Object.getOwnPropertyDescriptor(e,a):null;i&&(i.get||i.set)?Object.defineProperty(n,a,i):n[a]=e[a]}return n.default=e,r&&r.set(e,n),n}async function a(){console.log("starting game"),(0,t.default)(e.handleUserAction);let n=Date.now();!function t(){const o=Date.now();n<=o&&(e.default.tick(),n=o+r.TICK_RATE),requestAnimationFrame(t)}()}a();
},{"./gameState":"Oo4C","./button":"zoTV","./constants":"iJA9"}]},{},["FyzG"], null)
//# sourceMappingURL=/init.e34763c5.js.map
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(e,n){var _="function"==typeof Symbol&&e[Symbol.iterator];if(!_)return e;var g,h,p=_.call(e),v=[];try{for(;(void 0===n||n-- >0)&&!(g=p.next()).done;)v.push(g.value)}catch(e){h={error:e}}finally{try{g&&!g.done&&(_=p.return)&&_.call(p)}finally{if(h)throw h.error}}return v}var e;!function(e){e[e.NotStarted=0]="NotStarted",e[e.Running=1]="Running",e[e.Stopped=2]="Stopped"}(e||(e={}));var n={type:"xstate.init"};function r(e){return void 0===e?[]:[].concat(e)}function i(e){return{type:"xstate.assign",assignment:e}}function o(e,n){return"string"==typeof(e="string"==typeof e&&n&&n[e]?n[e]:e)?{type:e}:"function"==typeof e?{type:e.name,exec:e}:e}function a(e){return function(n){return e===n}}function u(e){return"string"==typeof e?{type:e}:e}function c(e,n){return{value:e,context:n,actions:[],changed:!1,matches:a(e)}}function f(e,n,_){var g=n,h=!1;return[e.filter((function(e){if("xstate.assign"===e.type){h=!0;var n=Object.assign({},g);return"function"==typeof e.assignment?n=e.assignment(g,_):Object.keys(e.assignment).forEach((function(h){n[h]="function"==typeof e.assignment[h]?e.assignment[h](g,_):e.assignment[h]})),g=n,!1}return!0})),g,h]}function s(e,_){void 0===_&&(_={});var g=t(f(r(e.states[e.initial].entry).map((function(e){return o(e,_.actions)})),e.context,n),2),h=g[0],p=g[1],v={config:e,_options:_,initialState:{value:e.initial,actions:h,context:p,matches:a(e.initial)},transition:function(n,_){var g,h,p="string"==typeof n?{value:n,context:e.context}:n,S=p.value,d=p.context,y=u(_),m=e.states[S];if(m.on){var x=r(m.on[y.type]);try{for(var b=function(e){var n="function"==typeof Symbol&&Symbol.iterator,_=n&&e[n],g=0;if(_)return _.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&g>=e.length&&(e=void 0),{value:e&&e[g++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}(x),T=b.next();!T.done;T=b.next()){var j=T.value;if(void 0===j)return c(S,d);var N="string"==typeof j?{target:j}:j,I=N.target,w=N.actions,O=void 0===w?[]:w,X=N.cond,R=void 0===X?function(){return!0}:X,E=void 0===I,U=null!=I?I:S,$=e.states[U];if(R(d,y)){var C=t(f((E?r(O):[].concat(m.exit,O,$.entry).filter((function(e){return e}))).map((function(e){return o(e,v._options.actions)})),d,y),3),P=C[0],z=C[1],D=C[2],J=null!=I?I:S;return{value:J,context:z,actions:P,changed:I!==S||P.length>0||D,matches:a(J)}}}}catch(e){g={error:e}}finally{try{T&&!T.done&&(h=b.return)&&h.call(b)}finally{if(g)throw g.error}}}return c(S,d)}};return v}var l=function(e,n){return e.actions.forEach((function(_){var g=_.exec;return g&&g(e.context,n)}))};class _{constructor(e,n,_={}){this.namespace=e,this.storage=n,this.options=_,this._init()}_init(){if("performance"in globalThis&&this.options.clearOnReload){const e=globalThis.performance.getEntriesByType("navigation").map((e=>e.type));this.lastUpdated()&&e.includes("reload")&&this.removeState()}}setState(e){e?(this.storage.setItem(`${this.namespace}:state`,this._normalizeState(e)),this.storage.setItem(`${this.namespace}:lastUpdated`,(new Date).getTime().toString())):this.removeState()}_normalizeState(e){return"object"==typeof e&&this.options.saveState&&"function"==typeof this.options.saveState?JSON.stringify(this.options.saveState(e)):"string"!=typeof e?JSON.stringify(e):e}getState(){const e=this.storage.getItem(`${this.namespace}:state`);return e?JSON.parse(e):void 0}lastUpdated(){const e=this.storage.getItem(`${this.namespace}:lastUpdated`);return e?parseInt(e,10):void 0}removeState(){this.storage.removeItem(`${this.namespace}:state`),this.storage.removeItem(`${this.namespace}:lastUpdated`)}}function createPersist(e,n="session",g){return new _(e,"local"===n?globalThis.localStorage:globalThis.sessionStorage,g)}function wrapXStateService(e,n,_){const h={_xstateService:e,_getterCache:{},_persist:"string"==typeof _?createPersist(_):_,get status(){return this._xstateService?this._xstateService.status:g.INIT},get state(){return this._xstateService.state},subscribe(e){return this._xstateService.subscribe((()=>{this._getterCache={},this._persist&&this._xstateService.status===g.RUNNING&&this._persist.setState(this._xstateService.state),e()}))},send(e){this._xstateService.send(e)},start(){this._xstateService.start(this._persist?this._persist.getState():void 0)}};return n&&(h.getters=new Proxy(n,{get(e,n){if(!h._getterCache[n]){const _=e[n](h._xstateService.state.context);h._getterCache[n]=_}return h._getterCache[n]}})),h}const g=Object.freeze({INIT:-1,NOT_STARTED:0,RUNNING:1,STOPPED:2});function interpret(_,g,h){const p=wrapXStateService(function(_){var g=_.initialState,h=e.NotStarted,p=new Set,v={_machine:_,send:function(n){h===e.Running&&(g=_.transition(g,n),l(g,u(n)),p.forEach((function(e){return e(g)})))},subscribe:function(e){return p.add(e),e(g),{unsubscribe:function(){return p.delete(e)}}},start:function(p){if(p){var S="object"==typeof p?p:{context:_.config.context,value:p};g={value:S.value,actions:[],context:S.context,matches:a(S.value)}}else g=_.initialState;return h=e.Running,l(g,n),v},stop:function(){return h=e.Stopped,p.clear(),v},get state(){return g},get status(){return h}};return v}(_),g,h);return p}function createXStateService(e,n,_,g){const h=interpret(n,_,g);return globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.xstate=globalThis.__ficusjs__.xstate||{},globalThis.__ficusjs__.xstate[e]=h,h}function addXStateService(e,n){return globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.xstate=globalThis.__ficusjs__.xstate||{},globalThis.__ficusjs__.xstate[e]=n,n}function getXStateService(e){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.xstate&&globalThis.__ficusjs__.xstate[e])return globalThis.__ficusjs__.xstate[e]}export{g as XStateServiceStatus,addXStateService,i as assign,s as createMachine,createXStateService,getXStateService,interpret,wrapXStateService};

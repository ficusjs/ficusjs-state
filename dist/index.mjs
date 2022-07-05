class e{constructor(e,n,h={}){this.namespace=e,this.storage=n,this.options=h,this._init()}_init(){if("performance"in globalThis&&this.options.clearOnReload){const e=globalThis.performance.getEntriesByType("navigation").map((e=>e.type));this.lastUpdated()&&e.includes("reload")&&this.removeState()}}setState(e){e?(this.storage.setItem(`${this.namespace}:state`,this._normalizeState(e)),this.storage.setItem(`${this.namespace}:lastUpdated`,(new Date).getTime().toString())):this.removeState()}_normalizeState(e){return"object"==typeof e&&this.options.saveState&&"function"==typeof this.options.saveState?JSON.stringify(this.options.saveState(e)):"string"!=typeof e?JSON.stringify(e):e}getState(){const e=this.storage.getItem(`${this.namespace}:state`);return e?JSON.parse(e):void 0}lastUpdated(){const e=this.storage.getItem(`${this.namespace}:lastUpdated`);return e?parseInt(e,10):void 0}removeState(){this.storage.removeItem(`${this.namespace}:state`),this.storage.removeItem(`${this.namespace}:lastUpdated`)}}function createPersist(n,h="session",p){return new e(n,"local"===h?globalThis.localStorage:globalThis.sessionStorage,p)}function withStore(e,n){return{...n,created(){this._subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setStore(e),n.created&&n.created.call(this)},mounted(){this._subscribeToStores(!1),n.mounted&&n.mounted.call(this)},updated(){this._subscribeToStores(!1),n.updated&&n.updated.call(this)},removed(){this._unsubscribeFromStores(),n.removed&&n.removed.call(this)},setStore(e){this.store=e,this._subscribeToStores()},_subscribeToStores(e=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this._subscribeCallback),e&&this._subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach((e=>{this.store[e]&&this.store[e].subscribe&&"function"==typeof this.store[e].subscribe&&!this.unsubscribe[e]&&(this.unsubscribe[e]=this.store[e].subscribe(this._subscribeCallback))})),e&&this._subscribeCallback()}},_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach((e=>{this.unsubscribe[e]()})),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}}}function isPromise(e){return("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}class n{constructor(e){const n=this;n.state={},n.getterCache={},n.status="resting",n.transaction=!1,n.transactionCache={},n.callbacks=[],this._processActions(e);let h=e.initialState||{};if(n.copyOfInitialState=n._copyValue(h),n.ttl=-1,n.lastUpdatedState={},e.ttl&&(n.ttl=e.ttl,Object.keys(n.copyOfInitialState).forEach((e=>n.lastUpdatedState[e]=(new Date).getTime()))),e.persist){n.persist="string"==typeof e.persist?createPersist(e.persist):e.persist;const p=n.persist.getState(),b=n.persist.lastUpdated();p&&b&&(-1===n.ttl||n._lastUpdatedTimeDiff(b)<n.ttl)&&(h=p)}this._processState(h)}_processActions(e){const n=this,h=Object.keys(e);h.length&&h.forEach((h=>{n[h]||"function"!=typeof e[h]||(n[h]=e[h].bind(n))}))}_processState(e){const n=this;n.state=new Proxy(e,{set:(e,h,p)=>(n.transaction&&!n.transactionCache[h]&&(n.transactionCache[h]=n._copyValue(e[h])),e[h]=p,n.lastUpdatedState[h]=(new Date).getTime(),n.getterCache={},n.transaction||(n.persist&&n.persist.setState(n.state),n.status="resting",n._processCallbacks(n.state)),!0),get:(e,h)=>n.ttl>-1&&n._lastUpdatedTimeDiff(n.lastUpdatedState[h])>n.ttl?(n.persist&&n.persist.removeState(),n.copyOfInitialState[h]):e[h]})}_lastUpdatedTimeDiff(e){return Math.round((new Date).getTime()-e)}setState(e){const setter=e=>{if(!e||"object"!=typeof e)return;const n=this.transaction;n||(this.transactionCache={},this.transaction=!0);for(const n in e)this.state[n]&&this.state[n]===e[n]||(this.state[n]=e[n]);n||(this.transaction=!1,this.persist&&this.persist.setState(this.state),this._processCallbacks(this.state))},n=e(this.state);isPromise(n)?n.then(setter):setter(n)}getState(e){if(e&&("string"==typeof e||"function"==typeof e)){if(!this.getterCache[e]){let n;if("function"==typeof e)n=e(this.state);else{n=(Array.isArray(e)?e:e.match(/([^[.\]])+/g)).reduce(((e,n)=>e&&e[n]),this.state)}if(null==n)return;this.getterCache[e]=n}return this.getterCache[e]}}_processCallbacks(e){return!!this.callbacks.length&&(this.callbacks.forEach((n=>n(e))),!0)}subscribe(e){if("function"!=typeof e)throw new Error("Dude, you can only subscribe to store changes with a valid function");return this.callbacks.includes(e)||this.callbacks.push(e),()=>{this.callbacks=this.callbacks.filter((n=>n!==e))}}_copyValue(e){return e?JSON.parse(JSON.stringify(e)):e}clear(e=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.transaction=!0,this.status="clear";const n=this._copyValue(this.copyOfInitialState);for(const e in n)this.state[e]=n[e];this.transaction=!1,this.status="resting",e&&this._processCallbacks(this.state)}}function createAppState(e,h){let p=getAppState(e);return p||(p=new n(h),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.store=globalThis.__ficusjs__.store||{},globalThis.__ficusjs__.store[e]=p,p)}function getAppState(e){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.store&&globalThis.__ficusjs__.store[e])return globalThis.__ficusjs__.store[e]}class h{constructor(e){this.machine=e}get initialState(){return this.machine.initial||Object.keys(this.machine.states)[0]}transition(e,n){return this.machine.states[e].on[n]}}function createStateMachine(e){return new h(e)}function withLocalState(e){return{...e,created(){if(e.state&&"function"!=typeof e.state)throw new Error("State must be a function!");this._state=e.state||{},"function"==typeof this._state&&(this._state=this._state.bind(this)()),this.state=this._monitorState(this._state),this.setState=(e,n)=>{const setter=e=>{if(!e||"object"!=typeof e)return;const h=this.updated;n&&(this.updated=()=>{n(),this.updated=h||void 0}),this.status="transaction";for(const n in e)this.state[n]&&this.state[n]===e[n]||(this.state[n]=e[n]);this.status="render",this._processRender()},h=e(this.state);isPromise(h)?h.then(setter):setter(h)},e.created&&e.created.call(this)},_monitorState(e){const n=this;return new Proxy(e,{set:(e,h,p)=>(e[h]===p||(e[h]=p,n.computedCache={},"render"===n.status&&n._processRender()),!0)})}}}function withStateMachine(e,n){return{...n,created(){this._stateMachineDefinition=e,this._stateMachine=createStateMachine(e),this.initialState=this._stateMachine.initialState,this.state={context:{},matches(e){return e===this.value},value:this.initialState},this.setState=(e,n)=>{if(!e||"object"!=typeof e)return;const h=this.updated;n&&(this.updated=()=>{n.call(this),this.updated=h||void 0}),this.status="transaction";for(const n in e)"value"===n?this.state[n]=e[n]:this.state.context[n]&&this.state.context[n]===e[n]||(this.state.context[n]=e[n]);this.status="render",this._processRender()},n.created&&n.created.call(this)},send(e){let n,h;if("string"==typeof e)n=e;else{const{type:p,...b}=e;n=p,h=b}const{value:p}=this.state,b=this._stateMachine.transition(p,n)||p,_="object"==typeof b&&b.target?b.target:b,S="object"==typeof b&&b.action?b.action:b,d=this._stateMachineDefinition.actions&&this._stateMachineDefinition.actions[S]?()=>this._stateMachineDefinition.actions[S].call(this,h):()=>{};this.setState({value:_},d)}}}function withXStateService(e,n){return{...n,created(){this._subscribeCallback=()=>{this.computedCache={},this._processRender()},this._setupService(e),n.created&&n.created.call(this)},send(e){this.fsmService.send(e)},mounted(){this._subscribeToFsmService(!1),n.mounted&&n.mounted.call(this)},updated(){this._subscribeToFsmService(!1),n.updated&&n.updated.call(this)},removed(){this._unsubscribeFromFsmService(),n.removed&&n.removed.call(this)},_wrapXStateService:()=>({_xstateService:e}),_setupService(e){if(e=e._xstateService?e:this._wrapXStateService(e),this.fsmService=e,e&&e._xstateService&&e._xstateService.subscribe&&"function"==typeof e._xstateService.subscribe){const n={state:void 0};e.getters&&(n.getters=e.getters),this.fsmSubscriptionCallback=e=>{this.fsm.state=e,this._subscribeCallback()},this.fsm=n,this.send=e=>this.fsmService._xstateService.send(e),this._subscribeToFsmService()}},_startFsmService(){this.fsmService&&this.fsmService._xstateService&&this.fsmSubscription&&0===this.fsmService._xstateService.status&&this.fsmService._xstateService.start()},_subscribeToFsmService(e=!0){this.fsmService&&this.fsmService._xstateService&&this.fsmService._xstateService.subscribe&&"function"==typeof this.fsmService._xstateService.subscribe&&!this.fsmSubscription&&(this.fsmSubscription=this.fsmService._xstateService.subscribe(this.fsmSubscriptionCallback),e&&this.fsmSubscriptionCallback(),this._startFsmService())},_unsubscribeFromFsmService(){this.fsmService&&this.fsmService._xstateService&&this.fsmSubscription&&"function"==typeof this.fsmSubscription&&(this.fsmSubscription(),this.fsmSubscription=null)}}}function withWorkerStore(e,n){return{...n,created(){if(this.worker=e,globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.workers=globalThis.__ficusjs__.workers||new Map,globalThis.__ficusjs__.workers.has(e)){const n=globalThis.__ficusjs__.workers.get(e);n.has(this)||n.add(this)}else{const n=new Set;n.add(this),globalThis.__ficusjs__.workers.set(e,n)}e.onmessage||(this.worker.onmessage=n=>{const h=globalThis.__ficusjs__.workers.get(e);for(const e of h)e.state=n.data,e.computedCache={},e._processRender.apply(e)}),n.created&&n.created.call(this)},dispatch(e,n){this.worker.postMessage({actionName:e,payload:n})}}}
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
***************************************************************************** */function t(e,n){var h="function"==typeof Symbol&&e[Symbol.iterator];if(!h)return e;var p,b,_=h.call(e),S=[];try{for(;(void 0===n||n-- >0)&&!(p=_.next()).done;)S.push(p.value)}catch(e){b={error:e}}finally{try{p&&!p.done&&(h=_.return)&&h.call(_)}finally{if(b)throw b.error}}return S}var p;!function(e){e[e.NotStarted=0]="NotStarted",e[e.Running=1]="Running",e[e.Stopped=2]="Stopped"}(p||(p={}));var b={type:"xstate.init"};function r(e){return void 0===e?[]:[].concat(e)}function i(e){return{type:"xstate.assign",assignment:e}}function o(e,n){return"string"==typeof(e="string"==typeof e&&n&&n[e]?n[e]:e)?{type:e}:"function"==typeof e?{type:e.name,exec:e}:e}function a(e){return function(n){return e===n}}function u(e){return"string"==typeof e?{type:e}:e}function c(e,n){return{value:e,context:n,actions:[],changed:!1,matches:a(e)}}function f(e,n,h){var p=n,b=!1;return[e.filter((function(e){if("xstate.assign"===e.type){b=!0;var n=Object.assign({},p);return"function"==typeof e.assignment?n=e.assignment(p,h):Object.keys(e.assignment).forEach((function(b){n[b]="function"==typeof e.assignment[b]?e.assignment[b](p,h):e.assignment[b]})),p=n,!1}return!0})),p,b]}function s(e,n){void 0===n&&(n={});var h=t(f(r(e.states[e.initial].entry).map((function(e){return o(e,n.actions)})),e.context,b),2),p=h[0],_=h[1],S={config:e,_options:n,initialState:{value:e.initial,actions:p,context:_,matches:a(e.initial)},transition:function(n,h){var p,b,_="string"==typeof n?{value:n,context:e.context}:n,d=_.value,m=_.context,g=u(h),y=e.states[d];if(y.on){var x=r(y.on[g.type]);try{for(var w=function(e){var n="function"==typeof Symbol&&Symbol.iterator,h=n&&e[n],p=0;if(h)return h.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&p>=e.length&&(e=void 0),{value:e&&e[p++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}(x),k=w.next();!k.done;k=w.next()){var T=k.value;if(void 0===T)return c(d,m);var j="string"==typeof T?{target:T}:T,C=j.target,O=j.actions,M=void 0===O?[]:O,U=j.cond,D=void 0===U?function(){return!0}:U,E=void 0===C,F=null!=C?C:d,I=e.states[F];if(D(m,g)){var R=t(f((E?r(M):[].concat(y.exit,M,I.entry).filter((function(e){return e}))).map((function(e){return o(e,S._options.actions)})),m,g),3),A=R[0],N=R[1],P=R[2],X=null!=C?C:d;return{value:X,context:N,actions:A,changed:C!==d||A.length>0||P,matches:a(X)}}}}catch(e){p={error:e}}finally{try{k&&!k.done&&(b=w.return)&&b.call(w)}finally{if(p)throw p.error}}}return c(d,m)}};return S}var l=function(e,n){return e.actions.forEach((function(h){var p=h.exec;return p&&p(e.context,n)}))};function v(e){var n=e.initialState,h=p.NotStarted,_=new Set,S={_machine:e,send:function(b){h===p.Running&&(n=e.transition(n,b),l(n,u(b)),_.forEach((function(e){return e(n)})))},subscribe:function(e){return _.add(e),e(n),{unsubscribe:function(){return _.delete(e)}}},start:function(_){if(_){var d="object"==typeof _?_:{context:e.config.context,value:_};n={value:d.value,actions:[],context:d.context,matches:a(d.value)}}else n=e.initialState;return h=p.Running,l(n,b),S},stop:function(){return h=p.Stopped,_.clear(),S},get state(){return n},get status(){return h}};return S}function interpret(e,n){const h={_xstateService:v(e)};return n?function(e,n){return e._getterCache={},e.getters=new Proxy(n,{get(n,h){if(!e._getterCache[h]){const p=n[h](e._xstateService.state.context);e._getterCache[h]=p}return e._getterCache[h]}}),e}(h,n):h}function createXStateService(e,n,h){return interpret(s(e,n),h)}export{e as BasePersist,n as Store,i as assign,createAppState,s as createMachine,createPersist,createStateMachine,createXStateService,getAppState,interpret,withLocalState,withStateMachine,withStore,withWorkerStore,withXStateService};

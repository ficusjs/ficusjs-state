class t{constructor(t,s,e={}){this.namespace=t,this.storage=s,this.options=e,this._init()}_init(){if("performance"in globalThis&&this.options.clearOnReload){const t=globalThis.performance.getEntriesByType("navigation").map((t=>t.type));this.lastUpdated()&&t.includes("reload")&&this.removeState()}}setState(t){t?(this.storage.setItem(`${this.namespace}:state`,this._normalizeState(t)),this.storage.setItem(`${this.namespace}:lastUpdated`,(new Date).getTime().toString())):this.removeState()}_normalizeState(t){return"object"==typeof t&&this.options.saveState&&"function"==typeof this.options.saveState?JSON.stringify(this.options.saveState(t)):"string"!=typeof t?JSON.stringify(t):t}getState(){const t=this.storage.getItem(`${this.namespace}:state`);return t?JSON.parse(t):void 0}lastUpdated(){const t=this.storage.getItem(`${this.namespace}:lastUpdated`);return t?parseInt(t,10):void 0}removeState(){this.storage.removeItem(`${this.namespace}:state`),this.storage.removeItem(`${this.namespace}:lastUpdated`)}}function createPersist(s,e="session",i){return new t(s,"local"===e?globalThis.localStorage:globalThis.sessionStorage,i)}function withStore(t,s){return{...s,created(){this.subscribeCallback=()=>{this.computedCache={},this._processRender()},this.setStore(t),s.created&&s.created.call(this)},mounted(){this._subscribeToStores(!1),s.mounted&&s.mounted.call(this)},updated(){this._subscribeToStores(!1),s.updated&&s.updated.call(this)},removed(){this._unsubscribeFromStores(),s.removed&&s.removed.call(this)},setStore(t){this.store=t,this._subscribeToStores()},_subscribeToStores(t=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this.subscribeCallback),t&&this.subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach((t=>{this.store[t]&&this.store[t].subscribe&&"function"==typeof this.store[t].subscribe&&!this.unsubscribe[t]&&(this.unsubscribe[t]=this.store[t].subscribe(this.subscribeCallback))})),t&&this.subscribeCallback()}},_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach((t=>{this.unsubscribe[t]()})),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}}}function isPromise(t){return("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then}class s{constructor(t){const s=this;s.state={},s.getterCache={},s.status="resting",s.transaction=!1,s.transactionCache={},s.callbacks=[],this._processActions(t);let e=t.initialState||{};if(s.copyOfInitialState=s._copyValue(e),s.ttl=-1,s.lastUpdatedState={},t.ttl&&(s.ttl=t.ttl,Object.keys(s.copyOfInitialState).forEach((t=>s.lastUpdatedState[t]=(new Date).getTime()))),t.persist){s.persist="string"==typeof t.persist?createPersist(t.persist):t.persist;const i=s.persist.getState(),a=s.persist.lastUpdated();i&&a&&(-1===s.ttl||s._lastUpdatedTimeDiff(a)<s.ttl)&&(e=i)}this._processState(e)}_processActions(t){const s=this,e=Object.keys(t);e.length&&e.forEach((e=>{s[e]||"function"!=typeof t[e]||(s[e]=t[e].bind(s))}))}_processState(t){const s=this;s.state=new Proxy(t,{set:(t,e,i)=>(s.transaction&&!s.transactionCache[e]&&(s.transactionCache[e]=s._copyValue(t[e])),t[e]=i,s.lastUpdatedState[e]=(new Date).getTime(),s.getterCache={},s.transaction||(s.persist&&s.persist.setState(s.state),s.status="resting",s._processCallbacks(s.state)),!0),get:(t,e)=>s.ttl>-1&&s._lastUpdatedTimeDiff(s.lastUpdatedState[e])>s.ttl?(s.persist&&s.persist.removeState(),s.copyOfInitialState[e]):t[e]})}_lastUpdatedTimeDiff(t){return Math.round((new Date).getTime()-t)}setState(t){const setter=t=>{if(!t||"object"!=typeof t)return;const s=this.transaction;s||(this.transactionCache={},this.transaction=!0);for(const s in t)this.state[s]&&this.state[s]===t[s]||(this.state[s]=t[s]);s||(this.transaction=!1,this.persist&&this.persist.setState(this.state),this._processCallbacks(this.state))},s=t(this.state);isPromise(s)?s.then(setter):setter(s)}getState(t){if(t){if(!this.getterCache[t]){const s=(Array.isArray(t)?t:t.match(/([^[.\]])+/g)).reduce(((t,s)=>t&&t[s]),this.state);if(null==s)return;this.getterCache[t]=s}return this.getterCache[t]}}_processCallbacks(t){return!!this.callbacks.length&&(this.callbacks.forEach((s=>s(t))),!0)}subscribe(t){if("function"!=typeof t)throw new Error("Dude, you can only subscribe to store changes with a valid function");return this.callbacks.push(t),()=>{this.callbacks=this.callbacks.filter((s=>s!==t))}}_copyValue(t){return t?JSON.parse(JSON.stringify(t)):t}clear(t=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.transaction=!0,this.status="clear";const s=this._copyValue(this.copyOfInitialState);for(const t in s)this.state[t]=s[t];this.transaction=!1,this.status="resting",t&&this._processCallbacks(this.state)}}function createAppState(t,e){let i=getAppState(t);return i||(i=new s(e),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.store=globalThis.__ficusjs__.store||{},globalThis.__ficusjs__.store[t]=i,i)}function getAppState(t){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.store&&globalThis.__ficusjs__.store[t])return globalThis.__ficusjs__.store[t]}class e{constructor(t){this.machine=t}get initialState(){return this.machine.initial||Object.keys(this.machine.states)[0]}transition(t,s){return this.machine.states[t].on[s]}}function createStateMachine(t){return new e(t)}function withLocalState(t){return{...t,created(){if(t.state&&"function"!=typeof t.state)throw new Error("State must be a function!");this._state=t.state||{},"function"==typeof this._state&&(this._state=this._state.bind(this)()),this.state=this._monitorState(this._state),this.setState=(t,s)=>{const setter=t=>{if(!t||"object"!=typeof t)return;const e=this.updated;s&&(this.updated=()=>{s(),this.updated=e||void 0}),this.status="transaction";for(const s in t)this.state[s]&&this.state[s]===t[s]||(this.state[s]=t[s]);this.status="render",this._processRender()},e=t(this.state);isPromise(e)?e.then(setter):setter(e)},t.created&&t.created.call(this)},_monitorState(t){const s=this;return new Proxy(t,{set:(t,e,i)=>(t[e]===i||(t[e]=i,s.computedCache={},"render"===s.status&&s._processRender()),!0)})}}}function withStateMachine(t,s){return{...s,created(){this._stateMachineDefinition=t,this._stateMachine=createStateMachine(t),this.initialState=this._stateMachine.initialState,this.state={context:{},matches(t){return t===this.value},value:this.initialState},this.setState=(t,s)=>{if(!t||"object"!=typeof t)return;const e=this.updated;s&&(this.updated=()=>{s.call(this),this.updated=e||void 0}),this.status="transaction";for(const s in t)"value"===s?this.state[s]=t[s]:this.state.context[s]&&this.state.context[s]===t[s]||(this.state.context[s]=t[s]);this.status="render",this._processRender()},s.created&&s.created.call(this)},send(t){let s,e;if("string"==typeof t)s=t;else{const{type:i,...a}=t;s=i,e=a}const{value:i}=this.state,a=this._stateMachine.transition(i,s)||i,r="object"==typeof a&&a.target?a.target:a,c="object"==typeof a&&a.action?a.action:a,o=this._stateMachineDefinition.actions&&this._stateMachineDefinition.actions[c]?()=>this._stateMachineDefinition.actions[c].call(this,e):()=>{};this.setState({value:r},o)}}}function withXStateService(t,s){return{...s,created(){this._setupService(t),s.created&&s.created.call(this)},send(t){this.service.send(t)},mounted(){this._startService(),s.mounted&&s.mounted.call(this)},updated(){this._startService(),s.updated&&s.updated.call(this)},removed(){this._stopService(),s.removed&&s.removed.call(this)},_setupService(t){this.service=t,this.subscription=t.subscribe((t=>{this.state=t,this.computedCache={},this._processRender()})),this._startService()},_startService(){this.service&&this.subscription&&"Running"!==this.service.status&&this.service.start()},_stopService(){this.service&&this.subscription&&"Running"===this.service.status&&this.service.stop()}}}function withWorkerStore(t,s){return{...s,created(){if(this.worker=t,globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.workers=globalThis.__ficusjs__.workers||new Map,globalThis.__ficusjs__.workers.has(t)){const s=globalThis.__ficusjs__.workers.get(t);s.has(this)||s.add(this)}else{const s=new Set;s.add(this),globalThis.__ficusjs__.workers.set(t,s)}t.onmessage||(this.worker.onmessage=s=>{const e=globalThis.__ficusjs__.workers.get(t);for(const t of e)t.state=s.data,t.computedCache={},t._processRender.apply(t)}),s.created&&s.created.call(this)},dispatch(t,s){this.worker.postMessage({actionName:t,payload:s})}}}export{t as BasePersist,s as Store,createAppState,createPersist,createStateMachine,getAppState,withLocalState,withStateMachine,withStore,withWorkerStore,withXStateService};

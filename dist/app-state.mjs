class t{constructor(t,s,e={}){this.namespace=t,this.storage=s,this.options=e,this._init()}_init(){if("performance"in globalThis&&this.options.clearOnReload){const t=globalThis.performance.getEntriesByType("navigation").map((t=>t.type));this.lastUpdated()&&t.includes("reload")&&this.removeState()}}setState(t){t?(this.storage.setItem(`${this.namespace}:state`,this._normalizeState(t)),this.storage.setItem(`${this.namespace}:lastUpdated`,(new Date).getTime().toString())):this.removeState()}_normalizeState(t){return"object"==typeof t&&this.options.saveState&&"function"==typeof this.options.saveState?JSON.stringify(this.options.saveState(t)):"string"!=typeof t?JSON.stringify(t):t}getState(){const t=this.storage.getItem(`${this.namespace}:state`);return t?JSON.parse(t):void 0}lastUpdated(){const t=this.storage.getItem(`${this.namespace}:lastUpdated`);return t?parseInt(t,10):void 0}removeState(){this.storage.removeItem(`${this.namespace}:state`),this.storage.removeItem(`${this.namespace}:lastUpdated`)}}function createPersist(s,e="session",i){return new t(s,"local"===e?globalThis.localStorage:globalThis.sessionStorage,i)}function withStore(t,s){return{...s,created(){this._subscribeCallback=()=>{this.computedCache={},this.isCreatedCalled&&this._processRender()},this.setStore(t),s.created&&s.created.call(this)},mounted(){this._subscribeToStores(!1),s.mounted&&s.mounted.call(this)},updated(){this._subscribeToStores(!1),s.updated&&s.updated.call(this)},removed(){this._unsubscribeFromStores(),s.removed&&s.removed.call(this)},setStore(t){this.store=t,this._subscribeToStores()},_subscribeToStores(t=!0){if(this.store&&this.store.subscribe&&"function"==typeof this.store.subscribe&&!this.unsubscribe)this.unsubscribe=this.store.subscribe(this._subscribeCallback),t&&this._subscribeCallback();else if(this.store&&"object"==typeof this.store&&!this.store.subscribe){this.unsubscribe={};Object.keys(this.store).forEach((t=>{this.store[t]&&this.store[t].subscribe&&"function"==typeof this.store[t].subscribe&&!this.unsubscribe[t]&&(this.unsubscribe[t]=this.store[t].subscribe(this._subscribeCallback))})),t&&this._subscribeCallback()}},_unsubscribeFromStores(){if(this.store&&this.unsubscribe&&"object"==typeof this.unsubscribe){Object.keys(this.unsubscribe).forEach((t=>{this.unsubscribe[t]()})),this.unsubscribe=null}else this.store&&this.unsubscribe&&"function"==typeof this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}}}class s{constructor(t){const s=this;s.state={},s.getterCache={},s.status="resting",s.transaction=!1,s.transactionCache={},s.callbacks=[],this._processActions(t);let e=t.initialState||{};if(s.copyOfInitialState=s._copyValue(e),s.ttl=-1,s.lastUpdatedState={},t.ttl&&(s.ttl=t.ttl,Object.keys(s.copyOfInitialState).forEach((t=>s.lastUpdatedState[t]=(new Date).getTime()))),s.persist=void 0,t.persist){s.persist="string"==typeof t.persist?createPersist(t.persist):t.persist;const i=s.persist.getState(),a=s.persist.lastUpdated();i&&a&&(-1===s.ttl||s._lastUpdatedTimeDiff(a)<s.ttl)&&(e=i)}this._processState(e)}_processActions(t){const s=this,e=Object.keys(t);e.length&&e.forEach((e=>{s[e]||"function"!=typeof t[e]||(s[e]=t[e].bind(s))}))}_processState(t){const s=this;s.state=new Proxy(t,{set:(t,e,i)=>(s.transaction&&!s.transactionCache[e]&&(s.transactionCache[e]=s._copyValue(t[e])),t[e]=i,s.lastUpdatedState[e]=(new Date).getTime(),s.getterCache={},s.transaction||(s.persist&&s.persist.setState(s.state),s.status="resting",s._processCallbacks(s.state)),!0),get:(t,e)=>s.ttl>-1&&s._lastUpdatedTimeDiff(s.lastUpdatedState[e])>s.ttl?(s.persist&&s.persist.removeState(),s.copyOfInitialState[e]):t[e]})}_lastUpdatedTimeDiff(t){return Math.round((new Date).getTime()-t)}setState(t){const setter=t=>{if(!t||"object"!=typeof t)return;const s=this.transaction;s||(this.transactionCache={},this.transaction=!0);for(const s in t)this.state[s]&&this.state[s]===t[s]||(this.state[s]=t[s]);s||(this.transaction=!1,this.persist&&this.persist.setState(this.state),this._processCallbacks(this.state))},s=t(this.state);var e;"object"!=typeof(e=s)&&"function"!=typeof e||"function"!=typeof e.then?setter(s):s.then(setter)}getState(t){if(t&&("string"==typeof t||"function"==typeof t)){if(!this.getterCache[t]){let s;if("function"==typeof t)s=t(this.state);else{s=(Array.isArray(t)?t:t.match(/([^[.\]])+/g)).reduce(((t,s)=>t&&t[s]),this.state)}if(null==s)return;this.getterCache[t]=s}return this.getterCache[t]}}_processCallbacks(t){return!!this.callbacks.length&&(this.callbacks.forEach((s=>s(t))),!0)}subscribe(t){if("function"!=typeof t)throw new Error("Dude, you can only subscribe to store changes with a valid function");return this.callbacks.includes(t)||this.callbacks.push(t),()=>{this.callbacks=this.callbacks.filter((s=>s!==t))}}_copyValue(t){return t?JSON.parse(JSON.stringify(t)):t}clear(t=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.transaction=!0,this.status="clear";const s=this._copyValue(this.copyOfInitialState);for(const t in s)this.state[t]=s[t];this.transaction=!1,this.status="resting",t&&this._processCallbacks(this.state)}}function createAppState(t,e){let i=getAppState(t);return i||(i=new s(e),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.store=globalThis.__ficusjs__.store||{},globalThis.__ficusjs__.store[t]=i,i)}function getAppState(t){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.store&&globalThis.__ficusjs__.store[t])return globalThis.__ficusjs__.store[t]}export{createAppState,createPersist,getAppState,withStore};
//# sourceMappingURL=app-state.mjs.map

function withWorkerStore(s,e){return{...e,created(){if(this.worker=s,globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.workers=globalThis.__ficusjs__.workers||new Map,globalThis.__ficusjs__.workers.has(s)){const e=globalThis.__ficusjs__.workers.get(s);e.has(this)||e.add(this)}else{const e=new Set;e.add(this),globalThis.__ficusjs__.workers.set(s,e)}s.onmessage||(this.worker.onmessage=e=>{const o=globalThis.__ficusjs__.workers.get(s);for(const s of o)s.state=e.data,s.computedCache={},s._processRender.apply(s)})},dispatch(s,e){this.worker.postMessage({actionName:s,payload:e})}}}export{withWorkerStore};

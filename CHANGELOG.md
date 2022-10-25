# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.3.2] - 2022-10-25

### Updates
- Uplift devDependencies

## [3.3.1] - 2022-10-19

### Updates
- Uplift @ficusjs/core to v1.4.1
- Uplift devDependencies

## [3.3.0] - 2022-10-02

### Updates
- Uplift XState to v4.33.6
- Uplift devDependencies

## [3.2.1] - 2022-07-22

### Fixes
- Fix missing `XStateServiceStatus` export

## [3.2.0] - 2022-07-22

### Updates
- Add `persist` argument to `interpret`, `createXStateService` and `wrapXStateService` functions

## [3.1.1] - 2022-07-15

### Fixes
- Fix invalid state machine types

## [3.1.0] - 2022-07-15

### New
- Add `addXStateService` function for registering XState services that can be retrieved by `getXStateService` function.

## [3.0.2] - 2022-07-08

### Fixes
- Fix getter cache issue

## [3.0.1] - 2022-07-07

### Fixes
- Fix missing types

## [3.0.0] - 2022-07-06

### Breaking change
- Update component `fsm` instance for finite state machines
  - move `send` method to `fsm` instance
  - add `status` to fsm instance
  - `fsm` instance is now a decorated XState service
- Create worker store instances in components using `store` property
  - `withWorkerStore` results in creation of `store` instance within components
  - worker store dispatches called through the `store` instance

### Updates
- `withXStateService` function can except a full XState instance or one created with `createXStateService` function
- Add `assign`, `createMachine`, `interpret` exports from the `@xstate/fsm` package

### New
- Add `xstate-service` package export based on `@xstate/fsm`
- Add `createXStateService` function for registering global state machines
- Add `getXStateService` function for retrieving global state machines
- The `interpret` and `createXStateService` functions can accept getters for returning projections on extended state context

## [2.0.0] - 2022-06-05

### Breaking change
- Update `@xstate/fsm` to v2.0.0
- Update `xstate` to v4.32.1
- Uplift devDependencies

## [1.6.0] - 2022-02-22

### Updates
- Allow functions to be passed to `getState`
- Memoize `getState` function return values

## [1.5.0] - 2022-02-16

### Updates
- Check for store callback subscription
- Uplift devDependencies

## [1.4.0] - 2021-12-17

### Updates
- Add `options` to `createPersist`
- Export BasePersist class
- Add `persist` to export map

## [1.3.0] - 2021-10-20

### Updates
- Add `sideEffects` to package.json
- Uplift devDependencies

## [1.2.1] - 2021-07-22

### Fixes
- Fix issue with `created` not being called in `withWorkerStore` function

## [1.2.0] - 2021-07-17

### New
- Add iife build for creating app state in web workers - `worker-app-state.iife.js`
- Add `withWorkerStore` function for using stores created in web workers

## [1.1.1] - 2021-07-10

### Fixes
- Fix missing Store export
- Uplift NPM packages

## [1.1.1] - 2021-05-23

### Fixes
- Fix missing types

## [1.1.0] - 2021-05-23

### New
- Ability to pass an object as a state value that contains `{ target: 'nextState', action: 'actionNameToInvoke' }

## [1.0.1] - 2021-05-16

### Fixes
- Fix missing types index

## [1.0.0] - 2021-05-16

- Initial release

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2022-06-05

### Updates
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

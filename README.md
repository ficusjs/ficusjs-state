# FicusJS state

FicusJS state provides a set of functions for extending components to use
finite state machines and statecharts (behaviour) or stores (data) for managing application state.

Components can react to state changes and update their UI accordingly.

For documentation visit:

- [State machines](https://docs.ficusjs.org/state-machines/)
- [Stores](https://docs.ficusjs.org/app-state/)

## Installation

FicusJS state is part of [FicusJS](https://docs.ficusjs.org) but can also be installed independently in a number of ways.

### CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import {
    XStateServiceStatus,
    addXStateService,
    assign,
    BasePersist,
    createAppState,
    createMachine,
    createPersist,
    createStateMachine,
    createXStateService,
    getAppState,
    getXStateService,
    interpret,
    Store,
    withLocalState,
    withStateMachine,
    withStore,
    withWorkerStore,
    withXStateService,
    wrapXStateService
  } from 'https://cdn.skypack.dev/@ficusjs/state'
</script>
```

FicusJS state is available on [Skypack](https://www.skypack.dev/view/@ficusjs/state).

### NPM

FicusJS state works nicely with build tools such as Snowpack, Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```bash
npm install @ficusjs/state
```

### Available builds

FicusJS state only provides ES module builds. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

## Development

How to set-up FicusJS state for local development.

1. Clone the repository:

```bash
git clone https://github.com/ficusjs/ficusjs-state.git
```

2. Change the working directory

```bash
cd ficusjs-state
```

3. Install dependencies

```bash
npm install
```

4. Run the local development server

```bash
npm run dev
```

That's it! Now open http://localhost:8080 to see a local app.

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Contributing to FicusJS state

Any kind of positive contribution is welcome! Please help us to grow by contributing to the project.

If you wish to contribute, you can work on any features you think would enhance the library. After adding your code, please send us a Pull Request.

> Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests to us.

## Support

We all need support and motivation. FicusJS is not an exception. Please give this project a ⭐️ to encourage and show that you liked it. Don't forget to leave a star ⭐️ before you move away.

If you found the library helpful, please consider [sponsoring us](https://github.com/sponsors/ficusjs).


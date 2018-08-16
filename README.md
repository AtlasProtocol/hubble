# Atlasp-Hubble 

Hubble is a development environment, testing framework for Nebulas smart contracts, aiming to make Nebulas developers' life easier. With Atlasp-Hubble, you get:

- Convenient contract Javascript code unit testing with [Jest](https://jestjs.io/) with test coverage report.
- Mocking environment contracts deployment and function call testing.

## Install

$ npm install -g atlasp-hubble

## Quick Usage

For a default set of contracts and tests, run the following within an empty project directory:

	$ mkdir test & cd test
	$ atlasp-hubble init
	$ ls
	contracts		init.js			package-lock.json	run
	hubble.js		node_modules		package.json		test

You can put:

- contract source files under `contracts` folder
- function testing files under `run` folder
- jest tests under `test` folder.

There are example files under those folder after you run init and you can replace them your codes or files.
For unit testing, check out how to write unit tests for Javascript at [Jest document site](https://jestjs.io/docs/en/getting-started).

Now, you can run:
- `atlasp-hubble deploy` to deploy your contracts.
- `atlasp-hubble exec` to call functions of the contracts and test functions of contracts.
- `atlasp-hubble test` to run associated unit tests.

## For Developer

### Install

	npm install -g lerna
	npm install -g yarn
	lerna bootstrap
	cd packages/hubble
	npm run build

## License
MIT

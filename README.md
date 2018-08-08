Atlasp-Hubble is a development environment, testing framework for Nebulas, aiming to make life as an Nebulas developer easier. With Atlasp-Hubble, you get:

Automated contract testing with Jest.
Mock up contracts deployment and function testing.

Install

$ npm install -g atlasp-hubble

Quick Usage

For a default set of contracts and tests, run the following within an empty project directory:

$ atlasp-hubble init
You can put contract source file under 'contracts' folder, function testing file under 'run' folder and jest testing file under 'test' folder.
There are example files under those folder after you run init and you can replace them your files.
Find out more about how to write jest unite test file via https://jestjs.io/docs/en/using-matchers.

From there, you can run atlasp-hubble deploy, atlasp-hubble exec and atlasp-hubble test to deploy your contracts, test functions of contracts, and run their associated unit tests.

Development

# Install
npm install -g lerna
npm install -g yarn
lerna bootstrap

go to packages/hubble
npm run build

License
MIT
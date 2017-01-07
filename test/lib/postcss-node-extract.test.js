/* eslint-env node, mocha */
import { expect } from 'chai';

import postcssNodeExtract from '../../js/lib/postcss-node-extract';

/** @test {postcssNodeExtract} */
describe(`postcssNodeExtract`, () => {
  it(`should be a function`, () => {
    expect(typeof postcssNodeExtract).to.equal(`function`);
  });

  it(`should return a postcss plugin named "postcss-node-extract"`, () => {
    // eslint-disable-next-line no-unused-expressions
    expect(postcssNodeExtract().postcss).to.not.be.undefined;
    expect(postcssNodeExtract().postcss.postcssPlugin).to.equal(`postcss-node-extract`);
  });
});

import postcssNodeExtract = require('../../src/lib/postcss-node-extract');

describe(`postcssNodeExtract()`, () => {
  test(`It should be a function.`, () => {
    expect(typeof postcssNodeExtract).toBe(`function`);
  });

  test(`It should return a postcss plugin named "postcss-node-extract".`, () => {
    expect(postcssNodeExtract().postcss).toBeDefined();
    expect(postcssNodeExtract().postcss.postcssPlugin).toBe(`postcss-node-extract`);
  });
});

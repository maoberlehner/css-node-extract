const expect = require(`chai`).expect;

const postcssNodeExtract = require(`../../dist/lib/postcss-node-extract`);

/** @test {postcssNodeExtract} */
describe(`postcssNodeExtract`, () => {
  it(`should be a function`, () => {
    expect(typeof postcssNodeExtract).to.equal(`function`);
  });

  it(`should return a postcss plugin named "postcss-node-extract"`, () => {
    expect(postcssNodeExtract().postcss).to.not.be.undefined;
    expect(postcssNodeExtract().postcss.postcssPlugin).to.equal(`postcss-node-extract`);
  });
});

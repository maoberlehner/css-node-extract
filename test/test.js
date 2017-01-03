/* eslint-env node, mocha */
const CssFilterExtract = require(`../`);
const expect = require(`chai`).expect;
const fs = require(`fs`);
// const postcssScssSyntax = require(`postcss-scss`);

// const postcssFilterExtract = require(`../dist/lib/postcss-filter-extract.js`);

/** @test {CssFilterExtract} */
describe(`CssFilterExtract`, () => {
  const scss = fs.readFileSync(`test/css/test.scss`, { encoding: `utf8` });

  it(`should be a function`, () => {
    expect(typeof CssFilterExtract).to.equal(`function`);
  });

  /** @test {CssFilterExtract.process} */
  describe(`process()`, () => {
    it(`should be a function`, () => {
      expect(typeof CssFilterExtract.process).to.equal(`function`);
    });

    it(`should extract only at-rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/at-rules.scss`, {
        encoding: `utf8`,
      });
      const filterName = `at-rules`;
      return CssFilterExtract.process(scss, filterName)
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`should extract only mixin at-rules and variable declarations`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/combined.scss`, {
        encoding: `utf8`,
      });
      const filterNames = [`mixins`, `variables`];
      return CssFilterExtract.process(scss, filterNames)
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`should extract only declaration rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/declarations.scss`, {
        encoding: `utf8`,
      });
      const filterName = `declarations`;
      return CssFilterExtract.process(scss, filterName)
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`should extract only mixin at-rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/mixins.scss`, {
        encoding: `utf8`,
      });
      const filterName = `mixins`;
      return CssFilterExtract.process(scss, filterName)
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`should extract only rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/rules.scss`, {
        encoding: `utf8`,
      });
      const filterName = `rules`;
      return CssFilterExtract.process(scss, filterName)
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`should extract only silent rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/silent.scss`, {
        encoding: `utf8`,
      });
      const filterName = `silent`;
      return CssFilterExtract.process(scss, filterName)
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`should extract only variable rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/variables.scss`, {
        encoding: `utf8`,
      });
      const filterName = `variables`;
      return CssFilterExtract.process(scss, filterName)
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`should extract only keyframes at-rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/keyframes.scss`, {
        encoding: `utf8`,
      });
      const filterName = `custom`;
      const customFilter = [{ type: `atrule`, property: { name: `name`, value: `keyframes` } }];
      return CssFilterExtract.process(scss, filterName, customFilter)
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });
  });

  /** @test {CssFilterExtract.processSync} */
  describe(`processSync()`, () => {
    it(`should be a function`, () => {
      expect(typeof CssFilterExtract.processSync).to.equal(`function`);
    });
  });
});

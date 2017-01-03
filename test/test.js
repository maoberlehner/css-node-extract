/* eslint-env node, mocha */
const CssFilterExtract = require(`../`);
const expect = require(`chai`).expect;
const fs = require(`fs`);
const postcssScssSyntax = require(`postcss-scss`);
const postcssLessSyntax = require(`postcss-less`);

// const postcssFilterExtract = require(`../dist/lib/postcss-filter-extract.js`);

/** @test {CssFilterExtract} */
describe(`CssFilterExtract`, () => {
  const scss = fs.readFileSync(`test/css/test.scss`, { encoding: `utf8` });
  const less = fs.readFileSync(`test/css/test.less`, { encoding: `utf8` });

  it(`should be a function`, () => {
    expect(typeof CssFilterExtract).to.equal(`function`);
  });

  /** @test {CssFilterExtract.process} */
  describe(`process()`, () => {
    it(`should be a function`, () => {
      expect(typeof CssFilterExtract.process).to.equal(`function`);
    });

    it(`SCSS: should extract only at-rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/at-rules.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `at-rules`;
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`SCSS: should extract only mixin at-rules and variable declarations`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/combined.scss`, {
        encoding: `utf8`,
      });
      const filterNames = [`mixins`, `variables`];
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`SCSS: should extract only declaration rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/declarations.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `declarations`;
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`SCSS: should extract only mixin at-rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/mixins.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `mixins`;
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`SCSS: should extract only rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/rules.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `rules`;
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`SCSS: should extract only silent rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/silent.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `silent`;
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`SCSS: should extract only variable rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/variables.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `variables`;
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`SCSS: should extract only keyframes at-rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/keyframes.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `custom`;
      const customFilter = [{ type: `atrule`, property: { name: `name`, value: `keyframes` } }];
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: scss, filterNames, customFilter, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`LESS: should extract only mixin rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/mixins.less`, {
        encoding: `utf8`,
      });
      const filterNames = `mixins`;
      const postcssSyntax = postcssScssSyntax;
      return CssFilterExtract.process({ css: less, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(referenceScss.trim());
        });
    });

    it(`LESS: should extract only silent rules`, () => {
      const referenceScss = fs.readFileSync(`test/css/reference/silent.less`, {
        encoding: `utf8`,
      });
      const filterNames = `silent`;
      const postcssSyntax = postcssLessSyntax;
      return CssFilterExtract.process({ css: less, filterNames, postcssSyntax })
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

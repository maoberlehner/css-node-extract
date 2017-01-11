/* eslint-env node, mocha */
import fs from 'fs';
import postcssScssSyntax from 'postcss-scss';
import postcssLessSyntax from 'postcss-less';
import { expect } from 'chai';

import CssNodeExtract from '../js/index';

/** @test {CssNodeExtract} */
describe(`CssNodeExtract`, () => {
  const scss = fs.readFileSync(`test/css/test.scss`, { encoding: `utf8` });
  const less = fs.readFileSync(`test/css/test.less`, { encoding: `utf8` });

  it(`should be a function`, () => {
    expect(typeof CssNodeExtract).to.equal(`function`);
  });

  /** @test {CssNodeExtract.process} */
  describe(`process()`, () => {
    it(`should be a function`, () => {
      expect(typeof CssNodeExtract.process).to.equal(`function`);
    });

    it(`SCSS: should extract only at-rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/at-rules.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `at-rules`;
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`SCSS: should extract only mixin at-rules and variable declarations`, () => {
      const reference = fs.readFileSync(`test/css/reference/combined.scss`, {
        encoding: `utf8`,
      });
      const filterNames = [`mixins`, `variables`];
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`SCSS: should extract only declaration rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/declarations.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `declarations`;
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`SCSS: should extract only function at-rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/functions.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `functions`;
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`SCSS: should extract only mixin at-rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/mixins.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `mixins`;
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`SCSS: should extract only rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/rules.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `rules`;
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`SCSS: should extract only silent rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/silent.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `silent`;
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`SCSS: should extract only variable rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/variables.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `variables`;
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`SCSS: should extract only keyframes at-rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/keyframes.scss`, {
        encoding: `utf8`,
      });
      const filterNames = `custom`;
      const customFilter = [
        [
          { property: `type`, value: `atrule` },
          { property: `name`, value: `keyframes` },
        ],
      ];
      const postcssSyntax = postcssScssSyntax;
      return CssNodeExtract.process({ css: scss, filterNames, customFilter, postcssSyntax })
        .then((filteredScss) => {
          expect(filteredScss.trim()).to.equal(reference.trim());
        });
    });

    it(`LESS: should extract only mixin rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/mixins.less`, {
        encoding: `utf8`,
      });
      const filterNames = `mixins`;
      const postcssSyntax = postcssLessSyntax;
      return CssNodeExtract.process({ css: less, filterNames, postcssSyntax })
        .then((filteredLess) => {
          expect(filteredLess.trim()).to.equal(reference.trim());
        });
    });

    it(`LESS: should extract only silent rules`, () => {
      const reference = fs.readFileSync(`test/css/reference/silent.less`, {
        encoding: `utf8`,
      });
      const filterNames = `silent`;
      const postcssSyntax = postcssLessSyntax;
      return CssNodeExtract.process({ css: less, filterNames, postcssSyntax })
        .then((filteredLess) => {
          expect(filteredLess.trim()).to.equal(reference.trim());
        });
    });
  });

  /** @test {CssNodeExtract.processSync} */
  describe(`processSync()`, () => {
    it(`should be a function`, () => {
      expect(typeof CssNodeExtract.processSync).to.equal(`function`);
    });
  });
});

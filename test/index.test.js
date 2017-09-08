const fs = require(`fs`);
const postcssScssSyntax = require(`postcss-scss`);
const postcssSassParser = require(`postcss-sass`);
const postcssLessSyntax = require(`postcss-less`);
const expect = require(`chai`).expect;

const cssNodeExtract = require(`../`);
const process = require(`../`).process;
const processSync = require(`../`).processSync;

/** @test {cssNodeExtract} */
describe(`cssNodeExtract`, () => {
  const less = fs.readFileSync(`test/css/test.less`, { encoding: `utf8` });
  const scss = fs.readFileSync(`test/css/test.scss`, { encoding: `utf8` });
  const sass = fs.readFileSync(`test/css/test.sass`, { encoding: `utf8` });

  it(`Should be an object.`, () => {
    expect(typeof cssNodeExtract).to.equal(`object`);
  });

  /** @test {process} */
  describe(`process()`, () => {
    it(`Should be a function.`, () => {
      expect(typeof process).to.equal(`function`);
    });

    it(`Should extract only at-rules.`, () => {
      const referenceLess = fs.readFileSync(`test/css/reference/at-rules.less`, {
        encoding: `utf8`,
      });
      const referenceSass = fs.readFileSync(`test/css/reference/at-rules.sass`, {
        encoding: `utf8`,
      });
      const referenceScss = fs.readFileSync(`test/css/reference/at-rules.scss`, {
        encoding: `utf8`,
      });
      const filters = `at-rules`;

      // const resultLess = process({ css: less, filters, postcssSyntax: postcssLessSyntax })
      //   .then((filteredLess) => {
      //     expect(filteredLess.trim()).to.equal(referenceLess.trim());
      //   });
      // TODO
      const resultSass = process({ css: sass, filters, postcssSyntax: postcssScssSyntax, postcssParserr: postcssSassParser })
        .then((filteredSass) => {
          expect(filteredSass.trim()).to.equal(referenceSass.trim());
        });
      // const resultScss = process({ css: scss, filters, postcssSyntax: postcssScssSyntax })
      //   .then((filteredScss) => {
      //     expect(filteredScss.trim()).to.equal(referenceScss.trim());
      //   });

      return Promise.all([resultSass]);
    });

    // it(`SCSS: should extract only mixin at-rules and variable declarations`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/combined.scss`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = [`mixins`, `variables`];
    //   const postcssSyntax = postcssScssSyntax;
    //   return process({ css: scss, filters, postcssSyntax })
    //     .then((filteredScss) => {
    //       expect(filteredScss.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`SCSS: should extract only declaration rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/declarations.scss`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `declarations`;
    //   const postcssSyntax = postcssScssSyntax;
    //   return process({ css: scss, filters, postcssSyntax })
    //     .then((filteredScss) => {
    //       expect(filteredScss.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`SCSS: should extract only function at-rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/functions.scss`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `functions`;
    //   const postcssSyntax = postcssScssSyntax;
    //   return process({ css: scss, filters, postcssSyntax })
    //     .then((filteredScss) => {
    //       expect(filteredScss.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`SCSS: should extract only mixin at-rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/mixins.scss`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `mixins`;
    //   const postcssSyntax = postcssScssSyntax;
    //   return process({ css: scss, filters, postcssSyntax })
    //     .then((filteredScss) => {
    //       expect(filteredScss.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`SCSS: should extract only rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/rules.scss`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `rules`;
    //   const postcssSyntax = postcssScssSyntax;
    //   return process({ css: scss, filters, postcssSyntax })
    //     .then((filteredScss) => {
    //       expect(filteredScss.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`SCSS: should extract only silent rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/silent.scss`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `silent`;
    //   const postcssSyntax = postcssScssSyntax;
    //   return process({ css: scss, filters, postcssSyntax })
    //     .then((filteredScss) => {
    //       expect(filteredScss.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`SCSS: should extract only variable rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/variables.scss`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `variables`;
    //   const postcssSyntax = postcssScssSyntax;
    //   return process({ css: scss, filters, postcssSyntax })
    //     .then((filteredScss) => {
    //       expect(filteredScss.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`SCSS: should extract only keyframes at-rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/keyframes.scss`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `custom`;
    //   const customFilter = [
    //     [
    //       { property: `type`, value: `atrule` },
    //       { property: `name`, value: `keyframes` },
    //     ],
    //   ];
    //   const postcssSyntax = postcssScssSyntax;
    //   return process({ css: scss, filters, customFilter, postcssSyntax })
    //     .then((filteredScss) => {
    //       expect(filteredScss.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`LESS: should extract only declaration rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/declarations.less`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = [`declarations`];
    //   const postcssSyntax = postcssLessSyntax;
    //   return process({ css: less, filters, postcssSyntax })
    //     .then((filteredLess) => {
    //       expect(filteredLess.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`LESS: should extract only mixin rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/mixins.less`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `mixins`;
    //   const postcssSyntax = postcssLessSyntax;
    //   return process({ css: less, filters, postcssSyntax })
    //     .then((filteredLess) => {
    //       expect(filteredLess.trim()).to.equal(reference.trim());
    //     });
    // });

    // it(`LESS: should extract only silent rules`, () => {
    //   const reference = fs.readFileSync(`test/css/reference/silent.less`, {
    //     encoding: `utf8`,
    //   });
    //   const filters = `silent`;
    //   const postcssSyntax = postcssLessSyntax;
    //   return process({ css: less, filters, postcssSyntax })
    //     .then((filteredLess) => {
    //       expect(filteredLess.trim()).to.equal(reference.trim());
    //     });
    // });
  });

  /** @test {processSync} */
  // describe(`processSync()`, () => {
  //   it(`should be a function`, () => {
  //     expect(typeof processSync).to.equal(`function`);
  //   });
  // });
});
